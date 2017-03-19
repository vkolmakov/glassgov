<template>
  <div>
    <img alt="photo" src=""/>
    <h1>{{ employee.name }}</h1>
    <h2>{{ employee.title }}</h2>
    <h2>{{ employee.rating }}</h2>
  </div>
</template>

<script>
export default {
  props: ['employee'],
}
</script>
