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
      userId: ''
    }
  },
  mounted () {
    this.$nextTick(function () {
      if (_.isEmpty(this.$route.params)) {
        this.itemsBc[2].text = this.$t('Add User')
        this.editMode = false
      } else {
        this.userId = this.$route.params.id
      }
    })
  },
  methods: {
    goBack () {
      this.$goRouter('AdmUsers')
    },
    validate () {
      if (this.$refs.form.validate()) {
        let dataOptions = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        if (!this.editMode) {
          this.$axios.post('user', { headers: authHeader(), params: dataOptions })
            .then(response => {
              if (response.data.status) {
                this.$showError(this.$t('User successfully added'), '', 3, this.snack)
              } else {
                this.$showError(response.data.message, '', 0, this.snack)
              }
            })
            .catch(error => {
              this.$showError(this.$t('Error getting users data') + ': ' + error, '', 0, this.snack)
            })
        } else {
          this.$axios.put('user/' + this.userId, { headers: authHeader(), params: dataOptions })
            .then(response => {
              if (response.data.status) {
                this.$showError(this.$t('User successfully modified'), '', 3, this.snack)
              } else {
                this.$showError(response.data.message, '', 0, this.snack)
              }
            })
            .catch(error => {
              this.$showError(this.$t('Error getting users data') + ': ' + error, '', 0, this.snack)
            })
        }
      } else {
        this.$showError(this.$t('Please complete the required fields'), '', 2, this.snack)
      }
    }
  }
}
</script>
