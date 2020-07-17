<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <p-list-item :toPath="'Login'" :iconName="'mdi-login'" :textTitle="$t('Log in')"  v-if="!currentUser" />
        <p-list-item :toPath="'Register'" :iconName="'mdi-account-plus'" :textTitle="$t('Register')"  v-if="!currentUser" />
        <p-list-item :toPath="'Dashboard'" :iconName="'mdi-home'" :textTitle="$t('Home')"  v-if="currentUser" />
        <p-list-item :toPath="'AdmUsers'" :iconName="'mdi-account-multiple'" :textTitle="$t('Users')"  v-if="currentUser" />

          <v-list-item link @click="logout" v-if="currentUser">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t('Logout')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="blue"
      dark
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>CRUD Demo</v-toolbar-title>
      <v-spacer />
      <v-icon @click="logout" v-if="currentUser">mdi-logout</v-icon>
    </v-app-bar>

    <v-main>
      <v-container
        fluid
      >
        <router-view/>
      </v-container>
    </v-main>
    <v-footer
      color="blue"
      app
    >
      <span class="white--text">&copy; Pedro Padron {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import authHeader from './services/auth-header'

export default {
  name: 'App',
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  },
  created () {
    this.$eventHub.$on('toggleDrawer', this.toggleDrawer)
  },
  data: () => ({
    drawer: false
  }),
  methods: {
    toggleDrawer: function () {
      this.drawer = !this.drawer
    },
    logout: function () {
      this.$store.dispatch('auth/logout', this.user).then(
        this.$goRouter('Login')
      )
    },
    test: function () {
      this.$axios.get('/test/admin', { headers: authHeader() })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log('Get Clients error: ', error)
        })
    }
  }
}
</script>
