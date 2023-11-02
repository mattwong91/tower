<template>
<div v-if="account" class="container-fluid">
  <!-- SECTION MY EVENTS TO ATTEND -->
  <section v-if="towerEvents" class="row p-5">
    <h2>My Events</h2>
    <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-6 col-md-3 my-2">
      <EventCard :towerEvent="towerEvent" />
    </div>
  </section>
  <!-- !SECTION MY EVENTS TO ATTEND -->

  <!-- SECTION MY TICKETS -->
  <section v-if="tickets" class="row p-5">
    <h2>My Tickets</h2>
    <div v-for="ticket in tickets" :key="ticket.id" class="col-12 my-2">
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

export default {
    setup() {
        onMounted(() => {
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
            await towerEventsService.getMyEvents();
          }
          catch (error) {
            Pop.error(error)
          }
        }
        return {
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            towerEvents: computed(() => AppState.towerEvents)
        };
    },
    components: { TicketCard, EventCard }
}
</script>

<style scoped>
p{
  margin-bottom: 0;
}
</style>
