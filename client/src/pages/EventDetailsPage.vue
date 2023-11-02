<!-- TODO DETERMINE IF I AM ATTENDING THE EVENT -->
<template>
<div class="container-fluid">
  <!-- SECTION EVENT DETAIL CARD -->
  <section class="row p-3 p-md-5 justify-content-center">
    <div v-if="activeEvent" class="col-12 col-md-10 rounded shadow border border-dark p-3">
      <section class="row">
        <img class="img-fluid" :src="activeEvent.coverImg" :alt="activeEvent.name">
        <div class="d-flex justify-content-between">
          <div v-if="activeEvent.isCanceled" class="my-3">
            <s>{{ activeEvent.name }}</s>
            <p class="text-danger">This event has been cancelled</p>
          </div>
          <div v-else>
            <h4 class="my-3">{{ activeEvent.name }}</h4>
          </div>
          <div v-if="tickets.find(ticket => ticket.accountId == account.id)">
            <p class="text-primary my-3">You are attending this event</p>
          </div>
        </div>
        <div class="my-3">
          <p>{{ activeEvent.location }}</p>
          <p>{{ activeEvent.startDate.toLocaleString() }}</p>
        </div>
        <p>{{ activeEvent.description }}</p>
        <div class="text-end my-2">
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
  <section v-if="tickets" class="row px-3 px-md-5 justify-content-center">
    <div class="col-12 col-md-10 bg-dark rounded d-flex">
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
    <div class="col-12 col-md-10 p-4 rounded shadow border border-dark">
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
    const eventId = route.params.eventId
    onMounted(() => {
      towerEventsService.clearData()
      getTowerEventById()
      getTicketsByEventId()
      getCommentsByEventId()
    })
    async function getTowerEventById(){
      try {
        await towerEventsService.getTowerEventById(eventId)
      } 
      catch (error) {
        Pop.error(error)
      }
    }
    async function getTicketsByEventId(){
      try {
        await ticketsService.getTicketsByEventId(eventId)
      } 
      catch (error) {
        Pop.error(error)
      }
    }
    async function getCommentsByEventId(){
      try {
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
          await ticketsService.createTicket(eventId)
          await towerEventsService.getTowerEventById(eventId)
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
</style>