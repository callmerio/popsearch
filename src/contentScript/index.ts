// contentScript.ts

let popup: HTMLDivElement | null = null

document.addEventListener('mouseup', (event) => {
  const selection = window.getSelection()
  if (selection && selection.toString().trim().length > 0) {
    showPopup(event.clientX, event.clientY, selection.toString())
  } else {
    hidePopup()
  }
})

function showPopup(x: number, y: number, selectedText: string) {
  if (!popup) {
    popup = document.createElement('div')
    popup.style.position = 'fixed'
    popup.style.zIndex = '10000'
    popup.style.backgroundColor = 'white'
    popup.style.border = '1px solid black'
    popup.style.padding = '10px'
    popup.style.borderRadius = '5px'
    popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)'
    document.body.appendChild(popup)
  }

  popup.style.left = `${x}px`
  popup.style.top = `${y - 40}px`
  popup.textContent = 'Perplexity Search: ' + selectedText
  popup.style.display = 'block'
}

function hidePopup() {
  if (popup) {
    popup.style.display = 'none'
  }
}

document.addEventListener('mousedown', (event) => {
  if (popup && !popup.contains(event.target as Node)) {
    hidePopup()
  }
})
