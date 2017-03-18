<template>
  <div class="container">
    <h1>Home</h1>
    <div class="description">
      <h2>Learn about Chicago with GlassGov</h2>
      <p>Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse! Dictum sit amet justo donec enim diam, vulputate ut pharetra sit amet, aliquam id diam maecenas ultricies mi? Mattis enim ut tellus elementum sagittis vitae et leo duis ut diam?</p>
      <p>Nunc vel risus commodo viverra maecenas accumsan, lacus vel facilisis. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan, lacus vel facilisis volutpat, est velit egestas.</p>
    </div>

    <div class="featured">
      <h2>Featured Officials</h2>
      <featured />
    </div>
  </div>
</template>

<script>
import Featured from './Featured.vue'

export default {
  components: {
    Featured,
  }
}
</script>

<style>
</style>
