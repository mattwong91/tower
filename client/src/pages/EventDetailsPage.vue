<!-- TODO DETERMINE IF I AM ATTENDING THE EVENT -->
<template>
<div class="container-fluid">
  <!-- SECTION EVENT DETAIL CARD -->
  <section class="row p-3 p-md-5 justify-content-center">
    <div v-if="activeEvent" class="col-12 col-md-10 col-xl-6 rounded shadow border border-dark">
      <section class="row active-event">
        <div class="col-12 m-0 p-0">
          <img class="img-fluid" :src="activeEvent.coverImg" :alt="activeEvent.name">
        </div>
        <div class="col-12 d-flex justify-content-between">
          <div v-if="activeEvent.isCanceled" class="my-3">
            <s>{{ activeEvent.name }}</s>
            <p class="text-danger">This event has been cancelled</p>
          </div>
          <div v-else>
            <h4 class="my-3">{{ activeEvent.name }}</h4>
            <button v-if="activeEvent.creatorId == account.id" @click="deleteEvent()" class="btn btn-danger">Cancel Event</button>
          </div>
          <div v-if="tickets.find(ticket => ticket.accountId == account.id)">
            <p class="text-primary my-3">You are attending this event</p>
          </div>
        </div>
        <div class="col-12 my-3">
          <p>{{ activeEvent.location }}</p>
          <p>{{ activeEvent.startDate.toLocaleString() }}</p>
        </div>
        <div class="col-12">
          <p>{{ activeEvent.description }}</p>
        </div>
        <div class="col-12 text-end my-2">
          <p v-if="activeEvent.isCanceled">0 spots available</p>
          <p v-else>{{ activeEvent.availability }} spots available</p>
          <button v-if="activeEvent.availability == 0" disabled class="btn btn-danger">Sold Out</button>
          <button v-else-if="activeEvent.isCanceled" disabled class="btn btn-warning">Event Cancelled</button>
          <button v-else @click="createTicket()" class="btn btn-success">Attend</button>
        </div>
      </section>
    </div>
    <div v-else class="col-12 text-center p-5">
      <div class="spinner-border" role="status"></div>
    </div>
  </section>

  <!-- !SECTION EVENT DETAIL CARD -->

  <!-- SECTION USERS THAT ARE ATTENDING -->
  <section v-if="tickets.length != 0" class="row px-3 px-md-5 justify-content-center">
    <div class="col-12 col-md-10 col-xl-6 bg-dark rounded d-flex">
      <section class="row">
        <div v-for="ticket in tickets" :key="ticket.id" class="col-auto p-2">
          <img class="img-fluid rounded-circle attendee-img" :src="ticket.profile.picture"  :title="ticket.profile.name" alt="Profile Picture">
        </div>
      </section>
    </div>
  </section>
  <!-- !SECTION USERS THAT ARE ATTENDING -->

  <!-- SECTION COMMENTS AREA -->
  <section class="row p-3 p-md-5 justify-content-center">
    <div class="col-12 col-md-10 col-xl-6 p-4 rounded shadow border border-dark">
      <!-- SECTION POST FORM -->
      <PostComment/>
      <!-- !SECTION POST FORM -->

        <!-- SECTION ALL COMMENTS -->
        <section class="row">
          <div v-for="comment in comments" :key="comment.id" class="col-12 my-2">
            <CommentComponent :comment="comment" />
          </div>
        </section>
        <!-- !SECTION ALL COMMENTS -->

    </div>
  </section>
  <!-- SECTION COMMENTS AREA -->
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import {commentsService} from "../services/CommentsService.js"
import CommentComponent from "../components/CommentComponent.vue";
import PostComment from "../components/PostComment.vue"

export default {
  setup(){
    const route = useRoute()
    onMounted(() => {
      towerEventsService.clearData()
      ticketsService.clearData()
      commentsService.clearData()
      getTowerEventById()
      getTicketsByEventId()
      getCommentsByEventId()
    })
    async function getTowerEventById(){
      try {
        const eventId = route.params.eventId
        await towerEventsService.getTowerEventById(eventId)
      } 
      catch (error) {
        Pop.error(error)
      }
    }
    async function getTicketsByEventId(){
      try {
        const eventId = route.params.eventId
        await ticketsService.getTicketsByEventId(eventId)
      } 
      catch (error) {
        Pop.error(error)
      }
    }
    async function getCommentsByEventId(){
      try {
        const eventId = route.params.eventId
        await commentsService.getCommentsByEventId(eventId)
      } 
      catch (error) {
        Pop.error(error)
      }
    }
    return {
      account: computed(() => AppState.account),
      activeEvent: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      comments: computed(() =>  AppState.comments),
      async createTicket(){
        try {
          const eventId = route.params.eventId
          await ticketsService.createTicket(eventId)
          await towerEventsService.getTowerEventById(eventId)
        } 
        catch (error) {
          Pop.error(error)
        }
      },
      async deleteEvent(){
        try {
          const confirmDelete = await Pop.confirm('Are you sure you want to cancel this event?')
          if(!confirmDelete){
            return
          }
          const eventId = route.params.eventId
          await towerEventsService.deleteEvent(eventId)
          await towerEventsService.getTowerEventById(eventId)
          Pop.toast('Event Cancelled', 'info', 'top', 1500, false)
        }
        catch (error) {
          Pop.error(error)
        }
      }
    }
  },
  components:{ CommentComponent, PostComment }
};
</script>


<style lang="scss" scoped>
p{
  margin-bottom: 0;
}
.attendee-img{
  height: 4vh;
  width: 4vh;
}

@media(min-width: 768px){
  .active-event{
    >img{
      height: 50vh;
      object-fit: cover;
      margin: 0;
      padding: 0;
    }
  }
}
</style>