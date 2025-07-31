/**
 * Recursively searches through a node and its children to find a specific node based on an offset.
 * @param {Node} node 
 * @param {number} offset
 * @return {{ node: Text, offset: number }} 
 */
export default function recursiveNodeSearch(node, offset){
  for(const child of node.childNodes){
    offset-= child.textContent.length

    // Node contains the offset needed
    if(offset < 0){
      if(child.nodeType === Node.TEXT_NODE){
        return { node : child, offset: offset + child.textContent.length }
      }
      else
        return recursiveNodeSearch(child, offset + child.textContent.length)
    }
  }

  return { node : node.lastChild, offset : node.textContent.length }
}