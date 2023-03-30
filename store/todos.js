export const state = () => ({
    todoList: [],
  })
  
  export const getters = {
    all(state) {
      return state.todoList
    },
    progress(state) {
      return state.todoList.filter(function (item) {
        return !item.isComplete
      })
    },
    done(state) {
      return state.todoList.filter(function (item) {
        return item.isComplete
      })
    },
  }
  
  export const mutations = {
    store(state, data) {
      state.todoList = data
    },
    add(state, name) {
      state.todoList.push(name)
    },
    edit(state, todo) {
      const index = state.todoList.findIndex(
        (todoItem) => todoItem.id === todo.id
      )
      state.todoList[index].name = todo.name
    },
    toggle(state, todo) {
      const index = state.todoList.findIndex(
        (todoItem) => todoItem.id === todo.id)
      state.todoList[index].isComplete = todo.isComplete
    },
    remove(state, todo) {
      const index = state.todoList.findIndex(
        (todoItem) => todoItem.id === todo.id
      )
      state.todoList.splice(index, 1)
  },    
  }
  
  export const actions = {
    getTodoList(vuexContext) {
      return this.$axios
        .$get('https://642409ddd6152a4d4804f198.mockapi.io/todo')
        .then((res) => {
          vuexContext.commit('store', res)
        });
    },
    addTodo(vuexContext, content) {
      return this.$axios
        .$post('https://642409ddd6152a4d4804f198.mockapi.io/todo', {
          content,
          isComplete: false,
        })
        .then(function (res) {
          vuexContext.commit('add', res)
        })
        .catch(function (err) {
          alert(err)
        })
      },
      editTodo(vuexContext, data) {
        return this.$axios
          .$put(
            `https://642409ddd6152a4d4804f198.mockapi.io/todo/${data.todo.id}`,
            {
              name: data.name,
            }
          )
          .then(function (res) {
            vuexContext.commit('edit', res)
          })
          .catch(function (err) {
            alert(err)
          })
    },
    toggleTodo(vuexContext, todo) {
      return this.$axios
        .$put(`https://642409ddd6152a4d4804f198.mockapi.io/todo/${todo.id}`, {
          isComplete: !todo.isComplete,
        })
        .then(function (res) {
          vuexContext.commit('toggle', res)
        })
        .catch(function (err) {
          alert(err)
        })
     },
     deleteTodo(vuexContext, todo) {
      return this.$axios
      .$delete(`https://642409ddd6152a4d4804f198.mockapi.io/todo/${todo.id}`)
      .then( function (res) {
        vuexContext.commit('remove', res)
      })
      .catch( function (err) { 
        alert(err)
      });
     },    
  }