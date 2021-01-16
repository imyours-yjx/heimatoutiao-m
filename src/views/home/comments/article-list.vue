<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item v-for="(x, index) in list" :key="index" :articles="x" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/user';

import articleItem from '@/components/article-item.vue';
export default {
  components: { articleItem },
  name: 'articleList',
  props: {
    v: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      refreshing: false,
    };
  },
  methods: {
    async onLoad() {
      // 请求获取数据
      try {
        const { data } = await getArticle({
          channel_id: this.v.id, // 频道ID
          timestamp: this.timestamp || Date.now(), // 时间戳
          with_top: 1, // 是否包含置顶项
        });
        console.log(data);
        // 把数据放入list
        const { results } = data.data;
        this.list.push(...results);
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        // 将加载状态设置为结束
        this.loading = false;
        // 判断数据是否加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        // this.$toast('获取列表数据失败！');
        console.log(err);
        // this.error = true;
        if (this.data) {
          this.error = true;
        } else {
          this.error = false;
        }

        this.loading = false;
      }
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  //   created() {
  //     if (this.$store.state.user.data.token) {
  //       this.onLoad();
  //     }
  //   },
};
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
/deep/.van-tab__pane {
  margin-top: 45px;
}
</style>
