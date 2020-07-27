<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
    Dashboard
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted () {
    console.log('in dashboard: ', this.$currentUser())
  }
}
</script>
