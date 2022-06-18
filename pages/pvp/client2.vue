<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">
          Demo Minority Game Multiplay | Counter {{ counter }} | Total Player
          {{ totalPlayer }} | Round {{ round }}
        </v-card-title>
        <v-card-text>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-for="(user, index) in users" :key="index">
                {{ user.gameUsername }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-radio-group v-model="itemId">
            <v-radio
              v-for="n in itemList"
              :key="n.id"
              :label="`${n.title}(${n.percentage})`"
              :value="n.id"
            ></v-radio>
          </v-radio-group>
          <v-text-field v-model="matchId" label="Match Id"></v-text-field>
          <v-text-field
            v-model="eventId"
            label="Platform Event Id"
          ></v-text-field>
          <v-text-field v-model="token" label="Token Access"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="getItemsListMatch">Items List </v-btn>
          <v-btn color="primary" @click="join"> Join PVP </v-btn>
          <v-btn color="primary" @click="joinCancel"> leave Join PVP </v-btn>
          <v-btn color="primary" @click="start"> Start PVP </v-btn>
          <v-btn color="primary" @click="bluffRates"> IS Bluff </v-btn>
          <v-btn color="primary" @click="onSelect"> Select </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ws from '~/mixins/ws'

@Component
export default class extends mixins(ws) {
  // Mango one Admin
  IS_USERID = true
  userId = 18

  get accessToken() {
    return '18'
  }
}
</script>
