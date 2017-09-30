<template>
  <section class="container">
    {{ post.title }}
  </section>
</template>

<script>
import { isValid, parse } from 'date-fns';
import axios from '~/plugins/axios';

export default {
  name: 'id',
  validate ({ params }) {
    let date = parse(`${params.year}-${params.month}-${params.day}T00:00:00Z`);

    return isValid(date);
  },
  async asyncData ({ params, error }) {
    try {
      let { data } = await axios.get(`/api/blog/${params.year}/${params.month}/${params.day}/${params.title}`);

      return {
        post: data
      };
    } catch (e) {
      return error({ statusCode: 404, message: 'Post not found' });
    }
  },
  head () {
    return {
      title: `${this.post ? this.post.title || '' : ''} · Jelle Kralt`
    };
  }
};
</script>