<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="teal lighten-1"
            dark
            flat
            dense
          >
            <v-toolbar-title>{{ $t('Welcome') }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
            <v-progress-linear
              :indeterminate="loading"
              :active="loading"
              bottom
              color="red"
            ></v-progress-linear>
          <v-card-text>

            <v-form ref="form" lazy-validation>
              <v-text-field
                :label="$t('Email')"
                name="user.email"
                test-id="user-email"
                v-model="user.email"
                prepend-icon="mdi-email"
                type="text"
                required
                :rules="[ v =>!!v || $t('This field is required'), v => /.+@.+\..+/.test(v) || $t('E-mail must be valid') ]"
              ></v-text-field>

              <v-text-field
                id="password"
                :label="$t('Password')"
                name="user.password"
                test-id="user-password"
                v-model="user.password"
                prepend-icon="mdi-lock"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                :rules="[ v => !!v || $t('This field is required') ]"
                required
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange lighten-1"
              @click="$goRouter('Register')"
            >{{$t('Register')}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              test-id="btn-login"
              color="primary"
              @click="handleLogin()"
            >{{$t('Log in')}}</v-btn>
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
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      loading: false,
      showPassword: false,
      message: '',
      snack: {
        text: '',
        color: '',
        snackbar: false
      },
      logged: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.logged = true
      this.$goRouter('Dashboard')
    }
  },
  methods: {
    handleLogin () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$store.dispatch('auth/login', this.user)
          .then(() => {
            this.loading = false
            this.logged = true
            this.$goRouter('Dashboard')
          },
          error => {
            this.loading = false
            var aux = error.response ? error.response.data.message : this.$t('Error connecting')
            this.$showError(aux, '', 0, this.snack)
          })
          .catch(error => {
            this.$showError(this.$t('Error') + ': ' + error, '', 3, this.snack)
          })
      } else {
        this.$showError(this.$t('Please, complete all required fields'), '', 3, this.snack)
      }
    }
  }
}
</script>
