<template>
<section class="row">
  <div class="col-2 px-2">
    <img class="img-fluid rounded-circle" :src="comment.creator.picture" alt="">
  </div>
  <div class="col-10 rounded p-2 bg-dark text-light mt-2 ">
    <div class="d-flex justify-content-between">
      <p class="fw-bold">{{ comment.creator.name }}</p>
      <button @click="deleteComment(comment.id)" v-if="account.id == comment.creatorId" class="btn btn-danger mdi mdi-trash-can"></button>
    </div>
      <p>{{ comment.body }}</p>
  </div>
</section>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { Comment } from "../models/Comment";
import Pop from "../utils/Pop";
import { commentsService } from "../services/CommentsService";

export default {
  props:{
    comment:{type:Comment, required:true}
  },
  setup(){
  return {
    account: computed(() => AppState.account),
    async deleteComment(commentId){
      try {
        const confirmDelete = await Pop.confirm('Are you sure you want to delete this comment?')
        if(!confirmDelete){
          return
        }
        await commentsService.deleteComment(commentId)
        Pop.toast('Comment deleted', 'info', 'top', 1500, false)
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