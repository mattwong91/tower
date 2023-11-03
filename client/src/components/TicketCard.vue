<template>
<section v-if="ticket" class="row rounded shadow border border-dark">
  <div class="col-12 col-md-4 p-0">
    <router-link :to="{name: 'EventDetails', params: {eventId: ticket.eventId}}">
      <img class="img-fluid rounded-start h-100" :src="ticket.event.coverImg" :alt="ticket.event.name">
    </router-link>
  </div>
  <div class="col-12 col-md-8 p-2 p-md-4">
    <h5 class="my-2">{{ ticket.event.name }}</h5>
    <p>{{ ticket.event.location }}</p>
    <p>{{ ticket.event.startDate.substring(0,10) }}</p>
    <div class="text-end mt-3 mt-md-5">
      <button @click="deleteTicket(ticket.id)" class="btn btn-danger">Unattend</button>
    </div>
  </div>
</section>
</template>


<script>
import { Ticket } from "../models/Ticket";
import Pop from "../utils/Pop";
import { ticketsService } from "../services/TicketsService";

export default {
  props:{
    ticket: {type: Ticket, required:true}
  },
  setup(){
  return {
    async deleteTicket(ticketId){
      try {
        const confirmDelete = await Pop.confirm('Are you sure you no longer want to attend this event?')
        if(!confirmDelete){
          return
        }
        await ticketsService.deleteTicket(ticketId)
        Pop.toast('Ticket has been deleted', 'info', 'top', 1500, false)
      } 
      catch (error) {
        Pop.error(error)
      }
    }
  }
  }
};
</script>


<style lang="scss" scoped>
p{
  margin-bottom: 0;
}
</style>