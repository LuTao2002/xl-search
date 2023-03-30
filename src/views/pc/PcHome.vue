<template>
  <div class="pc-home">
    <div class="search">
      <div class="input">
        <img @click="searchChange = !searchChange" :src="imgUrl.url" alt="" />
        <input
          @focus="inputFocus"
          @blur="focusShow = false"
          @keyup.enter="getSearch()"
          type="text"
          v-model="input"
          placeholder="搜点什么..."
        />
        <i @click="getSearch" class="el-icon-search"></i>
      </div>
    </div>
    <div class="center">
      <div class="searchChange">
        <el-collapse-transition>
          <ul v-show="searchChange" class="ul-box">
            <li
              v-for="(item, index) in searchImg"
              :key="index"
              @click="onSwitch(index)"
            >
              <img :src="item.url" alt="" :class="item.show ? 'active' : ''" />
              <p :class="item.show ? 'color' : ''">{{ item.name }}</p>
            </li>
            <li class="right" @click="searchChange = false">
              <i class="el-icon-circle-close"></i>
            </li>
          </ul>
        </el-collapse-transition>
      </div>
      <div class="searchMsg">
        <el-collapse-transition>
          <ul v-show="searchMsg">
            <li
              v-for="(item, index) in msg"
              :key="index"
              @click="msgShow(item)"
            >
              {{ item }}
            </li>
          </ul>
        </el-collapse-transition>
      </div>
      <p class="txt">A browser</p>
    </div>
    <div
      :class="focusShow ? 'home-img back' : 'home-img'"
      @click="clear"
      :style="{ background: !focusShow ? `url(${url}) center center / cover fixed` : `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${url}) center center / cover fixed` }"
    ></div>
    <!-- <div @click="clear" :class="focusShow ? 'background back-black' : 'background'"></div> -->
  </div>
</template>

<script>
export default {
  name: "pc-home",
  data() {
    return {
      searchImg: [
        {
          name: "百度",
          show: true,
          url: require("@/assets/baidu.png"),
        },
        {
          name: "必应",
          show: false,
          url: require("@/assets/bing.png"),
        },
        {
          name: "谷歌",
          show: false,
          url: require("@/assets/google.png"),
        },
      ],
      //url: "https://bing.ioliu.cn/v1/",
      url: 'https://cn.bing.com//th?id=OHR.NuzzleManatee_ZH-CN3263788190_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
      input: "", // input输入的值
      searchChange: false, // 搜索引擎编辑框是否显示
      searchMsg: false, // 搜索提示框是否显示
      focusShow: false, // 背景图片是否放大
    };
  },
  props: ["msg"],
  computed: {
    imgUrl() {
      let urlObj = this.searchImg.filter((res) => {
        return res.show;
      });
      return urlObj[0];
    },
  },
  watch: {
    input(newName, oldName) {
      setTimeout(() => {
        this.getInput(newName);
      }, 1000);
    },
  },
  created() {
    this.getInit();
  },
  methods: {
    // 项目初始化检测本地是否有用户数据
    getInit() {
      const userData = window.localStorage.getItem("xl-user-search-data");
      if (userData) {
        // 有数据导入本地数据数据
        this.searchImg = JSON.parse(userData);
      } else {
        // 没有数据使用默认数据
        this.searchImg = [
          {
            name: "百度",
            show: true,
            url: require("@/assets/baidu.png"),
          },
          {
            name: "必应",
            show: false,
            url: require("@/assets/bing.png"),
          },
          {
            name: "谷歌",
            show: false,
            url: require("@/assets/google.png"),
          },
        ];
        // 并导入本地
        window.localStorage.setItem(
          "xl-user-search-data",
          JSON.stringify(this.searchImg)
        );
      }
    },
    getInput(newName) {
      if (newName !== "") {
        this.$emit("getMsg", newName, this.imgUrl.name);
        this.searchMsg = true;
      } else {
      }
    },
    msgShow(item) {
      this.input = item;
      this.getSearch();
    },
    inputFocus() {
      this.searchChange = false;
      this.focusShow = true;
    },
    // 搜索
    getSearch() {
      if (this.input == "") {
        this.$notify.info({
          title: "提示",
          message: "您还没有输入要搜索的内容",
        });
      } else {
        this.$emit("search", this.input, this.imgUrl.name);
      }

      this.input = "";
      this.$attrs.msg = "";
      this.searchMsg = false;
      this.focusShow = false;
    },
    // 清空
    clear() {
        console.log('!!!')
      this.input = "";
      this.$attrs.msg = "";
      this.searchMsg = false;
      this.focusShow = false;
    },
    // 切换默认搜索引擎
    onSwitch(index) {
      this.searchImg.forEach((element) => {
        element.show = false;
      });
      this.searchImg[index].show = true;
      // 并导入本地
      window.localStorage.setItem(
        "xl-user-search-data",
        JSON.stringify(this.searchImg)
      );
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  opacity: unset !important;
}
.color {
  color: #1e90ff !important;
}
.back {
  transition: 0.3s !important;

  transform: scale(1.05) !important;
}
// .back-black {
//     filter: blur(5px) !important;
//     background: black !important;
//     opacity: 0.5;
//     transform: calc(1.05) !important;
//     transition: 0.3s !important;
// }
.pc-home {
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  .home-img {
    width: 100%;
    height: 100%;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    // background: url(https://cn.bing.com//th?id=OHR.NuzzleManatee_ZH-CN3263788190_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp)
    //   center center / cover fixed;
    // background: center center / cover fixed;
  }

//   .background {
//     width: 100%;
//     height: 100%;
//     position: relative;
//     left: 0;
//     right: 0;
//     top: 0;
//     bottom: 0;
//     z-index: 10;
//   }
  .search {
    width: 50%;
    height: 50px;
    max-width: 1000px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    z-index: 20;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    .input {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      opacity: 0.3;
      -moz-user-select: text !important;
      user-select: text !important;
      -webkit-user-select: text !important;
      background: #fff;
      box-shadow: 0 2px 8px 0 rgba(99, 99, 99, 0.2);
      box-sizing: border-box;
      img {
        width: 25px;
        transition: 0.3s;
        cursor: pointer;
      }
      img:hover {
        transition: 0.3s;
        transform: scale(1.2);
      }
      input {
        width: 100%;
        margin: 0 15px;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
        font-size: 1rem;
        -moz-user-select: text !important;
        user-select: text !important;
        -webkit-user-select: text !important;
      }
      i {
        transition: 0.3s;
        transform: scale(1.3);
        cursor: pointer;
      }
      i:hover {
        transition: 0.3s;
        transform: scale(1.5);
      }
    }
    .input:hover {
      opacity: 0.4;
    }
    .input:focus-within {
      opacity: unset;
    }
  }
//   .search:has(> .input:focus-within) ~ .background {
//     filter: blur(5px);
//     background: black;
//     opacity: 0.5;
//     transform: calc(1.05);
//     transition: 0.3s;
//   }
  //   .search:has(> .input:focus-within) ~ .searchChange {
  //     display: none;
  //   }
  .center {
    width: 50%;
    max-width: 1000%;
    height: auto;
    position: absolute;
    top: 39%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    .searchChange {
      width: 100%;
      height: auto;
      background: white;
      border-radius: 10px;
      ul {
        display: flex;
        list-style: none;
        padding: 10px 20px;
        margin: 0;
        box-sizing: border-box;
      }
      .ul-box {
        position: relative;
        .right {
          transition: 0.3s;
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          font-size: 20px;
          cursor: pointer;
        }
      }
      .right:hover {
        transition: 0.3s;
        font-size: 25px;
      }
      li {
        width: 50px;
        font-size: 12px;
        text-align: center;
        img {
          width: 30px;
          opacity: 0.3;
        }
        p {
          margin: 0;
          color: gray;
        }
      }
    }
    .searchMsg {
      width: 100%;
      height: auto;
      background: white;
      border-radius: 10px;
      box-sizing: border-box;
      overflow: hidden;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      li {
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        cursor: pointer;
        u {
          width: 100%;
        }
      }
      li:hover {
        background: #e6e6e6;
        transition: 0.3s;
        padding-left: 30px;
      }
    }
    .txt {
      width: 100%;
      text-align: center;
      color: white;
      cursor: pointer;
      margin: 10px 0 0 0;
    }
  }
}
</style>