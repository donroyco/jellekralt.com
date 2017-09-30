<template>
  <section id="writing">
    <span class="h1"><a href="/blogs">Blogposts</a></span>
    <ul class="post-list">
      <li class="post-item" v-for="post in posts">
        <div class="meta">
          <time datetime="2017-01-01T00:01:00" itemprop="datePublished" v-html="post.date"></time>
        </div>
        <span><nuxt-link :to="{ path: post.link }">{{ post.title }}</nuxt-link></span>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    props: ['posts'],
    head () {
      return {
        title: 'Jelle Kralt'
      };
    }
  };
</script>