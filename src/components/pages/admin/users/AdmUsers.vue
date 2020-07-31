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
            <p-icon :iconName="'mdi-account-plus'" :iconText="$t('Add user')" :toPath="'AddUsers'" v-if="$userCan('ADDUSERS')" :testId="'AdminBtnAddUser'" />
        </v-toolbar>

        <v-data-table
          test-id="AdmUsersDatatable"
          :headers="headers"
          :items="items"
          :options.sync="options"
          :server-items-length="totalItems"
          :loading="loading"
          class="elevation-1"
        >
          <template v-slot:item.role_name="{ item }">
            {{ getRoleName(item) }}
          </template>
          <template v-slot:item.is_active="{ item }">
              <v-chip :color="item.is_active=='1' ? 'green' : 'red'" dark :test-id="item.email">{{ item.is_active=='1' ? $t('Active') : $t('Disabled') }}</v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom :color="'orange'">
                <template v-slot:activator="{ on }">
                    <v-icon
                        v-if="$userCan('EDITUSERS')"
                        v-on="on"
                        class="mr-2"
                        :test-id="'AdmUserBtnEdit-'+item.email"
                        @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                </template>
                <span>{{ $t('Edit user') }}</span>
            </v-tooltip>
            <v-tooltip bottom :color="'orange'">
                <template v-slot:activator="{ on }">
                    <v-icon
                        v-if="$userCan('EDITUSERS')"
                        v-on="on"
                        class="mr-2"
                        :test-id="'AdmUserBtnChgStatus-'+item.email"
                        @click="statusItem(item)">
                        mdi-sync
                    </v-icon>
                </template>
                <span>{{ $t('Change status') }}</span>
            </v-tooltip>
            <v-tooltip bottom :color="'orange'">
                <template v-slot:activator="{ on }">
                    <v-icon
                        v-if="$userCan('DELETEUSERS')"
                        v-on="on"
                        :test-id="'AdmUserBtnDelete-'+item.email"
                        @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
                <span>{{ $t('Delete user') }}</span>
            </v-tooltip>
        </template>
        </v-data-table>
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
    headers: function () {
      return [
        { text: this.$t('Name'), align: 'left', value: 'name' },
        { text: this.$t('Email'), value: 'email' },
        { text: this.$t('Role'), value: 'role_name', sortable: false },
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
      let dataOptions = {
        offset: this.options.page,
        limit: this.options.itemsPerPage,
        sortBy: this.options.sortBy[0] || 'name',
        sortDesc: this.options.sortDesc[0] ? 'desc' : 'asc'
      }
      this.$axios.get('user/datatable', { params: dataOptions })
        .then(response => {
          if (response.data.status) {
            this.items = response.data.data.rows
            this.totalItems = response.data.data.count
          } else {
            this.$showError(response.data.message, '', 0, this.snack)
          }
        })
        .catch(error => {
          this.$showError(this.$t('Error getting users data') + ': ' + error, '', 0, this.snack)
        })
    },
    getRoleName (item) {
      return item.Roles ? item.Roles[0].name.toUpperCase() : ''
    },
    editItem (item) {
      this.$goRouter('', null, '/admin/users/edit/' + item.id)
    },
    statusItem (item) {
      let dataOptions = {
        id: item.id
      }
      this.$axios.post('user/changestatus', { params: dataOptions })
        .then(response => {
          if (response.data.status) {
            this.getDataForTable()
          } else {
            this.$showError(response.data.message, '', 0, this.snack)
          }
        })
        .catch(error => {
          this.$showError(this.$t('Error changing users status') + ': ' + error, '', 0, this.snack)
        })
    },
    deleteItem (item) {
      this.$refs.confirm.open(
        this.$t('Delete a user'),
        this.$t('Do you want to delete the user: ' + item.name + ' ?'), { color: 'red', width: '500' }
      )
        .then((confirm) => {
          if (confirm) {
            this.$showError(this.$t('Deleting user. wait a moment please'), 'success', 3, this.snack)
            this.$axios.delete('user/' + item.id)
              .then(response => {
                if (response.data.status) {
                  this.$showError(this.$t('User successfully removed'), 'success', 3, this.snack)
                  this.getDataForTable()
                } else {
                  this.$showError(response.data.message, '', 0, this.snack)
                }
              })
              .catch(error => {
                this.$showError(this.$t('Error changing users status') + ': ' + error, '', 0, this.snack)
              })
          }
        })
    }
  }
}
</script>
