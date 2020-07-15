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
            color="primary"
            dark
            flat
            dense
          >
            <v-toolbar-title>{{ $t('Welcome') }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                :label="$t('Email')"
                name="user.email"
                v-model="user.email"
                prepend-icon="mdi-account"
                type="text"
                required
                :rules="[ v =>!!v || $t('This field is required'), v => /.+@.+\..+/.test(v) || $t('E-mail must be valid') ]"
              ></v-text-field>

              <v-text-field
                id="password"
                :label="$t('Password')"
                name="user.password"
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
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="handleLogin()">{{$t('Log in')}}</v-btn>
            {{message}}
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
      message: ''
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.$router.push({ name: 'Dashboard' }).catch(err => { err = null })
    }
  },
  methods: {
    handleLogin () {
      this.loading = true
      console.log('as')
      if (this.user.email && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$router.push('/dashboard')
          },
          error => {
            this.loading = false
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString()
          }
        )
      }
      // this.$validator.validateAll().then(isValid => {
      //   if (!isValid) {
      //     this.loading = false
      //     return
      //   }

      //   if (this.user.username && this.user.password) {
      //     this.$store.dispatch('auth/login', this.user).then(
      //       () => {
      //         this.$router.push('/profile')
      //       },
      //       error => {
      //         this.loading = false
      //         this.message =
      //           (error.response && error.response.data) ||
      //           error.message ||
      //           error.toString()
      //       }
      //     )
      //   }
      // })
    }
  }
}
</script>
