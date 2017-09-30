<template>
  <div>
  <about/>
  <!-- <blog-posts v-bind:posts="posts"/> -->
  </div>
</template>

<script>
// import { parse, format } from 'date-fns';
// import axios from '~/plugins/axios';
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
    // let { data } = await axios.get('/api/blog');

    // return {
    //   posts: data.map(post => {
    //     post.dateFormatted = format(parse(post.date), 'MMM Do YYYY');
    //     post.link = format(parse(post.date), '/YYYY/MM/DD/') + post.slug;

    //     return post;
    //   })
    // };

    let x = await app.$content('/')
      .query({ exclude: ['attributes', 'body'] })
      .getAll();

    console.log('x', x);

    return {
      posts: await app.$content('/')
        .query({ exclude: ['attributes', 'body'] })
        .getAll()
    };
  },
  head () {
    return {
      title: 'Jelle Kralt'
    };
  }
};
</script>