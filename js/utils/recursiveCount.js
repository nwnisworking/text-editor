import EditorCursor from "../Editor/Elements/EditorCursor.js"
import TextRow from "../Editor/Elements/TextRow.js"

/**
 * Recursively counts the number of characters in a TextRow element
 * and updates the cursor position accordingly.
 * @param {TextRow} row - The TextRow element containing the text.
 * @param {EditorCursor} cursor - The cursor element to determine the position.
 * @param {number} offset - The offset position within the TextRow.
 */
export default function recursiveCount(row, cursor){
  if(!(row instanceof TextRow)){
    throw new TypeError('Expected a TextRow instance')
  }

  if(!(cursor instanceof EditorCursor)){
    throw new TypeError('Expected a EditorCursor instance')
  }

  if(cursor.prev() === null) return 0

  const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT, null, false)
  let count = 0

  while(walker.nextNode()){
    const node = walker.currentNode

    count+= node.textContent.length

    if(node === cursor.prev()) break
  }

  return count
}