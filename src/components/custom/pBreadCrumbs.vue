<template>
    <v-breadcrumbs :items="items">
        <template v-slot:item="props">
            <v-breadcrumbs-item
                :test-id="'bc-id-' + props.item.text"
                @click="redirectTo(props.item)"
                :class="[props.item.disabled ? 'disabled' : '',props.item.disabled ? '' : 'with-cursor']"
            >
            {{ props.item.text }}
            </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>

</template>

<style scoped>
    .disabled {
        color: grey;
        font-size: 1.20rem;
    }
    .with-cursor {
        cursor: pointer;
        font-size: 1.20rem;
    }
</style>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    redirectTo (item) {
      if (item.params) {
        this.$router.push({name: item.to, params: item.params}).catch(err => { err = null })
      } else {
        this.$goRouter(item.to)
      }
    }
  }
}
</script>
