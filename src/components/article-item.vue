<template>
  <van-cell class="article-item">
    <template #title>{{ articles.title }} </template>
    <template #label>
      <div v-if="articles.cover.type === 3" class="cover-wrap">666</div>
      <div>
        <span>{{ articles.aut_name }}</span>
        <span>{{ articles.comm_count }}</span>
        <span>{{ articles.pubdate }}</span>
      </div>
    </template>
    <template #default
      ><van-image
        v.if="articles.cover.type === 1"
        width="100"
        height="100"
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
<style lang="less" scoped></style>
