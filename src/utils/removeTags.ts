export function removeHTMLTags(content: string): string {
  const tempElement = document.createElement('div')
  tempElement.innerHTML = content
  return tempElement.textContent || tempElement.innerText || ''
}
