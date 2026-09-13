import { useState, useEffect } from 'react'
import type { CaseStudy } from '../types/case-study'
import {
  getS3SignedUrl,
  isS3Configured,
  resolveCaseStudyMedia,
  resolveCaseStudiesMedia,
} from '../lib/s3'

/**
 * Hook to resolve a single media URL/S3 key to an S3 presigned URL.
 */
export function useSignedUrl(keyOrUrl?: string, expiresIn?: number) {
  const [resolvedUrl, setResolvedUrl] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!keyOrUrl || !isS3Configured()) {
      return
    }

    let isMounted = true

    getS3SignedUrl(keyOrUrl, expiresIn)
      .then((url) => {
        if (isMounted) {
          setResolvedUrl(url)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)))
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [keyOrUrl, expiresIn])

  const effectiveUrl = isS3Configured() ? resolvedUrl || keyOrUrl : keyOrUrl

  return {
    url: effectiveUrl,
    isLoading,
    error,
  }
}

/**
 * Hook to resolve all media fields inside a CaseStudy with S3 presigned URLs.
 */
export function useResolvedCaseStudy(initialCaseStudy?: CaseStudy, expiresIn?: number) {
  const [resolvedCaseStudy, setResolvedCaseStudy] = useState<CaseStudy | undefined>(undefined)
  const [isResolving, setIsResolving] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!initialCaseStudy || !isS3Configured()) {
      return
    }

    let isMounted = true

    resolveCaseStudyMedia(initialCaseStudy, expiresIn)
      .then((resolved) => {
        if (isMounted) {
          setResolvedCaseStudy(resolved)
          setIsResolving(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)))
          setIsResolving(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [initialCaseStudy, expiresIn])

  const effectiveCaseStudy = (isS3Configured() && resolvedCaseStudy) || initialCaseStudy

  return {
    caseStudy: effectiveCaseStudy,
    isResolving,
    error,
  }
}

/**
 * Hook to resolve all media in a list of Case Studies with S3 presigned URLs.
 */
export function useResolvedCaseStudies(initialCaseStudies: CaseStudy[], expiresIn?: number) {
  const [resolvedList, setResolvedList] = useState<CaseStudy[] | undefined>(undefined)
  const [isResolving, setIsResolving] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!isS3Configured() || initialCaseStudies.length === 0) {
      return
    }

    let isMounted = true

    resolveCaseStudiesMedia(initialCaseStudies, expiresIn)
      .then((list) => {
        if (isMounted) {
          setResolvedList(list)
          setIsResolving(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)))
          setIsResolving(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [initialCaseStudies, expiresIn])

  const effectiveList = (isS3Configured() && resolvedList) || initialCaseStudies

  return {
    caseStudies: effectiveList,
    isResolving,
    error,
  }
}
