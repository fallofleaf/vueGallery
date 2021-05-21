<template>
  <div>
sssgdgdg
  </div>
</template>

<script>
import axios from "axios";

let requestURL = "https://pixabay.com/api/?key=21039693-40d98fce614790ce1b9fefb04&q=" + encodeURI('flower') + "&per_page=" + '25' + "&pretty=true"



export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    // this.get()
  }
  ,
  data() {
    return {}
  },
  methods: {
    get() {
      axios.get(requestURL).then((response) => {
        console.log(response.data)
      })
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
