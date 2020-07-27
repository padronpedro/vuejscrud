<template>
  <v-tooltip bottom color="orange">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" @click="btnFunction(toPath)">
        <v-icon class="mr-2">{{iconName}}</v-icon>
          {{ hideText ? '' : iconText }}
        </v-btn>
    </template>
    <span>{{ iconText }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String
    },
    iconText: {
      type: String
    },
    toPath: {
      type: String
    },
    hideText: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    btnFunction (path) {
      this.$goRouter(path)
    }
  }
}
</script>
