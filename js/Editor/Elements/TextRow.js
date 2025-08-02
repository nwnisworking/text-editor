export default class TextRow extends HTMLElement{
  /**
   * Get the previous row in the editor.
   * @returns {?TextRow} The previous TextRow or null if there is no previous row.
   */
  prev(){
    let element = this.previousElementSibling

    while(element){
      if(element instanceof TextRow){
        return element
      }

      element = element.previousElementSibling
    }

    return null
  }

  /**
   * Get the next row in the editor.
   * @returns {?TextRow} The next TextRow or null if there is no next row.
   */
  next(){
    let element = this.nextElementSibling

    while(element){
      if(element instanceof TextRow){
        return element
      }

      element = element.nextElementSibling
    }

    return null
  }
}