<template>
  <header id="header" role="header">
    <a href="/">
      <div id="logo"><img src="~/assets/img/jk.svg" alt="Logo" /></div>
      <div id="title">
        <h1>Jelle Kralt</h1>
      </div>
    </a>
    <nav id="nav" role="navigation">
      <ul :class="{ 'open': menuIsOpen }">
        <li class="icon" @click="menuIsOpen = !menuIsOpen">
          <button title="Menu"><i class="fa fa-bars fa-2x"></i></button>
        </li>        
        <li v-for="link in navigation" v-bind:key="link.href"><a :href="link.href">{{ link.title }}</a></li>
      </ul>
    </nav>
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
