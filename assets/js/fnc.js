//------------------------------------------------------------------------------------------
//DEGREES TO DIRECTION
export function degreesToDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']
  const index = Math.round(degrees / 45)
  return directions[index % 8]
}

//------------------------------------------------------------------------------------------
// CREATE DIV
export function createDiv(type,parent,content,className) {
  const newDiv=document.createElement(type);
  if (content!=null) {
    newDiv.innerHTML=content;
  }
  if (className!=null) {
    newDiv.classList.add(className);
  }
  parent.appendChild(newDiv);
  return newDiv;
}

//------------------------------------------------------------------------------------------
// SLEEP FUNCTION
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//------------------------------------------------------------------------------------------
// ESCAPE HTML
export function escapeHTML(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

//------------------------------------------------------------------------------------------
// IS MOBILE
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

//------------------------------------------------------------------------------------------
// RANDOM COLOR
export function randomColor() {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return '#'+randomColor;
}
