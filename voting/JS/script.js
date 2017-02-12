window.onload = function () {
  // 自动识别设备高度，并设置
  var deviceWidth = document.documentElement.clientHeight
  var body = document.getElementsByTagName('body')[0]
  var main = document.getElementsByClassName('main-page')[0]
  if (main) {
    main.style.minHeight = deviceWidth + 'px'
  } else {
    body.style.minHeight = deviceWidth + 'px'
  }

  // tap事件
  if (!HTMLElement.prototype.addTapEvent) {
    HTMLElement.prototype.addTapEvent = function (callback) {
      var tapStartTime = 0,
        tapEndTime = 0,
        tapTime = 500, //tap等待时间，在此事件下松开可触发方法
        tapStartClientX = 0,
        tapStartClientY = 0,
        tapEndClientX = 0,
        tapEndClientY = 0,
        tapScollHeight = 15, //水平或垂直方向移动超过15px测判定为取消（根据chrome浏览器默认的判断取消点击的移动量)
        cancleClick = false;
      this.addEventListener('touchstart', function () {
        tapStartTime = event.timeStamp;
        var touch = event.changedTouches[0];
        tapStartClientX = touch.clientX;
        tapStartClientY = touch.clientY;
        cancleClick = false;
      })
      this.addEventListener('touchmove', function () {
        var touch = event.changedTouches[0];
        tapEndClientX = touch.clientX;
        tapEndClientY = touch.clientY;
        if ((Math.abs(tapEndClientX - tapStartClientX) > tapScollHeight) || (Math.abs(tapEndClientY - tapStartClientY) > tapScollHeight)) {
          cancleClick = true;
        }
      })
      this.addEventListener('touchend', function () {
        tapEndTime = event.timeStamp;
        if (!cancleClick && (tapEndTime - tapStartTime) <= tapTime) {
          callback();
        }
      })
    }
  }
  button()
  signIn()
}
//控制按钮旋转效果
function button() {
  var body = document.getElementsByTagName('body')[0]
  var main = document.getElementsByClassName('main-page')[0]
  var button = document.getElementsByClassName('button')[0]
  var question = document.getElementsByClassName('questionnaire-button')[0]
  var vote = document.getElementsByClassName('vote-button')[0]
  if (!button) return false
  button.addTapEvent(function () {
    var className = button.getAttribute('class')
    if (className == "button") {
      button.setAttribute('class', 'button rotation')
      vote.setAttribute('class', 'vote-button arise-vote-button')
      question.setAttribute('class', 'questionnaire-button arise-questionnaire-button')
      main.setAttribute('class', 'main-page blur')
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
      main.setAttribute('class', 'main-page')
      body.removeChild(mask)
    }
  })
}
//签到
function signIn() {
  var signIn = document.getElementsByTagName('button')[0]
  var addOnePoint = document.getElementsByClassName('bonus-point')[0]
  if (!signIn || signIn.innerHTML != '签到') return false
  signIn.addTapEvent(function () {
    signIn.innerHTML = '签到成功!'
    signIn.setAttribute('class', 'success')
    addOnePoint.style.display = 'block'
  })
}
