<template>
  <div class="homie">
    <!-- 头部 -->

    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        class="search-btn"
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="v.name" v-for="(v, id) in channelsData" :key="id">
        <!-- 文章列表 -->
        <article-list :v="v" />
        <!-- 文章列表 -->
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getChannel } from '@/api/user';

import articleList from './comments/article-list.vue';
export default {
  components: { articleList },
  name: 'home',
  comments: { articleList },
  data() {
    return {
      active: 0,
      channelsData: [
        {
          id: '',
          name: '',
        },
      ],
    };
  },
  methods: {
    async getChannelss() {
      try {
        const { data } = await getChannel();
        // console.log(data);
        this.channelsData = data.data.channels;
      } catch (err) {
        this.$toast('获取数据失败咯');
      }
    },
  },
  created() {
    this.getChannelss();
  },
};
</script>

<style lang="less" scoped>
.homie {
  padding-bottom: 90px;
  .van-nav-bar {
    .van-icon {
      color: white;
      margin-top: 5px;
      font-size: 32px;
    }
  }
  .page-nav-bar {
    max-width: unset;

    .search-btn {
      width: 5.4rem;
      height: 64px;
      // color: white;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
    }
  }
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
.channel-tabs {
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }

  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}

/deep/.van-tabs__nav.van-tabs__nav--line.van-tabs__nav--complete {
  position: fixed;
  top: 90px;
  z-index: 1;
  left: 0;
  right: 0;
  height: 80px;
}
</style>
