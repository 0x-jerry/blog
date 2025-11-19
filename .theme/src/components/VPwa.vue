<script setup lang="ts">
navigator.serviceWorker.getRegistrations().then((registrations) => {
  for (const registration of registrations) {
    registration.unregister()
  }
})
</script>

<template></template>
