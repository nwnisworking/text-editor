export default class TextEditor extends HTMLElement{
  connectedCallback(){
    this.append(document.createElement('text-row'))

    this.firstChild.innerHTML = "TE<editor-cursor></editor-cursor>ST"
  }
}