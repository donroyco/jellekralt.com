import Vue from 'vue';

Vue.filter('dateSuperscript', (value) => {
  value = value.replace(/nd|rd|th/, '<sup>$&</sup>');

  return value;
});
