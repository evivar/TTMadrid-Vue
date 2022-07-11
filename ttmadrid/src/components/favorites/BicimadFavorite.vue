<template>
  <v-card color="#354553" class="white--text">
    <v-card-text class="white--text">
      {{ station.stationId }} - {{ station.stationName }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "BicimadFavorite",
  props: {
    station: {
      type: Object,
    },
  },
};
</script>

<style>
</style>