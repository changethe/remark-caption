import { visitParents } from 'unist-util-visit-parents'

function captionWrapper(options = {}) {
  const markers = options.markers || ['caption:', 'table:', 'quote:', 'cite:']
  const classNames = options.classNames || {
    table: 'table-figure',
    blockquote: 'blockquote-figure',
  }

  return (tree) => {
    visitParents(tree, ['blockquote', 'table'], (node, ancestors) => {
      const parent = ancestors[ancestors.length - 1]
      const index = parent.children.indexOf(node)

      const nextNode = parent.children[index + 1]
      let figcaptionNode
      let citeUrl = ''

      if (nextNode && nextNode.type === 'paragraph') {
        const foundMarker = markers.find((marker) =>
          nextNode.children.some(
            (child) =>
              child.type === 'text' &&
              child.value.toLowerCase().indexOf(marker.toLowerCase()) !== -1
          )
        )

        if (foundMarker) {
          const markerIndex = nextNode.children[0].value
            .toLowerCase()
            .indexOf(foundMarker.toLowerCase())

          nextNode.children[0].value = nextNode.children[0].value.replace(foundMarker, '').trim()
          const figcaptionContent = nextNode.children

          figcaptionNode = {
            type: 'html',
            value: `<figcaption>${figcaptionContent
              .map((child) => {
                if (child.type === 'text') {
                  return child.value
                } else if (child.type === 'link') {
                  citeUrl = child.url
                  return ` <a href="${child.url}" target="_blank" rel="noopener noreferrer">${child.children[0].value}</a>`
                }
              })
              .join('')}</figcaption>`,
          }

          // Remove the nextNode as its content is now in the figcaption
          parent.children.splice(index + 1, 1)
        }
      }

      const className = classNames[node.type]
      const figureNode = {
        type: 'html',
        value: `<figure class="${className}">`,
      }

      const closingFigureNode = {
        type: 'html',
        value: '</figure>',
      }

      // Add cite attribute to blockquote
      if (node.type === 'blockquote' && citeUrl) {
        node.data = node.data || {}
        node.data.hProperties = node.data.hProperties || {}
        node.data.hProperties.cite = citeUrl
      }

      const nodesToInsert = [figureNode, node]

      if (figcaptionNode) {
        nodesToInsert.push(figcaptionNode)
      }

      nodesToInsert.push(closingFigureNode)

      parent.children.splice(index, 1, ...nodesToInsert)

      // Skip visiting the newly created nodes
      return [visitParents.SKIP, index + nodesToInsert.length]
    })
  }
}

export default captionWrapper
