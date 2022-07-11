<template>
  <v-container class="white--text">
    <v-row>
      <v-col>
        <h3>
          <v-icon color="white" size="24" left>mdi-bus</v-icon> Bus EMT
        </h3></v-col
      >
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-row>
          <v-col cols="6">
            <v-card
              elevation="2"
              shaped
              height="100%"
              color="#05090C"
              class="pa-2 white--text"
            >
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
                <v-btn right small dark v-if="busStopAutocomplete.busStop"
                  ><v-icon small dark>mdi-heart</v-icon></v-btn
                >
                <v-btn right small dark class="mx-2"
                  ><v-icon small dark>mdi-magnify</v-icon>Buscar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6"
            ><v-card
              elevation="2"
              shaped
              height="100%"
              color="#05090C"
              class="pa-2 white--text"
            >
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
                <v-btn right small dark v-if="busLineAutocomplete.busLine"
                  ><v-icon small dark>mdi-heart</v-icon></v-btn
                >
                <v-btn right small dark class="mx-2"
                  ><v-icon small dark>mdi-magnify</v-icon>Buscar</v-btn
                >
              </v-card-actions>
            </v-card></v-col
          >
        </v-row>
        <v-row>
          <v-col cols="12">
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
                        <v-icon color="white"> mdi-heart-off-outline </v-icon>
                      </v-btn>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title class="white--text">
                        {{ item.busId }} - {{ item.busName }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
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
            <!-- <v-sheet height="100%">
              <div class="pa-2">
                <h2>
                  {{ stopEMTDetailResponse.data[0].StopInfo[0].stopId }} -
                  {{ stopEMTDetailResponse.data[0].StopInfo[0].stopName }}
                </h2>
                <h4>
                  Sentido:
                  {{ stopEMTDetailResponse.data[0].StopInfo[0].Direction }}
                </h4>
              </div>
              <div class="pa-2" style="height: 75%">
                <gmap-map
                  ref="mmm"
                  :center="{
                    lat: stopEMTDetailResponse.data[0].StopInfo[0].geometry
                      .coordinates[1],
                    lng: stopEMTDetailResponse.data[0].StopInfo[0].geometry
                      .coordinates[0],
                  }"
                  :zoom="15"
                  style="width: 100%; height: 100%"
                >
                  <gmap-info-window
                    :options="infoOptions"
                    :position="infoWindowPos"
                    :opened="infoWinOpen"
                    @closeclick="infoWinOpen = false"
                  >
                    <v-card>
                      <ul>
                        <li
                          v-for="(bus, idx) in stopEMTDetailResponse.data[0]
                            .Arrive"
                          :key="idx"
                        >
                          {{ bus.line }} - {{ bus.destination }} ->
                          {{ bus.estimateArrive }}
                        </li>
                      </ul>
                    </v-card>
                  </gmap-info-window>
                  <gmap-marker
                    :position="{
                      lat: stopEMTDetailResponse.data[0].StopInfo[0].geometry
                        .coordinates[1],
                      lng: stopEMTDetailResponse.data[0].StopInfo[0].geometry
                        .coordinates[0],
                    }"
                    @click="infoWinOpen = true"
                  ></gmap-marker>
                </gmap-map>
              </div>
            </v-sheet> -->
            <v-card color="#05090C" shaped dark height="100%">
              <v-card-title>
                {{ stopEMTDetailResponse.data[0].StopInfo[0].stopId }} -
                {{ stopEMTDetailResponse.data[0].StopInfo[0].stopName }}
              </v-card-title>
              <v-card-subtitle>
                Sentido:
                {{ stopEMTDetailResponse.data[0].StopInfo[0].Direction }}
              </v-card-subtitle>
              <v-card-text>
                <v-list>
                  <v-list-item
                    v-for="(bus, idx) in stopEMTDetailResponse.data[0].Arrive"
                    :key="idx"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="stopArriveItemTitle">
                        <span
                          id="stopArriveTitleLine"
                          :class="{
                            stopArriveTitleLineDefault: bus.line[0] !== 'N',
                            stopArriveTitleLineNight: bus.line[0] === 'N',
                          }"
                          >{{ bus.line }}</span
                        >
                        {{ bus.destination }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-title>
                        {{ bus.estimateArrive | moment("mm[ mins] ss[ secs]") }}
                        <v-icon small>mdi-clock-outline</v-icon>
                      </v-list-item-action-title>
                      <v-list-item-action-title>
                        {{ bus.DistanceBus }} m.
                        <v-icon small>mdi-map-marker-distance</v-icon>
                      </v-list-item-action-title>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions class="pa-2 mr-2 mb-2">
                <v-spacer></v-spacer>
                <v-btn class="pa-2"
                  ><v-icon small left>mdi-google-maps</v-icon>Mapa</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item
            color="#05090C"
            background-color="transparent"
            style="height: 100%"
          >
            <v-card color="#05090C" shaped dark height="100%">
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
  <!-- <v-row dark style="background: #141e29" class="align-center">
    <v-col cols="8">
      <v-row style="height: 25%">
        <v-col cols="6">
          <v-card elevation="3" shaped height="100%" dark>
            <v-card-title>Buscador de paradas</v-card-title>
            <v-card-text>
              <v-row class="ParadasRow px-2">
                <v-text-field dense outlined></v-text-field>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon style="background: white" color="black">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card elevation="3" shaped height="100%" dark>
            <v-card-title>Buscador de líneas</v-card-title>
            <v-card-text>
              <v-row class="LineasRow px-2">
                <v-text-field dense outlined></v-text-field>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon style="background: white" color="black">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row style="height: 75%" class="mt-8">
        <v-col>
          <v-card elevation="3" shaped height="100%" width="100%" dark>
            <v-card-title>Favoritos</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item-group>
                  <v-list-item v-for="item in items" :key="item.title">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-icon color="purple darken-3">
                        mdi-heart-off-outline
                      </v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" style="height: 100%">
      <v-card elevation="3" shaped height="100%" width="100%" dark
        >Resultados</v-card
      >
    </v-col>
  </v-row> -->
</template>

<script>
import StopEMTDetailResponse from "../store/modules/StopEMTDetailResponse.json";
import EMTLineStopsResponse from "../store/modules/EMTLineStopsResponse.json";
import ListEMTBusLinesResponse from "../store/modules/ListEMTBusLinesResponse.json";
import ListEmtStopsResponse from "../store/modules/ListEmtStopsResponse.json";

export default {
  name: "BusInfoComponent",
  data() {
    return {
      tab: 0,
      stopEMTDetailResponse: StopEMTDetailResponse,
      eMTLineStopsResponse: EMTLineStopsResponse,
      listEMTBusLinesResponse: ListEMTBusLinesResponse,
      listEmtStopsResponse: ListEmtStopsResponse,
      busLineAutocomplete: {
        busLine: null,
      },
      autocompleteBusLinesItems: ListEMTBusLinesResponse.data.map(function (
        busLine
      ) {
        return {
          text: busLine.label + " " + busLine.nameA + " - " + busLine.nameB,
          value: {
            busLine: busLine.label,
          },
        };
      }),
      busStopAutocomplete: {
        busStop: null,
      },
      autocompleteBusStopsItems: ListEmtStopsResponse.data.map(function (
        busStop
      ) {
        return {
          text: busStop.node + " - " + busStop.name,
          value: {
            busStop: busStop.node,
          },
        };
      }),
      items: ["Parada", "Línea de bus"],
      favoriteList: [
        {
          busId: "1671",
          busName: "Rubio y Galí-Jerónima Llorente",
        },
        {
          busId: "44",
          busName: "PLAZA DEL CALLAO - MARQUES DE VIANA",
        },
      ],
      panel: 0,
      currentMidx: 0,
      infoOptions: {
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWindowPos: null,
      infoWinOpen: false,
    };
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
.LineasRow {
  .v-text-field__details {
    display: none;
  }
}

.ParadasRow {
  .v-text-field__details {
    display: none;
  }
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
}

.stopArriveTitleLineDefault {
  background-color: #2c7abf;
}

.stopArriveTitleLineNight {
  background-color: black;
  color: whteº;
}

.searchTitle {
  word-break: break-word;
}

.favoriteCard {
  display: flex !important;
  flex-direction: column;
  // overflow-y: scroll;
}

.busLinetimeline.theme--dark::before {
  left: calc(50% - 6 px) !important;
  right: initial !important;
  width: 12 px !important;
  border-radius: 35 px !important;
}
</style>
