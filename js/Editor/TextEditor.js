import EditorCursor from './Elements/EditorCursor.js'
import TextRow from './Elements/TextRow.js'
import CursorManager from './Managers/CursorManager.js'
import KeyboardManager from './Managers/KeyboardManager.js'

export default class TextEditor extends HTMLElement{
  /**
   * Array of TextRow elements representing the rows in the text editor.
   * @type {TextRow[]}
   */
  rows = []

  /**
   * Cursor manager instance that handles cursor operations.
   * @type {CursorManager}
   */
  cursor_manager

  /**
   * Keyboard manager instance that handles keyboard events.
   * @type {KeyboardManager}
   */
  keyboard_manager

  constructor(){
    super()

    this.cursor_manager = new CursorManager(this)
    this.keyboard_manager = new KeyboardManager(this)
  }

  /**
   * Set the active row based on a mouse event.
   * @param {{target : HTMLElement, clientX: number, clientY: number}} e - The mouse event containing the target element and coordinates.
   */
  setActiveRow({ target, clientX, clientY } = {}){
    const range = document.caretPositionFromPoint(clientX, clientY)

    if(target instanceof TextEditor){
      const row = this.rows.at(-1)
      this.cursor_manager.moveTo(row, row.textContent.length)
    }
    else{
      this.cursor_manager.moveTo(range.offsetNode, range.offset)
    }
  }

  connectedCallback(){
    const row = document.createElement('text-row')

    row.innerHTML = "this is a <strong>text</strong> row"
    this.rows.push(row)
    this.append(row)

    this.addEventListener('click', this.setActiveRow.bind(this))
  }

  // rowSelection({ target }){
  //   let row
    
  //   if(target === this){
  //     row = this.rows.at(-1)
  //   }
  //   else if(target instanceof TextRow){
  //     row = target
  //   }
  //   else{
  //     row = target.closest('text-row')
  //   }

  //   if(!this.cursor.isConnected || this.cursor.row() !== row){
  //     row.append(this.cursor)
  //   }

  //   this.text_input.focus()
  // }

  // keyboardInput(e){
  //   const row = this.cursor.row(), cursor = this.cursor

  //   if(!row) return

  //   switch(e.key){
  //     case 'Control' : 
  //     case 'Shift' :
  //     case 'Alt' :
  //     break
  //     case 'Backspace' : cursor.deleteChar(-1)
  //     break
  //     case 'Delete' : cursor.deleteChar(1)
  //     break
  //     case 'ArrowLeft' : cursor.leap(-1)
  //     break
  //     case 'ArrowRight' : cursor.leap(1)
  //     break
  //     case 'Enter' : this.createRow(row)
  //     break
  //     default :
  //       const prev_node = this.cursor.prev()

  //       if(prev_node) prev_node.textContent += e.key
  //       else this.cursor.insertAdjacentText('beforebegin', e.key)
  //   }

  //   this.cursor.scrollIntoView({block: 'nearest', inline: 'nearest'})
  // }

  // createRow(row){
  //   const nodes = Array.from(row.childNodes)
  //   const new_row = document.createElement('text-row')
    
  //   this.rows.push(new_row)
  //   row.after(new_row)
  //   new_row.append(...nodes.slice(nodes.indexOf(this.cursor)))
  // }

  // select(){
  //   const sel = window.getSelection();
  //   if (sel.rangeCount > 0) {
  //     const range = sel.getRangeAt(0);

  //     const startNode = range.startContainer;
  //     const endNode = range.endContainer;

  //     const startRow = startNode;
  //     const endRow = endNode;

  //     console.log('Start Row:', startRow, 'Offset:', range.startOffset);
  //     console.log('End Row:', endRow, 'Offset:', range.endOffset);
  //   }
  // }

  // connectedCallback(){
  //   this.cursor = document.createElement('editor-cursor')
  //   this.text_input = document.createElement('input') 
    
  //   this.rows.push(document.createElement('text-row'))
  //   this.rows.push(document.createElement('text-row'))
  //   this.text_input.setAttribute('id', 'text-input')
  //   this.text_input.setAttribute('type', 'text')
  //   this.text_input.setAttribute('spellcheck', 'false')
  //   this.text_input.setAttribute('autocorrect', 'off')
  //   this.text_input.setAttribute('autocomplete', 'off')

  //   this.append(...this.rows, this.text_input)

  //   this.addEventListener('mousedown', e=>{
  //     const range = document.caretPositionFromPoint(e.clientX, e.clientY)

  //     console.log(range)
  //   })

  //   this.addEventListener('mouseup', e=>{
  //           const range = document.caretPositionFromPoint(e.clientX, e.clientY)

  //     console.log(range)

  //   })
  
  //   this.addEventListener('click', this.rowSelection.bind(this))
  //   this.addEventListener('keydown', this.keyboardInput.bind(this))
  // }
}