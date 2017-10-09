<template>
  <section id="writing">
    <h2 class="h1"><a href="/blog">Blogposts</a></h2>
    <ul class="post-list">
      <li class="post-item" v-for="post in posts" v-bind:key="post.slug">
        <div class="meta">
          <time datetime="2017-01-01T00:01:00" itemprop="datePublished" v-html="$options.filters.dateSuperscript(post.dateFormatted)"></time>
        </div>
        <span><nuxt-link :to="{ path: post.link }">{{ post.meta.concept ? '[CONCEPT] ' : '' }}{{ post.title }}</nuxt-link></span>
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