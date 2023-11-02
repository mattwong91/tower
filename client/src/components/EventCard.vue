<template>
  <router-link :to="{name: 'EventDetails', params: {eventId: towerEvent.id}}">
    <div class="card event-card">
      <img class="img-fluid" :src="towerEvent.coverImg" :title="towerEvent.name" :alt="towerEvent.name">
      <p class="p-2">{{ towerEvent.name }}</p>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from "../models/TowerEvent";
export default {
  props:{
    towerEvent: {type: TowerEvent, required: true}
  },
  setup(){
  return {}
  }
};
</script>


<style lang="scss" scoped>
img{
  height: 20vh;
}
</style>