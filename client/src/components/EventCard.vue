<template>
  <router-link :to="{name: 'EventDetails', params: {eventId: towerEvent.id}}">
    <div class="card position-relative my-2">
      <img class="img-fluid" :src="towerEvent.coverImg" :title="towerEvent.name" :alt="towerEvent.name">
      <s v-if="towerEvent.isCanceled" class="p-2">{{ towerEvent.name }}</s>
      <p v-else class="p-2">{{ towerEvent.name }}</p>
      <div v-if="towerEvent.isCanceled" class="p-2 position-absolute top-0 start-50 badge bg-danger translate-middle">
        Cancelled
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