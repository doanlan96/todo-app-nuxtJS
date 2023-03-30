<template>
  <div class="container">
    <h1>todos</h1>
    <div class="main-content">
      <input
        class="todo-input"
        placeholder="What needs to be done?"
        @keyup.enter="addTodo"
      />
      <ul>
        <li
          v-for="(todo, index) in filterTodos"
          :key="index"
          @click.self="toggleTodo(todo)"
        >
          <span
            :class="{ done: todo.isComplete, hide: isEdit === todo.id }"
            @click.self="toggleTodo(todo)"
            >
            {{ todo.name }}</span>
          <input
            v-if="isEdit === todo.id"
            v-model="name"
            class="input-edit"
            type="text"
            @keydown.enter.stop="editTodo(todo)"
          />
          <div>
            <span type="button" class="edit-text" @click.stop="clickEdit(todo)">Edit</span>
            <span type="button" class="delete-text" @click.stop="deleteTodo(todo)">Delete</span>
          </div>
        </li>
      </ul>
      <div class="filter">
        <span class="all-border" @click="clickAll">All({{ total }})</span>
        <span class="progress-border" @click="clickProgress">Progess({{ countProgress }})</span>
        <span class="done-border" @click="clickDone">Done({{ countDone }})</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            todoList: [],
            filter: 'all',
            isEdit: -1,
            name: '',
        }
    },
    computed: {
        filterTodos() {
            return this.$store.getters[`todos/${this.filter}`]
        },
        total() {
            return this.$store.state.todos.todoList.length
        },
        countProgress() {
            return this.$store.state.todos.todoList.filter(function (item) {
                return !item.isComplete
            }).length
        },
        countDone() {
            return this.total - this.countProgress
        },        
    },
    created() {
        this.$store.dispatch('todos/getTodoList')
    },    
    methods: {
        addTodo(e) {
            if (e.target.value.length) {
                this.$store.dispatch('todos/addTodo', e.target.value)
                e.target.value = ''
            }
        },
        clickEdit(todo) {
          this.isEdit = todo.id
          this.name = todo.name
        },
        editTodo(todo) {
          if (this.name.length) {
            this.$store.dispatch('todos/editTodo', { todo, name: this.name })
            this.isEdit = -1
            this.name = ''
          }
        },
        toggleTodo(todo) {
          this.$store.dispatch('todos/toggleTodo', todo)
        },
        deleteTodo(todo) {
          this.$store.dispatch('todos/deleteTodo', todo)
        }, 
        clickAll() {
            this.filter = 'all'
        },
        clickProgress() {
            this.filter = 'progress'
        },
        clickDone() {
            this.filter = 'done'
        },       
    },
 }
</script>

<style scoped>
.main-content {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
  background: #fff;
  width: 40%;
  margin-top: 50px;
  border: 1px solid #ffb5a7;
}
.hide {
  display: none;
}
.input-edit {
  font-size: 24px;
  color: #2c3e50;
  border: 1px solid rgba(0, 0, 0, 0.144);
  padding: none;
  outline: none;
}
.todo-input {
  padding: 16px 16px 16px 16px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgb(0 0 0 / 3%);
  font-size: 24px;
  line-height: 1.4em;
  width: 100%;
  outline: none;
  border-bottom: 1px solid #ffb5a7;
}
.done {
  text-decoration: line-through;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}
.edit-text,
.delete-text {
  font-size: 18px;
}
.edit-text:hover,
.delete-text:hover {
  text-decoration: underline;
}
.edit-text {
  color: cadetblue;
}
.delete-text {
  color: rgba(255, 0, 0, 0.363);
}
.filter {
  height: 30px;
  margin-top: 10px;
}
.filter span {
  font-weight: 500;
  border: 1px solid rgba(0, 0, 0, 0.301);
  border-radius: 3px;
  padding: 3px 5px;
  box-sizing: border-box;
  cursor: pointer;
  color: #2c3e50;
}
.filter .all-border {
  border-color: #006d77;
}
.filter .done-border {
  border-color: #d62828;
}
.filter .progress-border {
  border-color: #8ecae6;
}
ul {
  height: 400px;
  overflow-y: auto;
}
ul,
li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
ul > li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding: 10px 20px;
  cursor: pointer;
}
ul > li span {
  font-size: 24px;
  color: #2c3e50;
}
h1 {
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(218, 45, 74, 0.308);
}
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>