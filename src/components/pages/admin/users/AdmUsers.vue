<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row>
      <v-col cols="12">
        <v-toolbar dense flat>
          <p-bread-crumbs :items="itemsBc"></p-bread-crumbs>
            <v-spacer />
            <p-icon :iconName="'mdi-account-plus'" :iconText="$t('Add user')" :toPath="'Login'" />
        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="items"
          :options.sync="options"
          :server-items-length="totalItems"
          :loading="loading"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
    <p-snack-bar
      :text="snack.text"
      :color="snack.color"
      :snackbar="snack.snackbar" />
    <p-dialog-yes-no ref="confirm" />
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      options: {},
      totalItems: 0,
      loading: false,
      itemsBc: [
        {
          text: this.$t('Dashboard'),
          disabled: false,
          to: 'Dashboard'
        },
        {
          text: this.$t('Users'),
          disabled: true,
          to: 'AdmUsers'
        }
      ],
      snack: {
        text: '',
        color: '',
        snackbar: false
      }
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    },
    headers: function () {
      return [
        { text: this.$t('Name'), align: 'left', value: 'name' },
        { text: this.$t('Email'), value: 'email' },
        { text: this.$t('Status'), align: 'center', value: 'is_active', width: '10%' },
        { text: this.$t('Actions'), align: 'center', sortable: false, value: 'actions', width: '14%' }
      ]
    }
  },
  watch: {
    options: {
      handler () {
        this.getDataForTable()
      },
      deep: true
    },
    search () {
      this.getDataForTable()
    }
  },
  methods: {
    getDataForTable () {
      console.log('search')
    }
  }
}
</script>
