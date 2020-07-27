<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row>
      <v-col cols="12">

        <v-card
          :elevation="4">

          <v-toolbar dense flat>
            <p-bread-crumbs :items="itemsBc"></p-bread-crumbs>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form"  lazy-validation>
              <p-divider :txtDivider="$t('Account information')"></p-divider>
              <v-row>
                  <p-column>
                      <v-text-field
                          v-model="email"
                          :label="$t('Email')"
                          required
                          :rules="[v => !!v || $t('This field is required'),v => /.+@.+\..+/.test(v) || $t('E-mail must be valid')]"
                          name="email"></v-text-field>
                  </p-column>
                  <p-column>
                      <v-text-field
                          v-model="password"
                          :label="$t('Password')"
                          type="password"
                          name="password"
                          :rules="[v => !!v || $t('This field is required'), v => v.length >= 8 || $t('Min 8 characters')]"
                          required></v-text-field>
                  </p-column>
                  <p-column>
                      <v-text-field
                          v-model="name"
                          :label="$t('Name')"
                          required
                          :rules="[v => !!v || $t('This field is required')]"
                          name="name"></v-text-field>
                  </p-column>
                  <p-column>
                    <v-select
                        v-model="role_id"
                        :items="rolesItems"
                        required
                        item-text="name"
                        item-value="id"
                        :rules="[v => !!v || $t('This field is required')]"
                        :label="$t('Role')">

                        <template slot='selection' slot-scope='{ item }'>
                          {{ item.name | capitalize }}
                        </template>
                        <template slot='item' slot-scope='{ item }'>
                          {{ item.name | capitalize }}
                        </template>

                    </v-select>
                  </p-column>
                  <p-column>
                        <v-select
                            v-model="permissions"
                            :items="permissionsItems"
                            :label="$t('Permissions')"
                            multiple
                            :height="32"
                            chips
                            :item-text="item => item.name.replace('_',' ')"
                            item-value="id"
                            :hint="$t('Select the permissions for this user')"
                            persistent-hint
                            >

                            <template v-slot:selection="{ item, index }">
                                <v-chip small v-if="(index === 0) || (index === 1) || (index === 2)">
                                    <span>{{ item.name }}</span>
                                </v-chip>
                                <span
                                    v-if="index === 3"
                                    class="grey--text caption"
                                >(+{{ permissions.length - 3 }} {{$t('others')}})</span>
                            </template>
                        </v-select>
                    </p-column>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn color="warning" @click="goBack">{{ $t('Back')}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validate">{{ editMode ? $t('Update') : $t('Save')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <p-snack-bar
      :text="snack.text"
      :color="snack.color"
      :snackbar="snack.snackbar" />
  </v-container>
</template>

<script>
import authHeader from '@/services/auth-header'
import _ from 'lodash'

export default {
  data () {
    return {
      itemsBc: [
        {
          text: this.$t('Dashboard'),
          disabled: false,
          to: 'Dashboard'
        },
        {
          text: this.$t('Users'),
          disabled: false,
          to: 'AdmUsers'
        },
        {
          text: this.$t('Edit User'),
          disabled: true,
          to: ''
        }
      ],
      snack: {
        text: '',
        color: '',
        snackbar: false
      },
      name: '',
      email: '',
      password: '',
      editMode: true,
      userId: '',
      role_id: '',
      rolesItems: [],
      permissionsItems: [],
      permissions: ''
    }
  },
  created () {
    this.$axios.get('role/all', {}, { headers: authHeader() })
      .then(response => {
        if (response.data.status) {
          this.rolesItems = response.data.data
        }
      })
      .catch(error => {
        console.log('Error getting Roles', error)
      })
    this.$axios.get('permission/all', {}, { headers: authHeader() })
      .then(response => {
        if (response.data.status) {
          this.permissionsItems = response.data.data
          this.permissionsItems = _.map(this.permissionsItems, function (item) {
            return {
              id: Number(item.id),
              name: item.name.replace(/([A-Z])/g, ' $1')
            }
          })
        }
      })
      .catch(error => {
        console.log('Error getting Roles', error)
      })
  },
  mounted () {
    this.$nextTick(function () {
      if (_.isEmpty(this.$route.params)) {
        this.itemsBc[2].text = this.$t('Add User')
        this.editMode = false
      } else {
        this.userId = this.$route.params.id
        this.getUserData()
      }
      this.getRoles()
    })
  },
  methods: {
    getRoles () {
      this.$axios.get('user/role', {}, { headers: authHeader() })
        .then(response => {
          if (response.data.status) {
            this.rolesItems = response.data.data
          }
        })
        .catch(error => {
          console.log('Error getting Roles', error)
        })
    },
    getUserData () {
      this.$axios.get('user/' + this.userId, {}, { headers: authHeader() })
        .then(response => {
          if (response.data.status) {
            this.name = response.data.data.name
            this.email = response.data.data.email
            this.password = '12345678'
            // get role
            if (response.data.data.Roles) {
              if (response.data.data.Roles.length > 0) {
                this.role_id = response.data.data.Roles[0].id
              }
            }
            if (response.data.data.Permissions) {
              this.permissions = _.map(response.data.data.Permissions, function (item) {
                return Number(item.id)
              })
            }
          } else {
            this.$showError(response.data.message, '', 0, this.snack)
            setTimeout(() => {
              this.$goRouter('AdmUsers')
            }, 2000)
          }
        })
        .catch(error => {
          this.$showError(this.$t('Error getting user data') + ': ' + error, '', 0, this.snack)
        })
    },
    goBack () {
      this.$goRouter('AdmUsers')
    },
    validate () {
      if (this.$refs.form.validate()) {
        let dataOptions = {
          name: this.name,
          email: this.email,
          password: this.password,
          role_id: this.role_id,
          permissions: this.permissions
        }

        if (!this.editMode) {
          this.$axios.post('user', { params: dataOptions }, { headers: authHeader() })
            .then(response => {
              if (response.data.status) {
                this.$showError(this.$t('User successfully added'), 'success', 3, this.snack)
                setTimeout(() => {
                  this.$goRouter('AdmUsers')
                }, 3000)
              } else {
                this.$showError(response.data.message, '', 2, this.snack)
              }
            })
            .catch(error => {
              this.$showError(this.$t('Error getting user data') + ': ' + error, '', 0, this.snack)
            })
        } else {
          this.$axios.put('user/' + this.userId, { params: dataOptions }, { headers: authHeader() })
            .then(response => {
              if (response.data.status) {
                this.$showError(this.$t('User successfully modified'), 'success', 3, this.snack)
                setTimeout(() => {
                  this.$goRouter('AdmUsers')
                }, 3000)
              } else {
                this.$showError(response.data.message, '', 0, this.snack)
              }
            })
            .catch(error => {
              this.$showError(this.$t('Error getting user data') + ': ' + error, '', 0, this.snack)
            })
        }
      } else {
        this.$showError(this.$t('Please complete the required fields'), '', 2, this.snack)
      }
    }
  }
}
</script>
