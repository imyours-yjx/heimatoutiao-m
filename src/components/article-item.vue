<template>
  <van-cell class="article-item">
    <template class="at" #title>{{ articles.title }} </template>
    <template #label>
      <div v-if="articles.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(image, index) in articles.cover.images"
          :key="index"
        >
          <van-image class="img3" fit="cover" :src="image" />
        </div>
      </div>
      <div class="at-bottom">
        <span>{{ articles.aut_name }}</span>
        <span>{{ articles.comm_count }}评论</span>
        <span>{{ articles.pubdate | relativeTime }}</span>
      </div>
    </template>
    <template #default
      ><van-image
        class="img1"
        v-if="articles.cover.type === 1"
        fit="cover"
        :src="articles.cover.images[0]"
      />
    </template>
  </van-cell>
</template>
<script>
export default {
  name: 'ArticleItem',
  props: {
    articles: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.article-item {
  .at {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    // width: 232px;
    // height: 146px;
  }
  .img1 {
    width: 232px !important;
    height: 146px;
  }
  .at-bottom span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 10px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 10px;
      }
      .img3 {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
