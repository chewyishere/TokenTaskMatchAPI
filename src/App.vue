<template>
  <div id="app">
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="#">
            <span class="title is-size-1">TaskToken Admin</span>
          </a>
        </div>
      </div>
    </nav>
    <br>
    <br>
    <div class="container">
      <div v-if="tokens">
        <CreateTokenModal @createToken="createToken"/>
        <br>
        <div class="tags">
          <tokenItem
            v-for="(token, index) in tokens"
            :token="token"
            :key="index"
            @deleteToken="deleteToken"
          />
        </div>
      </div>
      <div v-if="tasks">
        <CreateTaskModal @createTask="createTask" :allTokens="tokens"/>
        <br>
        <div>
          <taskItem
            v-for="(task, index) in tasks"
            :task="task"
            :allTokens="tokens"
            :key="index"
            @deleteTask="deleteTask"
            @updateTask="updateTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from "./components/TaskItem.vue";
import TokenItem from "./components/TokenItem.vue";
import CreateTaskModal from "./components/CreateTaskModal.vue";
import CreateTokenModal from "./components/CreateTokenModal.vue";
import { getTasks } from "./repository";
import { getTokens } from "./repository";

export default {
  name: "app",
  components: {
    TaskItem,
    TokenItem,
    CreateTaskModal,
    CreateTokenModal
  },
  data() {
    return {
      tasks: [],
      tokens: []
    };
  },
  methods: {
    deleteTask(id) {
      let tasks = this.tasks.filter(task => task._id != id);
      this.tasks = tasks;
    },
    updateTask(task) {
      this.deleteTask(task._id);
      this.createTask(task);
    },
    createTask(task) {
      this.tasks = [task, ...this.tasks];
    },
    createToken(token) {
      this.tokens = [token, ...this.tokens];
      this.addTaskToken(token);
    },
    deleteToken(token) {
      let id = token._id;
      let tokens = this.tokens.filter(token => token._id != id);
      this.tokens = tokens;
      this.removeTaskToken(token.title);
    },
    addTaskToken(token) {
      this.tasks.forEach(el => {
        el.tokenPairs.push(token);
      });
    },
    removeTaskToken(title) {
      this.tasks.forEach(el => {
        let removeIdx = el.tokenPairs
          .map(item => {
            return item.title;
          })
          .indexOf(title);
        el.tokenPairs.splice(removeIdx, 1);
      });
    }
  },
  mounted() {
    getTasks()
      .then(data => (this.tasks = data.tasks))
      .catch(err => alert(err));

    getTokens()
      .then(data => (this.tokens = data.tokens))
      .catch(err => alert(err));
  }
};
</script>
