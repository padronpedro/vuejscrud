<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <p-list-item :toPath="'Dashboard'" :iconName="'mdi-home'" :textTitle="$t('Home')" />
        <p-list-item :toPath="'Login'" :iconName="'mdi-home'" :textTitle="$t('Log in')" />
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
