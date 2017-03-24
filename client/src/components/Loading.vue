<template>
  <div class="loading"></div>
</template>

<style>
.loading {
  height: 2.5em;
  width: 2.5em;
  border: 0.25em solid var(--tertiary-color);
  border-top-color: var(--primary-color);
  animation: spin 0.5s infinite;
  margin: 0 auto;
  border-radius: 50%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
