// Flood-fill from the image border, clearing the transparent margin and the
// connected white sticker outline, but stopping at the character's dark line
// art so interior white (his hair) is preserved.
import sharp from 'sharp'

const input = process.argv[2]
const output = process.argv[3]
const WHITE = 235 // r,g,b above this is treated as removable white

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info
const idx = (x, y) => (y * width + x) * channels
const visited = new Uint8Array(width * height)
const stack = []

const isRemovable = (i) => {
  const a = data[i + 3]
  if (a < 16) return true // already transparent
  return data[i] > WHITE && data[i + 1] > WHITE && data[i + 2] > WHITE
}

const push = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return
  if (visited[y * width + x]) return
  stack.push(x, y)
}

for (let x = 0; x < width; x++) {
  push(x, 0)
  push(x, height - 1)
}
for (let y = 0; y < height; y++) {
  push(0, y)
  push(width - 1, y)
}

while (stack.length) {
  const y = stack.pop()
  const x = stack.pop()
  const v = y * width + x
  if (visited[v]) continue
  visited[v] = 1
  const i = idx(x, y)
  if (!isRemovable(i)) continue
  data[i + 3] = 0 // clear alpha
  push(x + 1, y)
  push(x - 1, y)
  push(x, y + 1)
  push(x, y - 1)
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(output)

console.log(`done: ${output}`)
