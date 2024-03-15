<template>
<div v-if="account.id" class="container-fluid">

  <section class="row my-4 justify-content-center">
    <div class="col-12 d-flex flex-column justify-content-center align-items-center">
      <img :src="account.picture" :alt="account.name" class="profile-img rounded-circle">
      <p class="fw-semibold my-2">{{ account.name }}</p>
      <p>
        <span class="badge bg-info">{{ myTowerEvents.length }} Events</span>
        <span> | </span>
        <span class="badge bg-warning">{{ myTickets.length }} Tickets</span>
      </p>
    </div>
  </section>
  <!-- SECTION MY EVENTS TO ATTEND -->
  <section v-if="myTowerEvents" class="row my-2">
    <h2>My Events</h2>
    <div v-for="towerEvent in myTowerEvents" :key="towerEvent.id" class="col-6 col-md-3 col-xl-2 my-2">
      <EventCard :towerEvent="towerEvent" />
    </div>
  </section>
  <!-- !SECTION MY EVENTS TO ATTEND -->

  <!-- SECTION MY TICKETS -->
  <section v-if="myTickets" class="row my-2 p-2 justify-content-center">
    <h2>My Tickets</h2>
    <div v-for="ticket in myTickets" :key="ticket.id" class="col-12 col-md-10 col-xl-8 my-2">
      <TicketCard :ticket="ticket" />
    </div>
  </section>
  <!-- !SECTION MY TICKETS -->
</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop";
import {ticketsService} from "../services/TicketsService.js"
import TicketCard from "../components/TicketCard.vue";
import { towerEventsService } from "../services/TowerEventsService";
import EventCard from "../components/EventCard.vue";
import { AuthService } from "../services/AuthService";

export default {
    setup() {
        onMounted(() => {
          ticketsService.clearData()
          towerEventsService.clearData()
          getMyTickets();
          getMyEvents();
        });
        async function getMyTickets() {
            try {
              await ticketsService.getMyTickets();
            }
            catch (error) {
              Pop.error(error);
            }
        }
        async function getMyEvents(){
          try {
            const userId = AuthService.userInfo.id
            await towerEventsService.getMyEvents(userId);
          }
          catch (error) {
            Pop.error(error)
          }
        }
        return {
            account: computed(() => AppState.account),
            myTickets: computed(() => AppState.myTickets),
            myTowerEvents: computed(() => AppState.myTowerEvents)
        };
    },
    components: { TicketCard, EventCard }
}
</script>

<style scoped>
p{
  margin-bottom: 0;
}

.profile-img{
  aspect-ratio: 1/1;
  width: 10rem;
  height: 10rem;
}
</style>
