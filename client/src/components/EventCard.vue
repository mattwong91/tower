<template>
  <router-link :to="{name: 'EventDetails', params: {eventId: towerEvent.id}}">
    <div class="card">
      <img class="img-fluid" :src="towerEvent.coverImg" :title="towerEvent.name" :alt="towerEvent.name">
      <div v-if="towerEvent.isCanceled" class="mt-1">
        <s class="p-2">{{ towerEvent.name }}</s>
        <p class="text-danger p-2">Cancelled</p>
      </div>
      <div v-else class="mt-1">
        <p class="p-2">{{ towerEvent.name }}</p>
      </div>
    </div>
  </router-link>
</template>


<script>
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
p{
  margin-bottom: 0;
}
.card:hover{
  box-shadow: 0px 0px 7px rgb(40, 40, 40);
  transition: ease-in-out 0.25s;
}
</style>