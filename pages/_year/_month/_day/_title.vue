<template>
  <!-- TODO: Move to component -->
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
    <!-- Create disqus component -->
    <div id="disqus_thread"></div>
    <script>
      /* eslint-disable */
      /**
      *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
      *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
      /*
      var disqus_config = function () {
      this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      */
      (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://jellekralt.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
      })();
      /* eslint-enable */
    </script>
  </article>
</template>

<script>
import { isValid, parse, format } from 'date-fns';
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

      data.dateFormatted = format(parse(data.date), 'MMM Do YYYY');

      if (data.meta && data.meta.tags && typeof data.meta.tags === 'string') {
        data.meta.tags = data.meta.tags.split(',').map(tag => tag.trim());
      }

      return {
        post: data
      };
    } catch (e) {
      console.error(e.message);
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