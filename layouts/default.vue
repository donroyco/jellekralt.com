<template>
  <div class="content index width mx-auto px2 my4">
    <page-header :navigation="navigation" />
    <nuxt/>
    <page-footer :navigation="navigation" />
  </div>
</template>

<script>
import 'highlight.js/styles/vs.css';
import hljs from 'highlight.js';
import PageFooter from '~/components/Footer.vue';
import PageHeader from '~/components/Header.vue';

export default {
  components: {
    PageFooter,
    PageHeader
  },
  data: () => {
    return {
      navigation: [
        { title: 'Home', href: '/' },
        { title: 'Blog', href: '/blog' },
        { title: 'Projects', href: 'https://github.com/jellekralt' }
      ]
    };
  },
  mounted: () => {
    hljs.initHighlightingOnLoad();
  }
};
</script>
