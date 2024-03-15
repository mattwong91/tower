<template>
<div class="container-fluid">
  <!-- SECTION HEADER IMAGE AREA -->
  <section class="row">
    
  </section>
  <!-- !SECTION HEADER IMAGE AREA, LOGO -->

  <!-- SECTION FILTER BAR -->
  <section class="row p-3 mt-3">
    <div class="col-12">
      <section class="row justify-content-around">
        <ul class="nav nav-pills justify-content-center">
          <li class="nav-item p-1" >
            <button @click="filterType('')" class="nav-link" :class="{active : filteredType == ''}">ALL</button>
          </li>
          <li v-for="eventType in eventTypes" :key="eventType" class="nav-item p-1">
            <button @click="filterType(eventType)" class="nav-link" :class="{active : filteredType == eventType}">
              {{ eventType.toUpperCase() }}
            </button>
          </li>
        </ul>
      </section>
    </div>
  </section>
  <!-- !SECTION FILTER BAR -->

  <!-- SECTION EVENT CARDS -->
  <section class="row my-2">
    <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-6 col-md-3 col-xl-2 my-2">
      <EventCard :towerEvent="towerEvent" />
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
import EventCard from "../components/EventCard.vue";

export default {
    setup() {
        const eventTypes = ['concert', 'convention', 'sport', 'digital'];
        const filteredType = ref('');
        onMounted(() => {
          towerEventsService.clearData()
          getTowerEvents();
        });
        async function getTowerEvents() {
            try {
                await towerEventsService.getTowerEvents();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            eventTypes,
            filteredType,
            towerEvents: computed(() => {
                if (filteredType.value) {
                    return AppState.towerEvents.filter(towerEvent => towerEvent.type == filteredType.value);
                }
                else {
                    return AppState.towerEvents;
                }
            }),
            filterType(eventType) {
                filteredType.value = eventType;
            }
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">
// .event-card{
//   min-height: 30vh;
// }
img{
  height: 20vh;
}

.bg-main{
  background-color: #094567;
}

.nav-link{
  color:white;
  background-color: #094567;
}

.nav-link:hover{
  box-shadow: 0px 0px 7px rgb(40, 40, 40);
  transition: ease-in-out 0.25s;
}
</style>
