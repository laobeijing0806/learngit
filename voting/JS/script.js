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
  tapEvent()
  button()
  signIn()
  deleteItem()
}

//列表渲染
function display(userName) {
  var list = document.getElementById('list')
  if (!list) return false
  var request = new XMLHttpRequest()
  request.open('GET', '/all', true)
  request.send(null)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      for (var i = 0; i < request.responseText.result.num; i++) {
        var items = document.createElement('li')
        var links = document.createElement('a')
        var userRelease = document.createElement('span')
        var deadline = document.createElement('span')
        var icon = document.createElement('span')
        userRelease.setAttribute('class', 'user-release')
        if (request.responseText.result.qvs[0].type === "wenjuan") {
          userRelease.innerHTML = userName + '发布的问卷' 
        } else {
          userRelease.innerHTML = userName + '发布的投票'
        }
        deadline.setAttribute('class', 'deadline')
        deadline.innerHTML = '(' + request.responseText.result.qvs[0].last_change_time + '到期)' 
        icon.setAttribute('class', 'icon')
        links.appendChild(userRelease)
        links.appendChild(deadline)
        links.appendChild(icon)
        links.setAttribute('href', request.responseText.result.qvs[0].data)
        items.appendChild(links)
        list.appendChild(items)
      }
    }
  }
}

// 控制按钮旋转效果
function button() {
  var body = document.getElementsByTagName('body')[0]
  var main = document.getElementsByClassName('main-page')[0]
  var button = document.getElementsByClassName('button')[0]
  var question = document.getElementsByClassName('questionnaire-button')[0]
  var vote = document.getElementsByClassName('vote-button')[0]
  if (!button) return false
  button.addTapEvent(function () {
    var className = button.getAttribute('class')
    if (className === "button") {
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

// tap事件
function tapEvent() {
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
}

//签到
function signIn() {
  var signIn = document.getElementsByTagName('button')[0]
  var addOnePoint = document.getElementsByClassName('bonus-point')[0]
  if (!signIn || signIn.innerHTML !== '签到') return false
  var request = new XMLHttpRequest()
  request.open('GET', '/check', true)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText.checked !== true) {
        signIn.addTapEvent(function () {
          signIn.innerHTML = '签到成功!'
          signIn.setAttribute('class', 'success')
          addOnePoint.style.display = 'block'
          request.open('POST', '/check', true)
          request.send(null)
        })
      } else {
        signIn.innerHTML = '签到成功!'
        signIn.setAttribute('class', 'success')
        addOnePoint.style.display = 'block'
        signIn.setAttribute('disabled', 'disabled')
      }
    }
  }
  request.send(null)
}

//刷新用户信息
function refreshUserInfo() {
  if (!document.getElementById('points')) return false
  var request = new XMLHttpRequest()
  if (request) {
    request.open('GET', '/user/info', true)
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        var photo = document.getElementsByClassName('user-photo')[0]
        var name = document.getElementsByClassName('user-name')[0].innerHTML
        var point = document.getElementById('points').innerHTML
        photo.setAttribute('src', request.responseText.headimg)
        name = request.responseText.nickname
        point = request.responseText.points
      } else {
        return false
      }
    }
    request.send(null)
  }
}
//发布问卷或投票
function release() {
  var release = document.getElementById('release')
  if (!release) return false
  var links = document.getElementsByTagName('textarea')[0].value
  var data
  var request = new XMLHttpRequest()
  request.open('POST', '/new', true)
  if (release.innerHTML === "发布问卷") {
    data = {
      type: "question",
      data: links
    }
  } else {
    data = {
      type: "vote",
      data: links
    }
  }
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText.err === 0) {
        if (release.innerHTML === "发布问卷") {
          window.open('questionnaire.html', '_self')
        } else {
          window.open('vote.html', '_self')
        }
      }
    }
  }
  request.send(data)
}
//长按删除列表
function deleteItem() {
  var time = 0
  var list = document.getElementById('list')
  if (!list) return false
  var item = list.getElementsByTagName('li')
  for (var i = 0; i < item.length; i++) {
    item[i].addEventListener('touchstart', function () {
      time = setTimeout(remove, 500, this)
      return false
    })
    item[i].addEventListener('touchend', function () {
      clearTimeout(time)
      if (time != 0) {
        var links = this.getElementsByTagName('a')[0].getAttribute('href')
        var skip = confirm('确认前往该页面吗？')
        if (skip) {
          window.open(links, '_self')
        } else {
          return false
        }
      }
      return false
    })
    item[i].addEventListener('touchmove', function () {
      clearTimeout(time)
      time = 0
    })
  }
  function remove(elem) {
    time = 0
    var k = confirm('确定删除吗？')
    if (k) {
      list.removeChild(elem)
    } else {
      return false
    }
  }
}