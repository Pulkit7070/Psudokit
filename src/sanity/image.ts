import imageUrlBuilder from '@sanity/image-url'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ImageBuilder = ReturnType<typeof imageUrlBuilder>
type ImageBuilderResult = ReturnType<ImageBuilder['image']>

let _builder: ImageBuilder | null = null

function getBuilder(): ImageBuilder | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) return null
  if (!_builder) {
    _builder = imageUrlBuilder({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    })
  }
  return _builder
}

const EMPTY_RESULT = { url: () => '' } as unknown as ImageBuilderResult

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any): ImageBuilderResult {
  const b = getBuilder()
  if (!b) return EMPTY_RESULT
  return b.image(source)
}
