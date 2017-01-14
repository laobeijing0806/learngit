<template>
  <div>
    <input type="text" placeholder="搜索图书" id="search" v-model="keyword" />
    <button id="submit" v-on:click="search(keyword)"></button>
    <ul class="prompt">
      <li v-for="prompt in prompts">
        <span>{{ prompt }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      prompts: ['设计心理学', '你不知道的JavaScript', '用户体验要素', '精通CSS', 'JavaScript高级程序设计'],
      keyword: null
    }
  },
  methods: {
    search (keyword) {
      this.$emit('search', keyword)
    }
  }
}
</script>

<style scoped>
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

#search {
  border: 1px solid #c0ccda;
  border-radius: 4px;
  float: right;
  height: 19px;
  width: 188px;
  background-color: #f9fafc;
  outline: none;
}

input[placeholder] {
  font-family: Microsoft YaHei;
  font-size: 14px;
  color: #99A9BF;
  line-height: 14px;
  padding-left: 5px;
  padding-bottom: 2px;
}

#submit {
  border: none;
  width: 29px;
  height: 22px;
  cursor: pointer;
  padding: 0;
  position: absolute;
  right: 0px;
  top: 1px;
  border-left: 1px solid #C0CCDA;
  background: url("../assets/search.png") no-repeat center;
  background-size: 18px 18px;
  outline: none;
}

.prompt {
  width: 193px;
  position: absolute;
  right: 0;
  top: 26px;
  background-color: #f9fafc;
  z-index: 999;
  box-shadow: 0 1px #c0ccda;
  border: 1px solid #c0ccda;
  border-radius: 5px;
}

.prompt li:hover {
  background-color: #d6e9f8;
  cursor: pointer;
}

.prompt li span {
  font-size: 13px;
  color: #99A9BF;
  font-family: Microsoft YaHei;
}
</style>