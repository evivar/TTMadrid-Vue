<template>
  <v-container class="white--text">
    <v-row>
      <v-col>
        <h3>
          <v-icon color="white" size="24" left>mdi-bike</v-icon> BiciMad y
          BiciMad GO
        </h3></v-col
      >
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-col>
          <v-card
            elevation="2"
            color="#05090C"
            shaped
            height="25vh"
            class="pa-2 white--text"
          >
            <v-card-title> Buscador de estaciones </v-card-title>
            <v-card-text>
              <v-autocomplete
                v-model="stationAutocomplete"
                :items="autocompleteItems"
                solo
                dense
                label="Número de estación"
                dark
                rounded
                prepend-inner-icon="mdi-magnify"
              >
                <template
                  v-slot:append-outer
                  v-if="stationAutocomplete.stationId"
                >
                  <v-btn right small dark @click="addToFavorites"
                    ><v-icon small dark>mdi-heart</v-icon></v-btn
                  >
                </template>
              </v-autocomplete>
              <div class="d-flex justify-end">
                <v-btn
                  right
                  small
                  dark
                  class="mx-2"
                  :disabled="tab != 0"
                  @click="searchStationBySelectedId"
                  ><v-icon small dark>mdi-magnify</v-icon>Buscar</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            elevation="2"
            color="#05090C"
            shaped
            height="35vh"
            class="pa-2 white--text favoriteCard"
          >
            <v-card-title>Favoritos</v-card-title>
            <v-card-text class="favoriteCardText" style="overflow-y: scroll">
              <v-list style="background: none">
                <v-list-item
                  style="background-color: #354553"
                  v-for="(item, idx) in favoriteList"
                  :key="idx"
                >
                  <v-list-item-action>
                    <v-btn light icon>
                      <v-icon color="white" @click="removeFromFavorites(idx)">
                        mdi-heart-off-outline
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content
                    @click="searchStationById(item.stationId)"
                  >
                    <v-list-item-title class="white--text">
                      {{ item.stationId }} - {{ item.stationName }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-col>
      <v-col cols="8">
        <v-tabs v-model="tab" background-color="transparent" color="white" grow>
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items
          v-model="tab"
          color="#05090C"
          background-color="transparent"
          style="background: transparent; height: 60vh !important"
          class="white--text"
        >
          <v-tab-item
            color="#05090C"
            background-color="transparent"
            style="height: 100%"
          >
            <v-card color="#05090C" shaped dark height="100%">
              <gmap-map
                ref="mmm"
                :center="center"
                :zoom="zoom"
                style="width: 100%; height: 100%"
              >
                <gmap-info-window
                  :options="infoOptions"
                  :position="infoWindowPos"
                  :opened="infoWinOpen"
                  @closeclick="closeInfoWindow"
                >
                  <div>
                    <v-row no-gutters>
                      <v-col cols="12">
                        {{ infoContent.stationName }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-icon light small>mdi-bike</v-icon>
                        <span>{{ infoContent.freeBikes }}</span>
                      </v-col>
                      <v-col cols="6">
                        <v-icon light small>mdi-cellphone-dock</v-icon>
                        <span>
                          {{ infoContent.freeBases }}
                        </span>
                      </v-col>
                    </v-row>
                  </div>
                </gmap-info-window>
                <gmap-marker
                  v-for="(m, index) in responseExample.data"
                  :key="index"
                  :icon="markerIcon"
                  :title="m.number + ' - ' + m.name"
                  :position="{
                    lat: m.geometry.coordinates[1],
                    lng: m.geometry.coordinates[0],
                  }"
                  :clickable="true"
                  @click="toggleInfoWindow(m, index)"
                ></gmap-marker>
              </gmap-map>
            </v-card>
          </v-tab-item>
          <v-tab-item
            color="#05090C"
            background-color="transparent"
            style="height: 100%"
          >
            <v-card color="#05090C" shaped dark height="100%">
              <gmap-map
                ref="mmmGO"
                :center="center"
                :zoom="zoom"
                style="width: 100%; height: 100%"
              >
                <gmap-info-window
                  :options="infoBikeOptions"
                  :position="infoBikeWindowPos"
                  :opened="infoBikeWinOpen"
                  @closeclick="closeInfoBikeWindow"
                >
                  <div>
                    <v-row no-gutters>
                      <v-col cols="12">
                        {{ bikeContent.bikeAddress }}
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-icon light small>mdi-battery</v-icon>
                        <span>{{ bikeContent.battery }}</span>
                      </v-col>
                      <v-col cols="6">
                        <span>
                          {{ bikeContent.state }}
                        </span>
                      </v-col>
                    </v-row>
                  </div>
                </gmap-info-window>
                <gmap-marker
                  v-for="(m, index) in listBicimadGoAvailableBikesResponse.data"
                  :key="index"
                  :icon="bikeIcon"
                  :title="m.Address"
                  :position="{
                    lat: m.geometry.coordinates[1],
                    lng: m.geometry.coordinates[0],
                  }"
                  :clickable="true"
                  @click="toggleBikeInfoWindow(m, index)"
                ></gmap-marker>
              </gmap-map>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListBicimadStationsResponse from "../store/modules/ListBicimadStationsResponse.json";
import SearchBicimadStationIdResponse from "../store/modules/SearchBicimadStationIdResponse.json";
import ListBicimadGoAvailableBikesResponse from "../store/modules/ListBicimadGoAvailableBikesResponse.json";
import markerIcon from "../assets/BiciMadStation.svg";
import bikeIcon from "../assets/bicycle.png";
import BicimadFavorite from "./favorites/BicimadFavorite.vue";

export default {
  components: { BicimadFavorite },
  name: "BicimadInfoComponent",
  data() {
    return {
      stationAutocomplete: {
        stationId: null,
        stationName: null,
      },
      markerIcon: markerIcon,
      bikeIcon: bikeIcon,
      tab: null,
      responseExample: ListBicimadStationsResponse,
      searchStationByIdResponseExample: SearchBicimadStationIdResponse,
      listBicimadGoAvailableBikesResponse: ListBicimadGoAvailableBikesResponse,
      autocompleteItems: ListBicimadStationsResponse.data.map(function (
        station
      ) {
        return {
          text: station.number + " - " + station.name,
          value: {
            stationName: station.number + " - " + station.name,
            stationId: station.id,
          },
        };
      }),
      favoriteList: [
        {
          stationName: "1a - Puerta del Sol A",
          stationId: 1,
        },
      ],
      items: ["BiciMad", "BiciMad GO"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      zoom: 11,
      center: {
        lat: 40.41664,
        lng: -3.7059988,
      },
      infoWindowPos: null,
      infoWinOpen: false,
      infoBikeWindowPos: null,
      infoBikeWinOpen: false,
      infoContent: {
        stationName: "",
        freeBikes: 0,
        freeBases: 0,
      },
      bikeContent: {
        bikeAddress: "",
        battery: 0,
        state: "",
      },
      infoOptions: {
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoBikeOptions: {
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },

  methods: {
    addToFavorites() {
      this.favoriteList.push(this.stationAutocomplete);
    },
    removeFromFavorites(idx) {
      this.favoriteList.splice(idx, 1);
    },
    searchStationById(stationId) {
      //   TODO: Mandar la petición al servicio y con la respuesta cambiar el zoom, el center y llamar al toggleInfoWindow
      this.tab = 0;
      if (this.searchStationByIdResponseExample.data.length > 0) {
        this.toggleInfoWindow(
          this.searchStationByIdResponseExample.data[0],
          this.stationAutocomplete.stationId
        );
      }
    },
    searchStationBySelectedId() {
      //   TODO: Mandar la petición al servicio y con la respuesta cambiar el zoom, el center y llamar al toggleInfoWindow
      this.tab = 0;
      if (this.searchStationByIdResponseExample.data.length > 0) {
        this.toggleInfoWindow(
          this.searchStationByIdResponseExample.data[0],
          this.stationAutocomplete.stationId
        );
      }
    },
    closeInfoWindow() {
      this.infoWinOpen = false;
      (this.zoom = 11),
        (this.center = {
          lat: 40.41664,
          lng: -3.7059988,
        });
    },
    closeInfoBikeWindow() {
      this.infoBikeWinOpen = false;
      (this.zoom = 11),
        (this.center = {
          lat: 40.41664,
          lng: -3.7059988,
        });
    },
    toggleInfoWindow(marker, idx) {
      this.infoContent.stationName = marker.number + " - " + marker.name;
      this.infoContent.freeBikes = marker.dock_bikes;
      this.infoContent.freeBases = marker.free_bases;
      this.infoWindowPos = {
        lng: marker.geometry.coordinates[0],
        lat: marker.geometry.coordinates[1],
      };
      this.center = {
        lat: marker.geometry.coordinates[1],
        lng: marker.geometry.coordinates[0],
      };
      this.zoom = 14;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    toggleBikeInfoWindow(marker, idx) {
      this.bikeContent.bikeAddress = marker.Address;
      this.bikeContent.battery = marker.porcBattery;
      this.bikeContent.state = marker.state;
      this.infoBikeWindowPos = {
        lng: marker.geometry.coordinates[0],
        lat: marker.geometry.coordinates[1],
      };
      this.center = {
        lat: marker.geometry.coordinates[1],
        lng: marker.geometry.coordinates[0],
      };
      this.zoom = 14;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoBikeWinOpen = !this.infoBikeWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoBikeWinOpen = true;
        this.currentMidx = idx;
      }
    },

    fitBounds() {
      const b = new google.maps.LatLngBounds();

      b.extend({
        lat: 33.972,
        lng: 35.4054,
      });
      b.extend({
        lat: 33.7606,
        lng: 35.64592,
      });

      this.$refs.mmm.fitBounds(b);
    },
    panToBounds() {
      const b = new google.maps.LatLngBounds();

      b.extend({
        lat: 33.972,
        lng: 35.4054,
      });
      b.extend({
        lat: 33.7606,
        lng: 35.64592,
      });

      this.$refs.mmm.panToBounds(b);
    },
    panTo() {
      this.$refs.mmm.panTo({
        lat: 47.912867,
        lng: 106.910723,
      });
    },
  },
};
</script>

<style lang="scss">
.gm-style {
  color: black;
}

.favoriteCard {
  display: flex !important;
  flex-direction: column;
  // overflow-y: scroll;
}

// .favoriteCardText {
//   height: 10vmax;
//   & > ul {
//     height: -webkit-fill-available;
//     overflow-x: hidden;
//     overflow-y: scroll;
//   }
// }
</style>