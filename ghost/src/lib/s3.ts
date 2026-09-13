import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type {
  CaseStudy,
  CaseStudyMedia,
  GalleryItem,
  SolutionItem,
  TransformationExperience,
} from '../types/case-study'

// S3 Configuration from environment variables
const AWS_REGION = import.meta.env.VITE_AWS_REGION || 'us-east-1'
const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID || ''
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || ''
const AWS_SESSION_TOKEN = import.meta.env.VITE_AWS_SESSION_TOKEN || undefined
const AWS_S3_BUCKET = import.meta.env.VITE_AWS_S3_BUCKET || ''
const AWS_ENDPOINT = import.meta.env.VITE_AWS_ENDPOINT || undefined

/**
 * Check if AWS S3 credentials and bucket are configured.
 */
export function isS3Configured(): boolean {
  return Boolean(AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && AWS_S3_BUCKET)
}

let s3ClientInstance: S3Client | null = null

function getS3Client(): S3Client | null {
  if (!isS3Configured()) return null

  if (!s3ClientInstance) {
    s3ClientInstance = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        sessionToken: AWS_SESSION_TOKEN,
      },
      endpoint: AWS_ENDPOINT,
      forcePathStyle: Boolean(AWS_ENDPOINT),
    })
  }

  return s3ClientInstance
}

// In-memory cache for presigned URLs to avoid frequent regeneration
// key -> { url, expiresAt }
type CacheEntry = {
  url: string
  expiresAt: number
}

const signedUrlCache = new Map<string, CacheEntry>()

/**
 * Parse an S3 identifier or relative path into bucket and object key.
 */
function parseS3Location(input: string, defaultBucket: string): { bucket: string; key: string } {
  if (input.startsWith('s3://')) {
    const withoutPrefix = input.slice(5)
    const firstSlash = withoutPrefix.indexOf('/')
    if (firstSlash !== -1) {
      return {
        bucket: withoutPrefix.slice(0, firstSlash),
        key: withoutPrefix.slice(firstSlash + 1),
      }
    }
    return { bucket: withoutPrefix, key: '' }
  }

  // Strip leading slash if any for key
  const key = input.startsWith('/') ? input.slice(1) : input
  return { bucket: defaultBucket, key }
}

/**
 * Generate an S3 presigned URL for a given S3 key, s3:// URI, or media path.
 * Falls back to the original keyOrUrl if S3 is unconfigured, or if it's already an HTTP URL.
 *
 * @param keyOrUrl S3 key, s3:// URI, or local fallback path
 * @param expiresIn Expiration time in seconds (default: 3600 = 1 hour)
 */
export async function getS3SignedUrl(
  keyOrUrl?: string,
  expiresIn: number = 3600,
): Promise<string | undefined> {
  if (!keyOrUrl) return undefined

  // If already an absolute HTTP(S) URL, return directly (supports public S3 URLs & CDNs)
  if (keyOrUrl.startsWith('http://') || keyOrUrl.startsWith('https://')) {
    return keyOrUrl
  }

  const client = getS3Client()
  if (!client || !AWS_S3_BUCKET) {
    // S3 credentials not provided; fall back smoothly to static/local asset path
    return keyOrUrl
  }

  const { bucket, key } = parseS3Location(keyOrUrl, AWS_S3_BUCKET)
  const cacheKey = `${bucket}:${key}:${expiresIn}`

  // Check cache (with 5-minute safety threshold)
  const cached = signedUrlCache.get(cacheKey)
  const safetyMarginMs = 5 * 60 * 1000
  if (cached && cached.expiresAt > Date.now() + safetyMarginMs) {
    return cached.url
  }

  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    })

    const signedUrl = await getSignedUrl(client, command, { expiresIn })

    signedUrlCache.set(cacheKey, {
      url: signedUrl,
      expiresAt: Date.now() + expiresIn * 1000,
    })

    return signedUrl
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`[S3] Failed to generate signed URL for "${keyOrUrl}":`, error)
    }
    // Return original path on error
    return keyOrUrl
  }
}

/**
 * Resolves media URLs inside a CaseStudyMedia object.
 */
export async function resolveMediaObject(
  media?: CaseStudyMedia,
  expiresIn?: number,
): Promise<CaseStudyMedia | undefined> {
  if (!media) return undefined

  const [image, video, poster] = await Promise.all([
    getS3SignedUrl(media.image, expiresIn),
    getS3SignedUrl(media.video, expiresIn),
    getS3SignedUrl(media.poster, expiresIn),
  ])

  return {
    ...media,
    image,
    video,
    poster,
  }
}

/**
 * Resolves transformation before/after media URLs with S3 signed URLs.
 */
export async function resolveTransformation(
  transformation?: TransformationExperience,
  expiresIn?: number,
): Promise<TransformationExperience | undefined> {
  if (!transformation) return undefined

  const [
    beforeImage,
    beforeVideo,
    beforePoster,
    afterImage,
    afterVideo,
    afterPoster,
  ] = await Promise.all([
    getS3SignedUrl(transformation.before?.image, expiresIn),
    getS3SignedUrl(transformation.before?.video, expiresIn),
    getS3SignedUrl(transformation.before?.poster, expiresIn),
    getS3SignedUrl(transformation.after?.image, expiresIn),
    getS3SignedUrl(transformation.after?.video, expiresIn),
    getS3SignedUrl(transformation.after?.poster, expiresIn),
  ])

  return {
    ...transformation,
    before: {
      ...transformation.before,
      image: beforeImage,
      video: beforeVideo,
      poster: beforePoster,
    },
    after: {
      ...transformation.after,
      image: afterImage,
      video: afterVideo,
      poster: afterPoster,
    },
  }
}

/**
 * Resolves media in solution items.
 */
export async function resolveSolutionItems(
  solution?: SolutionItem[],
  expiresIn?: number,
): Promise<SolutionItem[] | undefined> {
  if (!solution) return undefined

  return Promise.all(
    solution.map(async (item) => {
      const [media, poster] = await Promise.all([
        getS3SignedUrl(item.media, expiresIn),
        getS3SignedUrl(item.poster, expiresIn),
      ])
      return {
        ...item,
        media,
        poster,
      }
    }),
  )
}

/**
 * Resolves media in gallery items.
 */
export async function resolveGalleryItems(
  gallery?: GalleryItem[],
  expiresIn?: number,
): Promise<GalleryItem[] | undefined> {
  if (!gallery) return undefined

  return Promise.all(
    gallery.map(async (item) => {
      const [src, poster] = await Promise.all([
        getS3SignedUrl(item.src, expiresIn),
        getS3SignedUrl(item.poster, expiresIn),
      ])
      return {
        ...item,
        src: src || item.src,
        poster,
      }
    }),
  )
}

/**
 * Deeply resolves all media fields in a CaseStudy object with S3 presigned URLs.
 */
export async function resolveCaseStudyMedia(
  caseStudy: CaseStudy,
  expiresIn?: number,
): Promise<CaseStudy> {
  const [
    hero,
    transformation,
    solution,
    gallery,
    testimonialAvatar,
    cardImage,
  ] = await Promise.all([
    resolveMediaObject(caseStudy.hero, expiresIn),
    resolveTransformation(caseStudy.transformation, expiresIn),
    resolveSolutionItems(caseStudy.solution, expiresIn),
    resolveGalleryItems(caseStudy.gallery, expiresIn),
    getS3SignedUrl(caseStudy.testimonial?.avatar, expiresIn),
    getS3SignedUrl(caseStudy.cardImage, expiresIn),
  ])

  return {
    ...caseStudy,
    cardImage: cardImage || caseStudy.cardImage,
    hero: hero || caseStudy.hero,
    transformation,
    solution,
    gallery,
    testimonial: caseStudy.testimonial
      ? {
          ...caseStudy.testimonial,
          avatar: testimonialAvatar,
        }
      : undefined,
  }
}

/**
 * Deeply resolves an array of CaseStudy objects with S3 presigned URLs.
 */
export async function resolveCaseStudiesMedia(
  caseStudies: CaseStudy[],
  expiresIn?: number,
): Promise<CaseStudy[]> {
  return Promise.all(caseStudies.map((study) => resolveCaseStudyMedia(study, expiresIn)))
}
