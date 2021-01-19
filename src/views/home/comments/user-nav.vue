<template class="user-nav">
  <div class="top">
    <van-cell slot="title" title="我的频道" value="内容" class="header">
      <van-button type="danger" plain round size="mini" class="nav-btn"
        >编辑</van-button
      >
    </van-cell>

    <van-grid class="iconnav" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channels, index) in myChannelsData"
        icon="cross"
        :key="index"
      >
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            channels.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell slot="title" title="频道推荐" class="header"> </van-cell>

    <van-grid :gutter="10" class="nav-icon">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(alls, index) in subChannel"
        :key="index"
        @click="addChannel(alls)"
      >
        <template #text>
          <span class="text">{{ alls.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { getAllChannels } from '@/api/user';
export default {
  name: 'user-nav',
  props: {
    myChannelsData: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async getAllChannel() {
      try {
        const { data: res } = await getAllChannels();
        console.log(res);
        this.list = res.data.channels;
      } catch (err) {
        this.$toast('获取所有频道失败！');
      }
    },
    addChannel(alls) {
      console.log(alls);
      const allID = alls.id;
      console.log(allID);
      this.myChannelsData.forEach((xID) => {
        if (xID !== allID) {
          return this.myChannelsData.push(alls);
        }
      });
    },
  },
  created() {
    this.getAllChannel();
  },
  computed: {
    subChannel() {
      const allChanls = [];
      this.list.forEach((itChannel) => {
        const ret = this.myChannelsData.find((channelsed) => {
          return channelsed.id === itChannel.id;
        });
        if (!ret) {
          allChanls.push(itChannel);
        }
      });
      return allChanls;
      // 还可以用filter来遍历数组
    },
  },
};
</script>
<style lang="less" scoped>
.top {
  padding-top: 85px;
  .header {
    // margin-top: 80px;
    font-size: 40px;
    .nav-btn {
      width: 100px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid #f85959;
      top: -10px;
    }
  }
  /deep/.iconnav {
    .van-grid-item__content {
      .van-grid-item__icon {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: gray;
        z-index: 10;
      }
    }
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
    }
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
    }
    .active {
      color: red;
    }
  }
  /deep/ .van-grid-item__content {
    flex-direction: row;
    white-space: nowrap;
    .van-icon-plus {
      font-size: 31px;
      margin-top: 7px;
      margin-right: 5px;
    }
    .van-grid-item__text {
      margin-top: 0;
      margin-left: 10px;
    }
  }
  .van-grid {
    margin-top: 25px;
  }
}
</style>
