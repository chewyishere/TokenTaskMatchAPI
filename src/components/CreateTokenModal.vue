<template>
  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">Add Token</header>
        <section class="modal-card-body">
          <div v-for="token in tokens" class="field" :key="token._id">
            <div class="control">
              <input v-model="token.title">
            </div>
          </div>
          <button @click="add" class="button is-primary is-pulled-left">Add</button>
          <button @click="create" class="button is-primary is-pulled-right">Create</button>
        </section>
      </div>
      <button @click="toggle" class="modal-close is-large" aria-label="close"></button>
    </div>
    <button @click="toggle" class="button is-primary is-pulled-right">Create Token</button>
    <br>
  </div>
</template>

<script>
import { createToken } from "../repository";

export default {
  name: "CreateTokenModal",
  data() {
    return {
      tokens: [{ title: "" }],
      isActive: false
    };
  },
  methods: {
    add() {
      this.tokens.push({ title: "", value: 0 });
    },
    create() {
      this.tokens.forEach(el => {
        let data = { title: el.title, value: el.value };
        createToken(data)
          .then(data => {
            this.$emit("createToken", data.token);
          })
          .catch(err => {
            alert(err);
          });
      });
      this.toggle();
      this.tokens = [{ title: "" }];
    },
    toggle() {
      this.isActive = !this.isActive;
    }
  }
};
</script>