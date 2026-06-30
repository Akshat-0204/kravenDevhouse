import { Resend } from 'resend'

type Payload = {
  fullName?: string
  workEmail?: string
  companyName?: string
  companyWebsite?: string
  services?: string[]
  selectedServices?: string[]
  projectDetails?: string
  preferredDate?: string
  preferredTime?: string
}

type NormalizedPayload = {
  fullName: string
  workEmail: string
  companyName: string
  companyWebsite: string
  services: string[]
  projectDetails: string
  preferredDate: string
  preferredTime: string
}

const fromEmail = 'Kraven <onboarding@resend.dev>'
const agencyEmail = 'soniakshat0204@gmail.com'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function renderAgencyEmail(payload: NormalizedPayload & { submittedAt: string }) {
  const rows = [
    ['Full Name', payload.fullName],
    ['Work Email', payload.workEmail],
    ['Company Name', payload.companyName],
    ['Company Website', payload.companyWebsite || 'N/A'],
    ['Selected Services', payload.services.join(', ')],
    ['Project Details', payload.projectDetails],
    ['Preferred Date', payload.preferredDate],
    ['Preferred Time', payload.preferredTime],
    ['Submission Timestamp', payload.submittedAt],
  ]

  return `<!doctype html>
  <html>
    <body style="margin:0;background:#0a0a0a;color:#f5f5f5;font-family:Arial,sans-serif;">
      <div style="max-width:720px;margin:0 auto;padding:40px 24px;">
        <div style="border:1px solid #262626;padding:28px;background:#111;">
          <div style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#a1a1aa;">Kraven</div>
          <h1 style="margin:18px 0 0;font-size:28px;line-height:1.1;">New Discovery Call Request</h1>
          <p style="margin:10px 0 0;color:#a1a1aa;">A new booking request has been submitted.</p>
          <div style="margin-top:28px;border-top:1px solid #262626;">
            ${rows
              .map(
                ([label, value]) => `
                  <div style="display:flex;gap:24px;padding:16px 0;border-bottom:1px solid #1f1f1f;">
                    <div style="width:180px;color:#8a8a93;font-size:13px;text-transform:uppercase;letter-spacing:.18em;">${escapeHtml(label)}</div>
                    <div style="flex:1;color:#f5f5f5;font-size:14px;line-height:1.6;">${escapeHtml(value)}</div>
                  </div>`,
              )
              .join('')}
          </div>
        </div>
      </div>
    </body>
  </html>`
}

function renderClientEmail(payload: NormalizedPayload) {
  return `<!doctype html>
  <html>
    <body style="margin:0;background:#0a0a0a;color:#f5f5f5;font-family:Arial,sans-serif;">
      <div style="max-width:720px;margin:0 auto;padding:40px 24px;">
        <div style="border:1px solid #262626;padding:28px;background:#111;">
          <div style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#a1a1aa;">Kraven</div>
          <h1 style="margin:18px 0 0;font-size:28px;line-height:1.1;">We&apos;ve received your discovery call request</h1>
          <p style="margin:16px 0 0;color:#d4d4d8;font-size:15px;line-height:1.7;">
            Thanks for reaching out. We&apos;ve received your request and will review it shortly.
          </p>
          <p style="margin:14px 0 0;color:#d4d4d8;font-size:15px;line-height:1.7;">
            Your requested time is <strong style="color:#fff;">${escapeHtml(payload.preferredDate)} at ${escapeHtml(payload.preferredTime)}</strong>.
            Someone from the team will confirm the meeting soon.
          </p>
          <div style="margin-top:22px;border-top:1px solid #262626;padding-top:16px;color:#a1a1aa;font-size:13px;line-height:1.6;">
            Kraven · AI Systems & Automation
          </div>
        </div>
      </div>
    </body>
  </html>`
}

async function readJson(request: Request) {
  const text = await request.text()
  return JSON.parse(text || '{}') as Payload
}

export function attachBookCallApi(server: { middlewares: { use: (...args: any[]) => void } }) {
  const sendJson = (res: any, status: number, payload: Record<string, unknown>) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(payload))
  }

  const handler = async (request: Request) => {
    const payload = await readJson(request)
    const fullName = payload.fullName?.trim()
    const workEmail = payload.workEmail?.trim()
    const companyName = payload.companyName?.trim()
    const projectDetails = payload.projectDetails?.trim()
    const preferredDate = payload.preferredDate?.trim()
    const preferredTime = payload.preferredTime?.trim()
    const services = (payload.services ?? payload.selectedServices ?? []).filter(Boolean)

    if (!fullName || !workEmail || !companyName || !projectDetails || !preferredDate || !preferredTime || services.length === 0) {
      return Response.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: 'Missing RESEND_API_KEY.' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const normalized: NormalizedPayload = {
      fullName,
      workEmail,
      companyName,
      companyWebsite: payload.companyWebsite?.trim() || '',
      services,
      projectDetails,
      preferredDate,
      preferredTime,
    }
    const submittedAt = new Date().toISOString()

    await resend.emails.send({
      from: fromEmail,
      to: agencyEmail,
      subject: `New Discovery Call Request — ${fullName}`,
      html: renderAgencyEmail({ ...normalized, submittedAt }),
      replyTo: workEmail,
    })

    await resend.emails.send({
      from: fromEmail,
      to: workEmail,
      subject: "We've Received Your Discovery Call Request",
      html: renderClientEmail(normalized),
    })

    return Response.json({ ok: true })
  }

  const middleware = async (req: any, res: any, next: any) => {
    if (req.method === 'POST' && req.url === '/api/book-call') {
      try {
        const response = await handler(new Request(`http://localhost${req.url}`, {
          method: req.method,
          headers: req.headers,
          body: await new Promise<string>((resolve) => {
            let body = ''
            req.on('data', (chunk: string) => (body += chunk))
            req.on('end', () => resolve(body))
          }),
        }))
        const body = await response.text()
        res.statusCode = response.status
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(body)
      } catch (error) {
        sendJson(res, 500, { error: 'Failed to process booking request.' })
      }
      return
    }
    next()
  }

  server.middlewares.use(middleware)
}
