<template>
  <div class="page">
    <header>
      <h3><i>BLOG PAGE</i></h3>
    </header>
    <div
      class="blog"
      v-for="blog in blogs"
      :title="blog.title"
      @click="goDetailPage(blog)"
      :key="blog.title"
    >
      <div class="header">{{ blog.title }}</div>
      <div class="content">{{ blog.content }}</div>
    </div>
  </div>
</template>
<script>
import blogs from "../mock/blog.json";
export default {
  name: "blog",
  data() {
    return {
      blogs: blogs,
    };
  },
  methods: {
    goDetailPage(blog) {
      console.log("got detail by", blog);
    },
  },
};
</script>
<style type="text/css" scoped>
.blog {
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  margin: 0.3rem 0.3rem;
}
.blog .header,
.content {
  height: 2rem;
  line-height: 2rem;
  transition: max-height 1s;
  box-sizing: border-box;
}
.blog .header {
  font-size: 1.2rem;
  background: skyblue;
  border-radius: 0.3rem;
}
.blog .content {
  max-height: 0px;
  overflow: hidden;
}
.blog .header:hover + .content {
  max-height: 5rem;
}
.blog .header:active + .content {
  max-height: 5rem;
}
</style>