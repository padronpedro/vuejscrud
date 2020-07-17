<template>
  <v-snackbar
    v-model="thisSnackbar"
    bottom
    :color="color ? color : 'error'"
    multi-line
    :timeout="timeout"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="thisSnackbar = false"
      >
        {{ $t('Close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      thisSnackbar: false
    }
  },
  watch: {
    snackbar: function (val) {
      this.thisSnackbar = val
    }
  },
  props: {
    snackbar: {
      type: Boolean,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    text: {
      type: String,
      default: '',
      required: false
    },
    timeout: {
      type: Number,
      required: false
    }
  }
}
</script>
