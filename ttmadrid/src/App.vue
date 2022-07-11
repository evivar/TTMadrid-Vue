<template>
  <v-app>
    <v-app-bar app flat height="70" color="#05090C">
      <v-toolbar-title class="white--text">TTMadrid</v-toolbar-title>
    </v-app-bar>
    <navigation-drawer-component />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer color="#05090C">
      <v-col class="text-center" style="color: #edf0f2" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NavigationDrawerComponent from "./components/NavigationDrawerComponent.vue";
import emtApi from "./utils/emtApi";

export default {
  components: { NavigationDrawerComponent },
  name: "App",
  data() {
    return {
      drawer: true,
    };
  },
  methods: {
    ...mapActions("globalModule", ["setAccessToken", "loginAPI"]),
  },
};
</script>

<style lang="scss">
.container {
  height: 100%;
  background-color: #141e29;
}
</style>
