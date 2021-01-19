<template>
  <div class="my_container">
    <!-- 登录状态 -->
    <div v-if="$store.state.user" class="my_header user_info">
      <div class="base_info">
        <div class="header_photo">
          <van-image
            round
            :src="userInformation.photo"
            class="imgg"
            fit="cover"
          />
          <span class="text">{{ userInformation.name }}</span>
        </div>
        <div class="bianji">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>

      <div class="data_info">
        <div class="data_item">
          <span class="count">{{ userInformation.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data_item">
          <span class="count">{{ userInformation.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data_item">
          <span class="count">{{ userInformation.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data_item">
          <span class="count">{{ userInformation.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
      <!-- /登录状态 -->
      <!-- 未登录 -->
    </div>
    <div v-else class="my_header no_login">
      <div class="my_headerBac" @click="denglu" style="cursor: pointer;">
        <img src="~@/assets/mobile.png" alt="" width="80px" height="80px" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- /未登录 -->
    <!-- 宫格导航 -->
    <van-grid clickable :column-num="2">
      <!-- 收藏 -->
      <van-grid-item to="/">
        <i
          slot="icon"
          class="toutiao toutiao-shoucang"
          style="color: purple; font-size: 28px;"
        ></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <!-- 历史 -->
      <van-grid-item to="/">
        <i
          slot="icon"
          class="toutiao toutiao-lishi"
          style="color: red; font-size: 28px;"
        ></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell class="tuichu" title="消息通知" is-link to="/" />
    <van-cell title="旺仔" is-link to="/" />
    <!-- <van-cell class="" title="退出登录" to="/" style="cursor: pointer;" /> -->
    <van-button
      class="tuichu"
      type="default"
      size="large"
      to="login"
      style="color: red;"
      v-if="$store.state.user"
      @click="shanchu"
      >退出登录</van-button
    >
  </div>
</template>

<script>
// import { removeItem } from '@/utils/storage';
import { userInfo } from '@/api/user';
// const goOut = 'TOUTIAO_USER';
// const gugn = ;
export default {
  name: 'my',
  data() {
    return {
      userInformation: {},
    };
  },
  methods: {
    denglu() {
      this.$router.push('/login');
    },
    shanchu() {
      // removeItem('TOUTIAO_USER');
      // this.$store.state.user = null;
      this.$store.commit('setUser', null);
    },
    async loadUserInfo() {
      try {
        const { data: res } = await userInfo();
        console.log(res);
        this.userInformation = res.data;
      } catch (err) {
        this.$toast('请重新登录！');
      }
    },
  },
  created() {
    // 判断用户登录了才获取数据
    if (this.$store.state.user) {
      this.loadUserInfo();
    }
  },
};
</script>

<style lang="less" scoped>
.my_header {
  height: 361px;
  background: url('~@/assets/banner.png');
  background-size: cover;
}
.no_login {
  display: flex;
  justify-content: center;
  align-items: center;

  .my_headerBac {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
    .text {
      margin-top: 15px;
      font-size: 35px;
      color: white;
    }
  }
}
.user_info {
  .base_info {
    height: 231px;
    // background-color: green;
    display: flex;
    justify-content: space-between;
    .header_photo {
      display: flex;
      align-items: center;
      .imgg {
        width: 132px;
        height: 132px;
        margin-top: 76px;
        margin-bottom: 23px;
        margin-left: 30px;
        border: 1px solid white;
      }
      .text {
        margin-top: 50px;
        margin-left: 15px;
        font-size: 38px;
        color: white;
      }
    }
    .bianji {
      margin-top: 98px;
      margin-right: 30px;
    }
  }
  .data_info {
    height: 130px;
    // background-color: blue;
    display: flex;
    .data_item {
      flex: 1;
      height: 130px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}
.tuichu {
  margin-top: 20px;
}
</style>
