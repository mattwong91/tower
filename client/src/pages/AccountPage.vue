<template>
<div class="container-fluid">
  <!-- SECTION MY EVENTS TO ATTEND -->
  <section class="row">
    <!-- TODO EVENT CARDS GO HERE -->
  </section>
  <!-- !SECTION MY EVENTS TO ATTEND -->

  <!-- SECTION MY TICKETS -->
  <section class="row">
    
  </section>
  <!-- !SECTION MY TICKETS -->
</div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
