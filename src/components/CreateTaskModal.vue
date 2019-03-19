<template>
  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">Add Task</header>
        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              <input v-model="question" class="input" type="text" placeholder="question">
            </div>
          </div>
          <table>
            <thead></thead>
            <tbody>
              <tr v-for="token in allTokens" :key="token.title">
                {{ token.title}}
                <th>
                  <number-input inline center controls v-model="token.value"></number-input>
                </th>
              </tr>
            </tbody>
          </table>
          <br>
          <button @click="create" class="button is-primary is-pulled-right">Done</button>
        </section>
      </div>
      <button @click="toggle" class="modal-close is-large" aria-label="close"></button>
    </div>
    <button @click="toggle" class="button is-primary is-pulled-right">Create Task</button>
    <br>
  </div>
</template>

<script>
import { createTask } from "../repository";
/* eslint-disable */

export default {
  name: "CreateTaskModal",
  props: ["allTokens"],
  data() {
    return {
      question: "",
      isActive: false,
      tokenPairs: []
    };
  },
  methods: {
    create() {
      this.allTokens.forEach((el, i) => {
        this.tokenPairs[i] = { title: el.title, value: el.value };
      });

      let data = {
        question: this.question,
        tokenPairs: this.tokenPairs
      };

      createTask(data)
        .then(data => {
          this.$emit("createTask", data.task);
          this.toggle();
          this.question = "";
          this.allTokens.forEach(el => {
            el.value = 0;
          });
        })
        .catch(err => {
          alert(err);
        });
    },

    toggle() {
      this.isActive = !this.isActive;
    }
  }
};
</script>

<style scoped>
#token-score {
  margin-left: 5px;
  margin-right: 5px;
  width: 40px;
}
</style>
