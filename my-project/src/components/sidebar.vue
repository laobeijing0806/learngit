<template>
  <div id="nav">
    <div class="nav-user">
      <div class="icon-user"></div>
      <span>小明</span>
    </div>
    <ul class="nav-list">
      <li>
        <router-link to="/home">
          <span class="icon-home com"></span>
          <span class="font">主页</span>
        </router-link>
      </li>
      <li>
        <router-link to="/administration">
          <span class="icon-xz com"></span>
          <span class="font">行政</span>
        </router-link>
      </li>
      <li>
        <router-link to="/mail">
          <span class="icon-mail com"></span>
          <span class="font">邮件</span>
        </router-link>
      </li>
      <li class="selected">
        <router-link to="/book">
          <span class="icon-book com"></span>
          <span class="font">图书</span>
        </router-link>
      </li>
      <li>
        <router-link to="/advice">
          <span class="icon-advice com"></span>
          <span class="font">建议</span>
        </router-link>
      </li>
    </ul>
    <ul class="nav-options">
      <li class="icon-exit"></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'sidebar'
}
</script>
<style scoped>
  a {
    text-decoration: none;
  }

  #nav {
    width: 60px;
    background-color: #2C4456;
    height: 100vh;
    font-family: Microsoft YaHei;
    position: fixed;
    z-index: 999;
  }

  #nav ul {
    padding: 0;
  }

  .nav-user {
    padding-top: 32px;
    margin-left: 10px;
    cursor: pointer;
  }

  .icon-user {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #07A7F1;
    border: 1px solid #fff;
    margin-bottom: 12px;
  }

  #nav .nav-user span {
    font-size: 12px;
    color: #fff;
    margin-left: 8px;
    display: block;
  }

  #nav .nav-list {
    position: absolute;
    top: 23%;
    left: 10px;
  }

  #nav .nav-list li {
    width: 36px;
    height: 36px;
    cursor: pointer;
    line-height: 32px;
    text-align: center;
    margin-bottom: 45px;
  }

  .font {
    font-size: 14px;
    color: #adadad;
    opacity: 0.55;
  }

  .com {
    display: block;
    width: 30px;
    height: 29px;
    margin: 0 auto;
  }

  .icon-home {
    background: url("../assets/administration.png") center center;
    -webkit-background-size: 30px 30px;
  }

  .icon-xz {
    background: url("../assets/administration.png") center center;
    -webkit-background-size: 30px 30px;
  }

  .icon-mail {
    height: 23px;
    background: url("../assets/mail.png") center center;
    -webkit-background-size: 30px 23px;
  }

  .icon-book {
    height: 27px;
    background: url("../assets/book.png") center center;
    -webkit-background-size: 30px 27px;
  }

  .icon-advice {
    background: url("../assets/advice.png") center center;
    -webkit-background-size: 30px 30px;
  }

  #nav .nav-options {
    position: absolute;
    bottom: 40px;
    left: 20px;
  }

  #nav .nav-options li {
    width: 20px;
    height: 20px;
    cursor: pointer;
    line-height: 20px;
    color: #fff;
    opacity: 0.56;
    margin: 0 auto;
  }

  .icon-exit {
    display: block;
    width: 20px;
    height: 20px;
    background: url("../assets/logout.png") center center;
    -webkit-background-size: 20px 20px;
    margin: 0 auto;
  }
</style>