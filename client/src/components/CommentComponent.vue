<template>
<section class="row">
  <div class="col-2 px-2">
    <img class="img-fluid rounded-circle" :src="comment.creator.picture" alt="">
  </div>
  <div class="col-10 rounded p-2 bg-dark text-light mt-2 ">
      <p class="fw-bold">{{ comment.creator.name }}</p>
      <p>{{ comment.body }}</p>
  </div>
</section>
</template>


<script>
import { Comment } from "../models/Comment";
export default {
  props:{
    comment:{type:Comment, required:true}
  },
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>

</style>