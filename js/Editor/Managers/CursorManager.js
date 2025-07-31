import EditorCursor from "../Elements/EditorCursor.js"
import TextEditor from "../TextEditor.js"
import TextRow from "../Elements/TextRow.js"

// Util method declaration
import recursiveCount from "../../utils/recursiveCount.js"

export default class CursorManager{
  /**
   * Text editor instance that this cursor manager is associated with.
   * @type {TextEditor}
   */
  #editor

  /**
   * Current offset of the cursor within the text editor.
   * @type {?number}
   */
  #offset

  /**
   * Current row of the cursor within the text editor.
   * @type {?TextRow}
   */
  #row

  /**
   * Cursor element that this manager controls.
   * @type {EditorCursor}
   */
  #cursor

  constructor(editor){
    this.#editor = editor
    this.#offset = null
    this.#row = null
    this.#cursor = document.createElement('editor-cursor')
  }

  /**
   * Move the cursor to a specific row and offset.
   * @param {TextRow} node 
   * @param {number} offset 
   */
  moveTo(node, offset){
    if(node instanceof Text){
      const text = node.splitText(offset)
      node.after(this.#cursor, text)

      this.#cursor.row().normalize()
    }
    else{
      node.append(this.#cursor)
    }

    this.#offset = recursiveCount(this.#cursor.row(), this.#cursor)
  }

  /**
   * Move the cursor in a specific direction.
   * @param {'up' | 'down' | 'left' | 'right'} direction 
   */
  move(direction){
    const prev_node = this.#cursor.prev()
    const next_node = this.#cursor.next()
    const prev_row = this.#cursor.row().prev()
    const next_row = this.#cursor.row().next()

    switch(direction){
      case 'left' : 
        if(!prev_node && !prev_row){
          this.#offset = 0
          return
        }
        else if(!prev_node && prev_row){
          this.#offset = prev_row.textContent.length
          prev_row.append(this.#cursor)
        }
        else{
          this.#offset--
          this.insertAfter(prev_node.textContent.at(-1))
          this.removeBefore()
        }
      break
    }
  }

  /**
   * Scroll the editor to the current cursor position.
   * @returns {void}
   */
  scrollToCursor(){
    if(!this.#cursor.parentElement){
      return
    }

    this.#cursor.scrollIntoView({
      block : 'nearest',
      inline : 'nearest'
    })
  }

  insertBefore(text){
    const prev_node = this.#cursor.prev()

    if(prev_node){
      prev_node.textContent += text
    }
    else{
      this.#cursor.insertAdjacentText('beforebegin', text)
    }

    this.#offset+= text.length
  }

  insertAfter(text){
    const next_node = this.#cursor.next()

    if(next_node){
      next_node.textContent = text + next_node.textContent
    }
    else{
      this.#cursor.insertAdjacentText('afterend', text)
    }
  }

  removeBefore(){
    const prev_node = this.#cursor.prev()

    if(prev_node){
      prev_node.textContent = prev_node.textContent.slice(0, -1)
      this.#offset--
    }
    else{
      this.#offset = 0
    }
  }

  removeAfter(){
    const next_node = this.#cursor.next()

    if(next_node){
      next_node.textContent = next_node.textContent.slice(1)
    }
  }
}