<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <span>{{ name }}</span>
    <button @click="handleClick" >change name</button>
    <!-- <input @input="handleInput" /> -->
    <div v-for="(item, index) in list" :key="item.id" @click="handleSelectItem(index)" >
      <span>{{ item.name }}</span>
      <span>{{ item.age }}</span>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      name: "ppz",
      age: 18,
      list: [
        {
          id: 1,
          name: 'aa',
          age: 18
        },
        {
          id: 2,
          name: 'bb',
          age: 37
        }
      ]
    }
  },
  methods: {
    handleClick() {
      this.name = "xue ao"
    },
    handleSelectItem(index) {
      // let const
      const person = this.list[index]
      alert(`Your select item name is ${person.name}`)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
