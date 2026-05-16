import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ message: 'Missing revalidation secret' }, { status: 500 })
  }

  const signature = req.headers.get(SIGNATURE_HEADER_NAME)
  const body = await req.text()

  const valid = await isValidSignature(body, signature ?? '', secret)
  if (!valid) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
  }

  let payload: { _type?: string; slug?: { current?: string } }
  try {
    payload = JSON.parse(body) as { _type?: string; slug?: { current?: string } }
  } catch {
    return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 })
  }

  const type = payload._type
  const slug = payload.slug?.current

  if (type === 'blog') {
    revalidatePath('/blogs')
    if (slug) revalidatePath(`/blogs/${slug}`)
  } else if (type === 'ossContribution') {
    revalidatePath('/opensource')
  } else {
    // Unknown type — revalidate everything
    revalidatePath('/', 'layout')
  }

  return NextResponse.json({ revalidated: true, type, slug })
}
