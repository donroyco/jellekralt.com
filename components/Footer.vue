<template>
  <footer>
    <div class="footer-left">
      Copyright &copy; {{ year }} Jelle Kralt
    </div>
    <div class="footer-right">
      <nav>
        <ul>
          <li v-for="link in navigation"><a :href="link.href">{{ link.title.toLowerCase() }}</a></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  props: ['navigation'],
  data: () => ({
    year: new Date().getUTCFullYear()
  })
};
</script>
