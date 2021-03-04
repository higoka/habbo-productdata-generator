const parser = require('fast-xml-parser')
const fs = require('fs')

async function main () {
  const xml = await fs.promises.readFile('resource/furnidata.xml', 'utf8')
  const parsed = parser.parse(xml, { ignoreAttributes: false })

  const all = [
    ...parsed.furnidata.roomitemtypes.furnitype,
    ...parsed.furnidata.wallitemtypes.furnitype,
  ]

  let buffer = ''

  for (const item of all) {
    buffer += `["${item['@_classname']}","${item.name}","${item.description}"],`
  }

  await fs.promises.writeFile('resource/productdata.txt', `[${buffer.slice(0, -1)}]`)
}

main()
