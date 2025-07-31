export const element = {
  id(id){ return document.getElementById(id) },
  cls(className){ return document.getElementsByClassName(className) },
  $(selector){ return document.querySelector(selector) },
  $$(selector){ return document.querySelectorAll(selector) },
  create(tag, attributes = {}, text = ''){
    return Object.assign(document.createElement(tag), attributes, {
      textContent: text
    });
  }
}