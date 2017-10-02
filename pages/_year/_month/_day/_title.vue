<template>
  <article class="post" itemscope itemtype="http://schema.org/BlogPosting">
    <div class="content" v-html="post.content"></div>
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