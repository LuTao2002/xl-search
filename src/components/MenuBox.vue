<template>
  <div class="box">
    <el-row style="height: 100%;">
      <el-col :span="24" class="btn">
        <i class="el-icon-arrow-down" @click="$emit('menuClose')"></i>
      </el-col>
      <el-col :xs="0" :span="4">
        <div class="nav-bar">
          <div class="title" v-for="(item, index) in menu" :key="index">
            {{ item.title }}
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :span="20" class="biaoqian">
        <div v-for="(item, index) in menu" :key="index" class="show">
          <div class="name">{{ item.title }}</div>
          <div class="www">
            <div
              v-for="(list, num) in item.data"
              :key="num"
              class="www-box"
              @click="open(list.url)"
            >
              <img :src="`${list.url}/favicon.ico`" alt="" />
              <div class="text">
                <div class="one">{{ list.name }}</div>
                <div class="two">{{ list.msg }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MenuBox",
  data() {
    return {
      menu: [
        {
          title: "书签",
          data: [
            {
              name: "B站",
              msg: "资料",
              url: "https://www.bilibili.com",
            },
            {
              name: "GitHub",
              msg: "代码",
              url: "https://github.com",
            },
          ],
        },
      ],
    };
  },
  methods: {
    open(url) {
      window.open(url);
      this.$emit("menuClose");
    },
  },
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 8%, 0.5);
  backdrop-filter: blur(30px);
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}
.btn {
  text-align: center;
  font-size: 40px;
  i {
    cursor: pointer;
  }
}
.biaoqian {
  height: 100%;
}
.show {
  text-align: left;
  height: 100%;
  .name {
    font-size: 20px;
    padding: 0 0 15px 0;
    margin-left: 15px;
    position: relative;
  }
  .name:after {
    content: "";
    display: block;
    width: 50px;
    height: 3px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: hsla(0, 0%, 100%, 0.3);
  }
  .www {
    width: 100%;
    display: flex;
    .www-box {
      width: 100px;
      display: flex;
      margin: 5px 10px;
      padding: 10px 50px 10px 10px;
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 50%;
      }
      .text {
        .one {
          width: 100%;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .two {
          color: #aeaeae;
          font-size: 0.6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .www-box:hover {
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      background: rgba(0, 0, 0, 0.3);
      transform: scale(1.05);
    }
  }
}
</style>


