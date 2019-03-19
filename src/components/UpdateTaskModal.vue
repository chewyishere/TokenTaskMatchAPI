<template>
  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">Update Task</header>
        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              <input v-model="task.question" class="input" type="text" placeholder="question">
            </div>
          </div>
          <table>
            <thead></thead>
            <tbody>
              <tr v-for="token in task.tokenPairs" :key="token.title">
                {{ token.title }}
                <th>
                  <number-input inline center controls v-model="token.value"></number-input>
                </th>
              </tr>
            </tbody>
          </table>
          <br>
          <button @click="update" class="button is-primary is-pulled-right">Done</button>
        </section>
      </div>
      <button @click="toggle" class="modal-close is-large" aria-label="close"></button>
    </div>
    <button @click="toggle" class="button is-primary is-pulled-right">edit</button>
    <br>
  </div>
</template>

<script>
import { updateTask } from "../repository";
export default {
  name: "UpdateTaskModal",
  props: ["task", "allTokens"],
  data() {
    return {
      isActive: false
    };
  },
  watch: {
    allTokens: function(v) {
      this.update(v);
    }
  },
  methods: {
    update(update) {
      let data = {
        question: this.task.question,
        tokenPairs: this.task.tokenPairs
      };
      updateTask(data, this.task._id)
        .then(data => {
          this.$emit("updateTask", data.task);
          if (update.length === undefined) this.toggle();
        })
        .catch(err => alert(err.message));
    },
    toggle() {
      this.isActive = !this.isActive;
    }
  }
};
</script>