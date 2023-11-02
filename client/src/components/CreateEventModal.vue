<template>
<!-- Modal -->
<div class="modal fade" id="createEventModal" tabindex="-1" aria-labelledby="createEventModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="createEventModalLabel">Create an event</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="createEvent()">
          <div class="mb-2">
            <label class="form-label" for="name">Event Name</label>
            <input v-model="form.name" class="form-control" type="text" id="name">
          </div>
          <div class="mb-2">
            <label class="form-label" for="description">Description</label>
            <textarea v-model="form.description" class="form-control" type="text" id="description"></textarea>
          </div>
          <div class="mb-2">
            <label class="form-label" for="coverImg">coverImg</label>
            <input v-model="form.coverImg" class="form-control" type="url" id="coverImg">
          </div>
          <div class="mb-2">
            <label class="form-label" for="location">location</label>
            <input v-model="form.location" class="form-control" type="text" id="location">
          </div>
          <div class="mb-2">
            <label class="form-label" for="capacity">capacity</label>
            <input v-model="form.capacity" class="form-control" type="number" id="capacity">
          </div>
          <div class="mb-2">
            <label class="form-label" for="startDate">startDate</label>
            <input v-model="form.startDate" class="form-control" type="date" id="startDate">
          </div>
          <div class="mb-2">
            <label class="form-label" for="type">type</label>
            <select v-model="form.eventType" name="type" id="type" class="form-select">
              <option :value="eventType" v-for="eventType in eventTypes" :key="eventType">
                {{ eventType }}
              </option>
            </select>
          </div>
          <div class="text-end mt-3">
            <button type="submit" class="btn btn-primary">Create event</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import { ref } from 'vue';
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";

export default {
  setup(){
    const form = ref({})
    const eventTypes = ['concert', 'convention', 'sport', 'digital']
    const router = useRouter()
    return {
      eventTypes,
      form,
      async createEvent(){
        try {
          const eventData = form.value
          const towerEvent = await towerEventsService.createEvent(eventData)
          Pop.toast('Event Created!', 'success', 'top', 1500, false)
          Modal.getOrCreateInstance('#createEventModal').hide()
          router.push({name: 'EventDetails', params: {eventId: towerEvent.id} })
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