window.onload = function () {
  button()
} 
function button () {
  var body = document.getElementsByTagName('body')[0]
  var main = document.getElementsByClassName('main')[0]
  var button = document.getElementsByClassName('button')[0]
  var question = document.getElementsByClassName('questionnaire-button')[0]
  var vote = document.getElementsByClassName('vote-button')[0]
  button.onclick = function () {
    var className = button.getAttribute('class')
    if (className == "button") {
      button.setAttribute('class', 'button rotation')
      vote.setAttribute('class', 'vote-button arise-vote-button')
      question.setAttribute('class', 'questionnaire-button arise-questionnaire-button')
      main.style.filter = 'blur(3px)'
      if (document.getElementsByClassName('mask')[0]) {
        return false
      } else {
        var mask = document.createElement('div')
        body.appendChild(mask)
        mask.setAttribute('class', 'mask')
      }
    } else {
      var mask = document.getElementsByClassName('mask')[0]
      button.setAttribute('class', 'button')
      vote.setAttribute('class', 'vote-button')
      question.setAttribute('class', 'questionnaire-button')
      main.style.filter = 'blur(0px)'
      body.removeChild(mask)
    }
  }
}
