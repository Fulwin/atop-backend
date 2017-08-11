<template>
  <div class="media-manager-trigger">
    <button slot="append" icon="search" @click.prevent="toggleMediaManager()">
      {{ buttonTitle }}
    </button>
  </div>
</template>

<script src="./MediaManagerTrigger.js">
</script>
