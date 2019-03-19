<template>
  <article class="message">
    <div class="message-header">
      <p>{{ task.question }}</p>
      <button @click="deleteTask" class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      <table class="table is-striped">
        <thead>
          <tr>
            <th v-for="token in task.tokenPairs" :key="token.title">{{ token.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th v-for="token in task.tokenPairs" :key="token.title">{{token.value}}</th>
          </tr>
        </tbody>
      </table>
      <UpdateTaskModal :task="task" :allTokens="allTokens" :key="task._id"/>
      <br>
    </div>
  </article>
</template>

<script>
import { deleteTask } from "../repository";
import UpdateTaskModal from "./UpdateTaskModal";

export default {
  name: "TaskItem",
  props: ["task", "allTokens"],
  components: { UpdateTaskModal },
  methods: {
    deleteTask(e) {
      e.preventDefault();
      deleteTask(this.task._id)
        .then(() => this.$emit("deleteTask", this.task._id))
        .catch(err => alert(err));
    }
  }
};
</script>