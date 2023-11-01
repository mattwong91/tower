<template>
<div class="container-fluid">
  <!-- SECTION HEADER IMAGE AREA, LOGO -->
  <section class="row">
    
  </section>
  <!-- !SECTION HEADER IMAGE AREA, LOGO -->

  <!-- SECTION FILTER BAR -->
  <section class="row p-3 bg-dark justify-content-around mt-3">


        <div class="col-12 col-md-2">
          <button @click="filterType('')" class="btn btn-light w-100 my-2 mx-md-2">ALL</button>
        </div>
        <div v-for="eventType in eventTypes" :key="eventType" class="col-12 col-md-2">
          <button @click="filterType(eventType)" class="btn btn-light w-100 my-2 mx-md-2">
            {{ eventType.toUpperCase() }}
          </button>
        </div>

  </section>
  <!-- !SECTION FILTER BAR -->

  <!-- SECTION EVENT CARDS -->
  <section class="row my-2">
    <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-6 col-md-3 my-2">
      <div class="card event-card">
        <img class="img-fluid" :src="towerEvent.coverImg" :title="towerEvent.name" :alt="towerEvent.name">
        <p class="p-2">{{ towerEvent.name }}</p>
      </div>
    </div>
  </section>
  <!-- !SECTION EVENT CARDS -->
</div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import Pop from "../utils/Pop";
import {towerEventsService} from "../services/TowerEventsService.js"
import { AppState } from "../AppState";

export default {
  setup() {
    const eventTypes = ['concert', 'convention', 'sport', 'digital']
    const filteredType = ref('')
    onMounted(()=>{
      getTowerEvents()
    })
    async function getTowerEvents(){
      try {
        await towerEventsService.getTowerEvents()
      } 
      catch (error) {
        Pop.error(error)
      }
    }
    return {
      eventTypes,
      filteredType,
      towerEvents: computed(() => {
        if(filteredType.value){
          return AppState.towerEvents.filter(towerEvent => towerEvent.type == filteredType.value)
        }
        else{
          return AppState.towerEvents
        }
      }),
      filterType(eventType){
        filteredType.value = eventType
      }
    }
  }
}
</script>

<style scoped lang="scss">
.event-card{
  min-height: 30vh;
}
</style>
