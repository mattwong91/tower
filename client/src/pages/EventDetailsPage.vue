<template>
<div class="container-fluid">
  <!-- SECTION EVENT DETAIL CARD -->
  <section class="row p-3 p-md-5">
    <div v-if="activeEvent" class="col-12 rounded shadow border border-dark p-3">
      <img class="img-fluid" :src="activeEvent.coverImg" :alt="activeEvent.name">
      <h4>{{ activeEvent.name }}</h4>
      <p>{{ activeEvent.location }}</p>
      <p>{{ activeEvent.startDate.toLocaleString() }}</p>
      <p>{{ activeEvent.description }}</p>
      <p>{{ activeEvent.capacity - activeEvent.ticketCount }} Spots available</p>
    </div>
    <div v-else class="col-12 text-center p-5">
      <div class="spinner-border" role="status"></div>
    </div>
  </section>

  <!-- !SECTION EVENT DETAIL CARD -->

  <!-- SECTION USERS THAT ARE ATTENDING -->
  <section class="row p-3 p-md-5">
    <div class="col-12 bg-dark rounded d-flex">
      <div v-for="ticket in tickets" :key="ticket.id" class="p-2">
        <img class="img-fluid rounded-circle" :src="ticket.profile.picture"  :title="ticket.profile.name" alt="Profile Picture">
      </div>
    </div>
  </section>
  <!-- !SECTION USERS THAT ARE ATTENDING -->

  <!-- SECTION COMMENTS AREA -->
  <section class="row p-3 p-md-5 justify-content-center">
    <div class="col-12 col-md-10 p-4 rounded shadow border border-dark">
      <!-- SECTION POST FORM -->
      <section class="row">
        <div class="col-12">
          <form>
            <textarea name="commentBody" id="commentBody" class="form-control pb-5 mb-2" placeholder="Post a comment..."></textarea>
            <div class="text-end">
              <button class="btn btn-dark">Post Comment</button>
            </div>
          </form>
        </div>
      </section>
      <!-- !SECTION POST FORM -->

        <!-- SECTION ALL COMMENTS -->
        <section class="row">
          <div v-for="comment in comments" :key="comment.id" class="col-12">
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
      activeEvent: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      comments: computed(() =>  AppState.comments)
    }
  },
  components:{ CommentComponent }
};
</script>


<style lang="scss" scoped>
p{
  margin-bottom: 0;
}
</style>