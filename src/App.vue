<template>
  <div
    id="app"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <pc-home
      @search="search"
      @getMsg="getMsg"
      :msg="inputMsg"
      :wordData="wordData"
      :imgData="imgData"
    />
  </div>
</template>

<script>
import PcHome from "./views/pc/PcHome.vue";
export default {
  components: { PcHome },
  name: "app",
  data() {
    return {
      inputMsg: [],
      url: "https://bing.ioliu.cn/v1/",
      wordData: "", // 每日一言
      imgData: {}, // 每日壁纸
      loading: false
    };
  },
  created() {
    this.loading = true
    // 获取每日壁纸
    this.getImg();
    // 获取每日一言
    this.getWord();
    this.loading = false
  },
  methods: {
    getImg() {
      this.$axios
        .get("/imgapi/HPImageArchive.aspx?format=js&idx=0&n=1")
        .then((res) => {
          this.imgData = {
            msg: '成功',
            url: "https://cn.bing.com" + res.data.images[0].url,
            title: res.data.images[0].title,
          };
        })
        .catch((err) => {
          console.log("每日壁纸失败", err);
          this.imgData = {
            msg: '失败'
          }
        });
    },
    getWord() {
      this.$axios
        .get("/wordapi/dsapi/")
        .then((res) => {
          this.wordData = res.data.note;
        })
        .catch((err) => {
          console.log("每日一言失败", err);
        });
    },
    getMsg(input, name) {
      if (name == "百度") {
        let num = input.length;
        this.$axios
          .get(`/baiduapi/su?wd=${input}&p=3&cb=window.bdsug.sug`)
          .then((res) => {
            num += 33;
            let msg = res.data.slice(num);
            let msg2 = msg.slice(0, -3);
            this.inputMsg = JSON.parse(msg2);
          })
          .catch((err) => {
            console.log("搜索建议获取失败", err.message);
          });
      } else if (name == "必应") {
        console.log(name);
        this.$axios
          .get(`/bingapi/qsonhs.aspx?type=cb&q=${input}`)
          .then((res) => {
            console.log("成功", res.data.AS.Results);
            res.data.AS.Results.forEach((element) => {
              element.Suggests.forEach((res) => {
                this.inputMsg.push(res.Txt);
              });
            });
          })
          .then((err) => {
            console.log("失败", err);
          });
      } else if (name == "谷歌") {
        this.$axios
          .get(`/googleapi/complete/search?hl=zh&output=toolbar&q=${input}`)
          .then((res) => {
            console.log("成功", res);
          })
          .catch((err) => {
            console.log("失败", err);
          });
      }
    },
    // 搜索
    search(input, name) {
      if (name == "百度") {
        window.open(`https://www.baidu.com/s?wd=${input}`);
      } else if (name == "必应") {
        window.open(`https://www.bing.com/search?q=${input}`);
      } else if (name == "谷歌") {
        window.open(`https://www.google.com/search?q=${input}`);
      }
      this.inputMsg = [];
    },
  },
};
</script>

<style>
.imga {
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}
body,
html {
  height: 100%;
  width: 100%;
  margin: 0;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
