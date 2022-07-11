<template>
  <v-navigation-drawer
    app
    floating
    disable-route-watcher
    enable-resize-watcher
    v-model="drawer"
    height="100%"
    color="#05090C"
    class="white--text"
  >
    <template v-slot:prepend>
      <v-card height="140" flat tile color="#05090C"> TTMadrid </v-card>
    </template>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item dark link to="/bus">
        <v-list-item-icon>
          <v-icon>mdi-bus</v-icon>
        </v-list-item-icon>
        <v-list-item-content> Bus EMT </v-list-item-content>
      </v-list-item>
      <v-list-item dark link to="/about">
        <v-list-item-icon>
          <v-icon>mdi-subway</v-icon>
        </v-list-item-icon>
        <v-list-item-content> Metro</v-list-item-content>
      </v-list-item>
      <v-list-item dark link>
        <v-list-item-icon>
          <v-icon>mdi-bus</v-icon>
        </v-list-item-icon>
        <v-list-item-content> Cercanías </v-list-item-content>
      </v-list-item>
      <v-list-item dark link>
        <v-list-item-icon>
          <v-icon>mdi-bus</v-icon>
        </v-list-item-icon>
        <v-list-item-content> Bus interurbano </v-list-item-content>
      </v-list-item>
      <v-list-item dark link to="/bicimad">
        <v-list-item-icon>
          <v-icon>mdi-bike</v-icon>
        </v-list-item-icon>
        <v-list-item-content> BiciMad </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NavigationDrawerComponent",
  computed: {
    ...mapGetters("globalModule", ["getAccessToken", "isLoggedIn"]),
  },
  data() {
    return {
      drawer: true,
    };
  },
  created() {},
  methods: {
    ...mapActions("globalModule", ["setAccessToken", "loginAPI"]),
  },
};
</script>

<style lang="scss">
.v-list-item--active {
  color: #0096c7 !important;
}
</style>