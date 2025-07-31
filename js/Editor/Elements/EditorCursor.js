export default class EditorCursor extends HTMLElement{
  /**
   * Get the previous sibling element if it exists.
   * @returns {?ChildNode}
   */
  prev(){
    let prev = this.previousSibling
    console.log(prev.nodeType === Node.TEXT_NODE)
    return prev
  }

  /**
   * Get the next sibling element if it exists.
   * @returns {?ChildNode}
   */
  next(){
    return this.nextSibling
  }

  row(){
    return this.closest('text-row')
  }
}