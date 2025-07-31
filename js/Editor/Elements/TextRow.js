export default class TextRow extends HTMLElement{
  /**
   * Get the previous row element if it exists.
   * @returns {TextRow}
   */
  prev(){
    if(this.previousSibling instanceof TextRow)
      return this.previousSibling
  }

  /**
   * Get the next row element if it exists.
   * @returns {TextRow}
   */
  next(){
    if(this.nextSibling instanceof TextRow)
      return this.nextSibling
  }
}