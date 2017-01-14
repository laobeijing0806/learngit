<template>
  <div id="book-list">
    <li v-for="(book, index) in bookList" :key="book.name">
      <h5>{{ index+1 }} {{ book.name }}</h5>
      <span>编号：{{ book.number }}</span>
      <button v-on:click="borrowBook(book, index)">借阅</button>
    </li>
  </div>
</template>
<script>
export default {
  name: 'bookList',
  props: {
    bookList: {
      type: Array,
      default () {
        return { name: '面向对象程序设计', number: '0000', dayleft: 10 }
      }
    }
  },
  methods: {
    borrowBook (book, index) {
      this.$emit('borrowBook', book, index)
    }
  }
}
</script>
<style scoped>
li {
  list-style: none;
}

#book-list li {
  width: 700px;
  border-bottom: 1px solid #d8d6d6;
  margin-top: 30px;
  position: relative;
}

#book-list li h5 {
  font-size: 15px;
  font-family: Microsoft YaHei;
  font-weight: normal;
  color: #333333;
  height: 18px;
  margin-bottom: 11px;
  margin-top: 0;
}

#book-list li span {
  display: block;
  font-size: 13px;
  font-family: Microsoft YaHei;
  color: #767373;
  padding-left: 13px;
  margin-bottom: 5px;
}

#book-list li button {
  position: absolute;
  right: 0;
  bottom: 8px;
  width: 91px;
  height: 34px;
  padding: 0;
  color: #fff;
  font-size: 15px;
  background-color: #07a7f1;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
