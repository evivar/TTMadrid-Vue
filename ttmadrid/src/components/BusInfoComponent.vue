<template>
  <v-container class="busInfoContainer">
    <v-row>
      <v-col cols="6">
        <h3><v-icon left color="white" size="24">mdi-bus</v-icon> Bus EMT</h3>
      </v-col>
    </v-row>
    <v-row class="row2">
      <v-col cols="6" class="busInfoLeftCol">
        <v-row>
          <v-col cols="6">
            <v-card elevation="2" shaped color="#05090C" class="white--text">
              <v-card-title class="searchTitle"
                >Buscador de paradas</v-card-title
              >
              <v-card-text>
                <v-row class="LineasRow px-2">
                  <v-autocomplete
                    v-model="busStopAutocomplete"
                    :items="autocompleteBusStopsItems"
                    solo
                    dense
                    label="Número de parada"
                    dark
                    rounded
                    prepend-inner-icon="mdi-magnify"
                  >
                  </v-autocomplete>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  right
                  small
                  dark
                  v-if="busStopAutocomplete.busId"
                  @click="addBusStopToFavorites"
                  ><v-icon small dark>mdi-heart</v-icon></v-btn
                >
                <v-btn right small dark class="mx-2"
                  ><v-icon small dark>mdi-magnify</v-icon>Buscar</v-btn
                >
              </v-card-actions></v-card
            >
          </v-col>
          <v-col cols="6">
            <v-card elevation="2" shaped color="#05090C" class="white--text">
              <v-card-title class="searchTitle"
                >Buscador de líneas</v-card-title
              >
              <v-card-text>
                <v-row class="ParadasRow px-2">
                  <v-autocomplete
                    v-model="busLineAutocomplete"
                    :items="autocompleteBusLinesItems"
                    solo
                    dense
                    label="Número de línea"
                    dark
                    rounded
                    prepend-inner-icon="mdi-magnify"
                  >
                  </v-autocomplete>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  right
                  small
                  dark
                  v-if="busLineAutocomplete.busId"
                  @click="addBusLineToFavorites"
                  ><v-icon small dark>mdi-heart</v-icon></v-btn
                >
                <v-btn right small dark class="mx-2"
                  ><v-icon small dark>mdi-magnify</v-icon>Buscar</v-btn
                >
              </v-card-actions></v-card
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card
              elevation="2"
              shaped
              color="#05090C"
              class="white--text"
              height="100%"
            >
              <v-card-title>Favoritos</v-card-title>
              <v-card-text class="favoriteCardText">
                <div v-if="favoriteList.length > 0">
                  <v-virtual-scroll
                    :items="favoriteList"
                    height="200"
                    item-height="48"
                  >
                    <template v-slot:default="{ item, index }">
                      <v-list-item
                        :key="index"
                        style="background-color: #354553"
                      >
                        <v-list-item-action>
                          <v-btn light icon>
                            <v-icon
                              color="white"
                              @click="removeFromFavorites(index)"
                            >
                              mdi-heart-off-outline
                            </v-icon>
                          </v-btn>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title class="white--text">
                            {{ item.busId }} - {{ item.busName }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <v-divider />
                    </template>
                  </v-virtual-scroll>
                </div>
                <v-sheet
                  height="200"
                  color="#05090C"
                  class="busFavoritesNoDataSheet"
                  v-else
                >
                  Todavía no tienes favoritos
                </v-sheet>
              </v-card-text></v-card
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="white"
          grow
          hide-slider
        >
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
            <v-card
              color="#05090C"
              shaped
              dark
              height="100%"
              v-if="stopEMTDetailResponse.code !== '00'"
            >
            </v-card>
            <v-card color="#05090C" shaped dark height="100%" v-else>
              <v-card-title>
                {{ stopEMTDetailResponse.data[0].StopInfo[0].stopId }} -
                {{ stopEMTDetailResponse.data[0].StopInfo[0].stopName }}
              </v-card-title>
              <v-card-subtitle>
                Sentido:
                {{ stopEMTDetailResponse.data[0].StopInfo[0].Direction }}
              </v-card-subtitle>
              <v-card-text>
                <v-virtual-scroll
                  :items="stopEMTDetailResponse.data[0].Arrive"
                  height="300"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item :key="item" style="background-color: #354553">
                      <v-list-item-content>
                        <v-list-item-title class="stopArriveItemTitle">
                          <span
                            id="stopArriveTitleLine"
                            :class="{
                              stopArriveTitleLineDefault: item.line[0] !== 'N',
                              stopArriveTitleLineNight: item.line[0] === 'N',
                            }"
                            >{{ item.line }}</span
                          >
                          {{ item.destination }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-title>
                          {{
                            item.estimateArrive | moment("mm[ mins] ss[ secs]")
                          }}
                          <v-icon small>mdi-clock-outline</v-icon>
                        </v-list-item-action-title>
                        <v-list-item-action-title>
                          {{ item.DistanceBus }} m.
                          <v-icon small>mdi-map-marker-distance</v-icon>
                        </v-list-item-action-title>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item
            color="#05090C"
            background-color="transparent"
            style="height: 100%"
          >
            <v-card
              color="#05090C"
              shaped
              dark
              height="100%"
              v-if="eMTLineStopsResponse.code !== '00'"
            ></v-card>
            <v-card color="#05090C" shaped dark height="100%" v-else>
              <v-card-title>
                Línea {{ eMTLineStopsResponse.data.label }}:
                {{ eMTLineStopsResponse.data.nameSectionA }} -
                {{ eMTLineStopsResponse.data.nameSectionB }}
              </v-card-title>
              <v-card-text style="height: 75%; overflow-y: scroll" class="pa-2">
                <v-timeline class="busLinetimeline">
                  <v-timeline-item
                    v-for="(stop, idx) in eMTLineStopsResponse.data.stops.toA
                      .features"
                    :key="idx"
                    id="test"
                    class="align-center"
                  >
                    {{ stop.properties.stopName }}</v-timeline-item
                  >
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import emtApi from "../utils/emtApi";
import someApi from "../utils/someApi";

import StopEMTDetailResponse from "../store/modules/StopEMTDetailResponse.json";
import EMTLineStopsResponse from "../store/modules/EMTLineStopsResponse.json";
import ListEMTBusLinesResponse from "../store/modules/ListEMTBusLinesResponse.json";
import ListEmtStopsResponse from "../store/modules/ListEmtStopsResponse.json";

export default {
  name: "BusInfoComponent",
  data() {
    return {
      tab: 0,
      busLineAutocomplete: {
        busId: null,
        busName: null,
      },
      busStopAutocomplete: {
        busId: null,
        busName: null,
      },
      items: ["Parada", "Línea de bus"],
      favoriteList: [],

      stopEMTDetailResponse: {},
      astopEMTDetailResponse: StopEMTDetailResponse,
      eMTLineStopsResponse: EMTLineStopsResponse,
      listEMTBusLinesResponse: ListEMTBusLinesResponse,
      listEmtStopsResponse: ListEmtStopsResponse,
      autocompleteBusLinesItems: [],
      autocompleteBusStopsItems: [],
    };
  },
  created() {
    this.getAllBusLinesAndStops();
  },
  computed: {
    ...mapGetters("globalModule", ["getAccessToken"]),
  },
  methods: {
    getAllBusLinesAndStops() {
      emtApi
        .get("v2/transport/busemtmad/lines/info/", {
          headers: {
            accessToken: this.getAccessToken,
          },
        })
        .then((response) => {
          this.autocompleteBusLinesItems = response.data.data.map(function (
            busLine
          ) {
            return {
              text: busLine.label + " " + busLine.nameA + " - " + busLine.nameB,
              value: {
                busId: busLine.label,
                busName: busLine.nameA + " - " + busLine.nameB,
              },
            };
          });
          this.getAllBusStops();
        });
    },
    getAllBusStops() {
      emtApi
        .post("v1/transport/busemtmad/stops/list/", {
          headers: {
            accessToken: this.getAccessToken,
          },
        })
        .then((response) => {
          console.log("response :>> ", response);
          this.autocompleteBusStopsItems = response.data.data.map(function (
            busStop
          ) {
            return {
              text: busStop.node + " - " + busStop.name,
              value: {
                busId: busStop.node,
                busName: busStop.name,
              },
            };
          });
        });
    },
    busStopSearch() {},
    addBusLineToFavorites() {
      this.favoriteList.push(this.busLineAutocomplete);
    },
    addBusStopToFavorites() {
      this.favoriteList.push(this.busStopAutocomplete);
    },
    removeFromFavorites(idx) {
      this.favoriteList.splice(idx, 1);
    },
  },
  filters: {
    formatEMTArriveTime(arrivalTime) {
      return arrivalTime < 9999
        ? this.$moment(arrivalTime * 1000).format("mm[ mins] ss[ secs]")
        : "+45 mins 00 secs";
    },
  },
};
</script>

<style lang="scss">
.busInfoContainer {
  display: flex;
  flex-direction: column;
  color: white;
  & > .row:first-child {
    flex-grow: 0;
  }
}

.busInfoLeftCol {
  display: flex;
  flex-direction: column;
  // & > .row:first-child {
  //   flex-grow: 0 !important;
  // }
}

.favoriteCardTitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.stopArriveItemTitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

#stopArriveTitleLine {
  border-radius: 5px;
  padding: 4px !important;
  margin-right: 4px !important;
  font-weight: bold;
}

.stopArriveTitleLineDefault {
  background-color: #2c7abf;
}

.stopArriveTitleLineNight {
  background-color: black;
  color: #fdd51e;
}

.busFavoritesNoDataSheet {
  color: white !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>