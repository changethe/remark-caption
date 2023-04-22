import { visitParents } from 'unist-util-visit-parents'

function captionWrapper() {
  const markers = ['caption:', 'tabelle:', 'zitat:']
  const classNames = {
    table: 'table-figure',
    blockquote: 'blockquote-figure',
  }

  return (tree) => {
    visitParents(tree, ['blockquote', 'table'], (node, ancestors) => {
      const parent = ancestors[ancestors.length - 1]
      const index = parent.children.indexOf(node)

      const nextNode = parent.children[index + 1]
      let figcaptionNode

      if (nextNode && nextNode.type === 'paragraph' && nextNode.children[0].type === 'text') {
        const textNode = nextNode.children[0]
        const foundMarker = markers.find(
          (marker) => textNode.value.toLowerCase().indexOf(marker.toLowerCase()) !== -1
        )

        if (foundMarker) {
          const markerIndex = textNode.value.toLowerCase().indexOf(foundMarker.toLowerCase())
          const figcaptionText = textNode.value.slice(markerIndex + foundMarker.length).trim()

          figcaptionNode = {
            type: 'html',
            value: `<figcaption>${figcaptionText}</figcaption>`,
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
