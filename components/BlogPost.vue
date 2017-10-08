<template>
  <article class="post" itemscope itemtype="http://schema.org/BlogPosting">
    <header>
      <h1 class="posttitle" itemprop="name headline" v-if="post.meta.title">{{ post.meta.title }}</h1>
      <div class="meta">
        <span class="author" itemprop="author" itemscope itemtype="http://schema.org/Person" v-if="post.meta.author">
          <span itemprop="name">{{ post.meta.author }} </span>
        </span>
        <div class="postdate">
          <time datetime="post.date" itemprop="datePublished">{{ post.dateFormatted }}</time>
        </div>
        <span>&nbsp;</span> <!-- TODO: Get rid of these dirty hacks -->
        <div class="article-tag" v-if="post.meta.tags && post.meta.tags.length">
          <i class="fa fa-tag"></i>
          <span>&nbsp;</span> <!-- TODO: Get rid of these dirty hacks -->
          <span v-for="(tag, index) in post.meta.tags" v-bind:key="index">
            <a class="tag-link" v-bind:href="`/blog/tags/${tag}`">{{ tag }}</a>
            <span v-if="index !== post.meta.tags.length - 1">, </span>
          </span>
        </div>
      </div>
    </header>
    <div class="content" v-html="post.content"></div>
    <disqus/>
  </article>
</template>

<script>
  import Disqus from '~/components/Disqus.vue';

  export default {
    components: {
      Disqus
    },
    props: ['post']
  };
</script>