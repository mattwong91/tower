<template>
<section class="row">
  <div class="col-12">
    <form @submit.prevent="createComment()">
      <textarea v-model="form.body" name="commentBody" id="commentBody" class="form-control pb-5 mb-2" placeholder="Post a comment..."></textarea>
      <div class="text-end">
        <button class="btn btn-dark">Post Comment</button>
      </div>
    </form>
  </div>
</section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop";
import { commentsService } from "../services/CommentsService";

export default {
  setup(){
    const form = ref({})
  return {
    form,
    activeEvent: computed(() => AppState.activeEvent),
    async createComment(){
      try {
        const commentData = form.value
        commentData.eventId = this.activeEvent.id
        await commentsService.createComment(commentData)
        form.value = {}
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