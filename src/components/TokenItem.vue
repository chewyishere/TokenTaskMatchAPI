<template>
  <span class="tag is-light is-large">
    {{token.title}}
    <button @click="deleteToken" class="delete" aria-label="delete"></button>
  </span>
</template>

<script>
import { deleteToken } from "../repository";

export default {
  name: "TokenItem",
  props: ["token"],
  methods: {
    deleteToken(e) {
      e.preventDefault();
      deleteToken(this.token._id)
        .then(() => this.$emit("deleteToken", this.token))
        .catch(err => alert(err));
    }
  }
};
</script>