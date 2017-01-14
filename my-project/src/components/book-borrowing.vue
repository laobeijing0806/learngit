<template>
  <div id="mainPage">
    <div class="book-borrowing">
      <div class="slogan">
        <h2>US.ING</h2>
        <span>技术，思考，分享，近期活动</span>
      </div>
      <div class="title">
        <span>图书借阅</span>
        <search :prompts @search="search"></search>
      </div>
      <ul class="book-list">
        <book-list :bookList="bookList" @borrowBook="borrowBook"></book-list>
      </ul>
    </div>
    <div class="my-book">
      <div class="mybook-bar">
        <div class="mybook-mid">
          <span class="icon-book"></span>
          <span>我的图书</span>
        </div>
      </div>
      <ul>
        <my-book :borrowedBooks="borrowedBooks" @returnBook="returnBook" @renew="renew">
        </my-book>
      </ul>
    </div>
  </div>
</template>

<script>
import bookList from './book-list.vue'
import myBook from './my-book.vue'
import search from './search.vue'

export default {
  name: 'bookborrowing',
  data () {
    return {
      bookList: [
        { name: '设计心理学', number: '0001', dayleft: 10 },
        { name: '你不知道的JavaScript', number: '0002', dayleft: 10 },
        { name: '移动应用UI设计模式', number: '0003', dayleft: 10 },
        { name: '用户体验要素', number: '0004', dayleft: 10 },
        { name: 'JavaScript高级程序设计', number: '0005', dayleft: 10 },
        { name: '精通CSS', number: '0006', dayleft: 10 },
        { name: 'DOM编程艺术', number: '0007', dayleft: 10 }
      ],
      copy: [
        { name: '设计心理学', number: '0001', dayleft: 10 },
        { name: '你不知道的JavaScript', number: '0002', dayleft: 10 },
        { name: '移动应用UI设计模式', number: '0003', dayleft: 10 },
        { name: '用户体验要素', number: '0004', dayleft: 10 },
        { name: 'JavaScript高级程序设计', number: '0005', dayleft: 10 },
        { name: '精通CSS', number: '0006', dayleft: 10 },
        { name: 'DOM编程艺术', number: '0007', dayleft: 10 }
      ],
      borrowedBooks: [
        { name: '小黄书', number: '0008', dayleft: 10 }
      ],
      keyword: null
    }
  },
  components: {
    'book-list': bookList,
    'my-book': myBook,
    'search': search
  },
  methods: {
    borrowBook (book, index) {
      let temp = false
      for (let i = 0; i < this.borrowedBooks.length; i++) {
        if (this.borrowedBooks[i].name === book.name) {
          temp = true
          break
        } else {
          continue
        }
      }
      if (temp) {
        this.bookList.splice(index, 1)
      } else {
        book.dayleft = 10
        this.borrowedBooks.unshift(book)
        this.bookList.splice(index, 1)
      }
    },
    returnBook (borrowedBook, index) {
      let temp = false
      for (let i = 0; i < this.bookList.length; i++) {
        if (this.bookList[i].name === borrowedBook.name) {
          temp = true
          break
        } else {
          continue
        }
      }
      if (temp) {
        this.borrowedBooks.splice(index, 1)
      } else {
        this.borrowedBooks.splice(index, 1)
        this.bookList.unshift(borrowedBook)
      }
    },
    renew (borrowedBook) {
      borrowedBook.dayleft += 10
    },
    search (keyword) {
      if (keyword == null || keyword === '') {
        this.bookList = this.copy
      } else {
        this.bookList = this.copy
        this.bookList = this.bookList.filter(function (item) {
          return item.name.match(keyword)
        })
      }
    },
    matches (keyword) {
      let prompts = [] 
      for (let i = 0; i < this.bookList.length; i++) {
        if (this.bookList[i].name.match(keyword)) {
          prompts = this.bookList[i].name
        } else {
          continue
        }
      }
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

#mainPage {
  font-family: Microsoft YaHei;
  position: absolute;
  background-color: #efefef;
  min-width: 1316px;
  min-height: 100vh;
  width: 100%;
  line-height: 1.15;
}

.book-borrowing {
  width: 821px;
  min-height: 100vh;
  float: left;
  margin-left: 149px;
  margin-top: 32px;
  background-color: #fff;
}

.slogan {
  color: #333;
  margin-left: 65px;
  margin-top: 16px;
}

.book-borrowing .slogan h2 {
  font-size: 24px;
  display: inline-block;
  font-weight: normal;
  margin: 0;
}

.book-borrowing .slogan span {
  margin-top: 27px;
  margin-left: 26px;
  color: #666;
  font-size: 12px;
}

.title {
  width: 700px;
  margin-left: 66px;
  margin-top: 52px;
  height: 25px;
  border-bottom: 1px solid #d8d6d6;
  position: relative;
  padding-bottom: 6px;
}

.book-borrowing .title span {
  font-size: 18px;
  color: #333;
  position: absolute;
  top: 5px;
  border-bottom: 3px solid #2c4456;
  padding-bottom: 6px;
}

.book-borrowing .book-list {
  margin-left: 66px;
  margin-top: 37px;
  padding: 0;
}

.my-book {
  float: left;
  width: 271px;
  min-height: 100vh;
  margin-top: 32px;
  background-color: #fff;
  margin-left: 14px;
}

.my-book .mybook-bar {
  width: 271px;
  height: 46px;
  border-bottom: 1px solid #d8d6d6;
}

.mybook-mid {
  width: 98px;
  height: 20px;
  margin: 0 auto;
  padding-top: 13px;
}

.my-book .mybook-bar .icon-book {
  width: 23px;
  height: 20px;
  display: block;
  background: url("../assets/mybook.png");
  background-size: 23px 20px;
  float: left;
  margin-right: 11px;
}

.my-book ul {
  width: 271px;
  padding: 0;
  min-height: 289px;
}
</style>
