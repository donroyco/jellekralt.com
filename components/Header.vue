<template>
  <header id="header">
    <a href="/">
  
      <div id="logo"></div>
    
      <div id="title">
        <h1>Jelle Kralt</h1>
      </div>
    </a>
    <div id="nav">
      <ul :class="{ 'open': menuIsOpen }">
        <li class="icon" @click="menuIsOpen = !menuIsOpen">
          <button title="Menu"><i class="fa fa-bars fa-2x"></i></button>
        </li>        
        <li v-for="link in navigation" v-bind:key="link.href"><a :href="link.href">{{ link.title }}</a></li>
      </ul>
    </div>
  </header>

</template>

<script>
  export default {
    props: ['navigation'],
    data: () => ({
      menuIsOpen: false
    })
  };
</script>