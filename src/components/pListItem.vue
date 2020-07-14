<template>
  <v-list-item link @click="goToPath(toPath)">
    <v-list-item-action>
      <v-icon>{{iconName}}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{textTitle}}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    toPath: {
      type: String,
      required: true
    },
    iconName: {
      type: String,
      required: true
    },
    textTitle: {
      type: String,
      required: true
    }
  },
  methods: {
    goToPath: function (auxToPath) {
      this.$router.push({ name: auxToPath }).catch(err => { err = null })
      this.$eventHub.$emit('toggleDrawer')
    }
  }
}
</script>
