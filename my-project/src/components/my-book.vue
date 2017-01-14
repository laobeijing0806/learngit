<template>
  <div>
    <li class="borrowed clearfix" v-for="(borrowedBook, index) in borrowedBooks" :key="borrowedBook.name">
      <h5>{{ borrowedBook.name }}</h5>
      <span class="num">编号：{{ borrowedBook.number }}</span>
      <span class="dayleft">剩余天数：{{ borrowedBook.dayleft }}</span>
      <button class="return" v-on:click="returnBook(borrowedBook, index)">归还</button>
      <button class="renew" v-on:click="renew(borrowedBook)">续借</button>
    </li>
  </div>
</template>

<script>
export default {
  name: 'myBook',
  props: {
    borrowedBooks: {
      type: Array,
      default () {
        return { name: '算法导论', number: '0000', dayleft: 10 }
      }
    }
  },
  methods: {
    returnBook (borrowedBook, index) {
      this.$emit('returnBook', borrowedBook, index)
    },
    renew (borrowedBook) {
      this.$emit('renew', borrowedBook)
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}

.clearfix:after {
  clear: both;
  visibility: hidden;
  content: " ";
  display: block;
  height: 0;
}

.borrowed {
  width: 233px;
  margin-left: 19px;
  margin-bottom: 56px;
}

.borrowed h5 {
  margin-top: 13px;
  margin-bottom: 38px;
  font-size: 15px;
  color: #333333;
}

.num {
  display: block;
  font-size: 13px;
  color: #6f6d6d;
  float: left;
  padding-top: 2px;
}

.dayleft {
  display: block;
  float: right;
  font-size: 15px;
  color: #f13f3f;
  margin-right: 3px;
}

.borrowed button {
  display: block;
  width: 104px;
  height: 32px;
  text-align: center;
  cursor: pointer;
  font-size: 15px;
  background-color: #fff;
  outline: none;
}

.return {
  float: left;
  border: 1px solid #f9a925;
  margin-top: 29px;
  color: #f9a925;

}

.renew {
  float: right;
  border: 1px solid #07a7f1;
  margin-top: 28px;
  color: #07a7f1;
}

</style>
