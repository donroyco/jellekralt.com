<template>
  <div class="container">
    <page-header :navigation="navigation" />
    <nuxt/>
    <page-info-footer />
    <page-footer :navigation="navigation" />
  </div>
</template>

<script>
import PageFooter from '~/components/Footer.vue';
import PageInfoFooter from '~/components/FooterInfo.vue';
import PageHeader from '~/components/Header.vue';

export default {
  components: {
    PageFooter,
    PageInfoFooter,
    PageHeader
  },
  data: () => {
    return {
      navigation: [
        { title: 'Home', href: '/' },
        { title: 'Blog', href: '/blog' },
        { title: 'Linkdump', href: '/links' },
        { title: 'Projects', href: 'https://github.com/jellekralt' }
      ]
    };
  }
};
</script>
