<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <p-list-item :toPath="'Dashboard'" :iconName="'mdi-home'" :textTitle="$t('Home')" />
        <p-list-item :toPath="'Login'" :iconName="'mdi-home'" :textTitle="$t('Log in')" />
        <v-icon @click="test">mdi-logout</v-icon>
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
      <v-icon @click="logout">mdi-logout</v-icon>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
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
  props: {
    source: String
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
        this.$router.push({ name: 'Login' }).catch(err => { err = null })
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
