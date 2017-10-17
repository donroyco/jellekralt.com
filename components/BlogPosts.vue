<template>
  <section class="post-list">
    <h2 class="post-list__title"><a href="/blog" class="post-list__title-link">Blogposts</a></h2>
    <ul class="post-list__items">
      <li class="post-list__item" v-for="post in posts" v-bind:key="post.slug">
        <div class="post-list__item-meta">
          <time datetime="2017-01-01T00:01:00" itemprop="datePublished" v-html="$options.filters.dateSuperscript(post.dateFormatted)"></time>
        </div>
        <span><nuxt-link :to="{ path: post.link }">{{ post.meta.concept ? '[CONCEPT] ' : '' }}{{ post.title }}</nuxt-link></span>
      </li>
    </ul>
    <span v-if="readMore" class="post-list__read-more">
      <i class="post-list__read-more-icon fa fa-arrow-circle-right"></i> 
      <nuxt-link to="/blog" class="post-list__read-more-link">More posts...</nuxt-link>
    </span>
  </section>
</template>

<script>
  export default {
    props: ['posts', 'read-more'],
    head () {
      return {
        title: 'Jelle Kralt'
      };
    }
  };
</script>