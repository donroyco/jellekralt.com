<template>
  <header id="header">
    <a href="/">
  
      <div id="logo"></div>
    
      <div id="title">
        <h1>Jelle Kralt</h1>
      </div>
    </a>
    <div id="nav">
      <ul>
        <li class="icon">
          <a href="#"><i class="fa fa-bars fa-2x"></i></a>
        </li>        
        <li v-for="link in navigation"><a :href="link.href">{{ link.title }}</a></li>
      </ul>
    </div>
  </header>

</template>

<script>
  export default {
    props: ['navigation']
  };
</script>