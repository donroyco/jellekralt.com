<template>
  <div>
  <about/>
  <blog-posts v-bind:posts="posts"/>
  </div>
</template>

<script>
import { parse, format } from 'date-fns';
import axios from '~/plugins/axios';
import About from '~/components/About.vue';
import BlogPosts from '~/components/BlogPosts.vue';

export default {
  components: {
    About,
    BlogPosts
  },
  data () {
    return { posts: [] };
  },
  async asyncData ({ app }) {
    let { data } = await axios.get('/api/blog/');

    console.log('data', data);

    return {
      posts: data.map(post => {
        post.dateFormatted = format(parse(post.date), 'MMM Do YYYY');
        post.link = format(parse(post.date), '/YYYY/MM/DD/') + post.slug;

        return post;
      })
    };
  },
  head () {
    return {
      title: 'Jelle Kralt'
    };
  }
};
</script>