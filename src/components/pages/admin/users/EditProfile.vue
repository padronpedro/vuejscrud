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
              <p-divider :txtDivider="$t('Edit profile')"></p-divider>
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
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn color="warning" @click="goBack">{{ $t('Back')}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validate">{{ $t('Update') }}</v-btn>
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
          text: this.$t('Profile'),
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
      userId: ''
    }
  },
  mounted () {
    this.$nextTick(function () {
      if (_.isEmpty(this.$currentUser())) {
        this.$goRouter('Dashboard')
      } else {
        this.userId = this.$currentUser().id
        this.getUserData()
      }
    })
  },
  methods: {
    getUserData () {
      this.$axios.get('user/' + this.userId, {}, { headers: authHeader() })
        .then(response => {
          if (response.data.status) {
            this.name = response.data.data.name
            this.email = response.data.data.email
            this.password = '12345678'
          } else {
            this.$showError(response.data.message, '', 0, this.snack)
            setTimeout(() => {
              this.$goRouter('Dashboard')
            }, 2000)
          }
        })
        .catch(error => {
          this.$showError(this.$t('Error getting user data') + ': ' + error, '', 0, this.snack)
        })
    },
    goBack () {
      this.$goRouter('Dashboard')
    },
    validate () {
      if (this.$refs.form.validate()) {
        let dataOptions = {
          name: this.name,
          email: this.email,
          password: this.password,
          id: this.userId
        }

        this.$axios.put('profile', { params: dataOptions }, { headers: authHeader() })
          .then(response => {
            if (response.data.status) {
              this.$showError(this.$t('Your information was successfully added'), 'success', 3, this.snack)
              setTimeout(() => {
                this.$goRouter('Dashboard')
              }, 3000)
            } else {
              this.$showError(response.data.message, '', 2, this.snack)
            }
          })
          .catch(error => {
            this.$showError(this.$t('Error getting your information') + ': ' + error, '', 0, this.snack)
          })
      } else {
        this.$showError(this.$t('Please complete the required fields'), '', 2, this.snack)
      }
    }
  }
}
</script>
