<template>
<section class="row rounded shadow border border-dark">
  <div class="col-4 p-0">
    <img class="img-fluid rounded-start h-100" :src="ticket.event.coverImg" :alt="ticket.event.name">
  </div>
  <div class="col-8 p-4">
    <h5 class="mb-4">{{ ticket.event.name }}</h5>
    <p>{{ ticket.event.location }}</p>
    <p class="mb-5">{{ ticket.event.startDate }}</p>
    <div class="text-end">
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

</style>