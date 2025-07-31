import TextEditor from "../TextEditor.js"

export default class KeyboardManager{
  /**
   * Text editor instance that this keyboard manager is associated with.
   * @type {TextEditor}
   */
  #editor

  constructor(editor){
    this.#editor = editor

    window.addEventListener('keydown', this.#keyHandler.bind(this))
  }

  #keyHandler(e){
    e.preventDefault()
    
    let str = ''

    if(e.ctrlKey)
      str+= 'Ctrl+'

    if(e.altKey)
      str+= 'Alt+'

    if(e.shiftKey)
      str+= 'Shift+'

    str+= e.key

    switch(str){
      case 'ArrowLeft' : 
        this.#editor.cursor_manager.move('left')
      break
      case 'ArrowRight' : 
        this.#editor.cursor_manager.move('right')
      break
      case 'ArrowUp' : 
        this.#editor.cursor_manager.move('up')
      break
      case 'ArrowDown' : 
        this.#editor.cursor_manager.move('down')
      break
      default : 
        this.#editor.cursor_manager.insertBefore(e.key)
    }
  }

  
}