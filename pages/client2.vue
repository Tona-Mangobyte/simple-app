<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">
          Welcome to Minority Game | Counter {{ counter }}
        </v-card-title>
        <v-card-text>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-for="user in users" :key="user.id">
                {{ user.gameUsername }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="eventId" label="Event Id"></v-text-field>
            <v-text-field
              v-model.number="matchId"
              label="Match Id"
            ></v-text-field>
            <v-text-field
              v-model.number="duration"
              label="Duration"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="start"> March Start </v-btn>
          <v-btn color="primary" @click="cancel"> March Cancel </v-btn>
          <v-btn color="primary" @click="join"> March Join </v-btn>
          <v-btn color="primary" @click="joinCancel"> March Join Cancel </v-btn>
          <v-btn color="primary" @click="bluffRates"> Bluff Rates </v-btn>
          <v-btn color="primary" @click="getQuick"> Start Quick </v-btn>
          <v-btn color="primary" @click="addUserToRoom">
            Add User(Join Already)
          </v-btn>
          <v-btn color="primary" @click="leaveUserFromRoom"> Leave User </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-row>
        <v-col v-for="(q, index) in quick.items" :key="index">
          <v-card class="mx-auto" max-width="344">
            <v-img
              v-if="quick.type === 'IMAGE'"
              :src="
                q.imageUrl ||
                'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
              "
              height="200px"
            ></v-img>
            <v-card-title>
              <p class="text-h4 text--primary">{{ q.title }}</p>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ws from '~/mixins/ws'

@Component
export default class extends mixins(ws) {
  // Mango one
  userId = 2
  accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyand0IjoiMjo2MWRmNGRiMC03ZDliLTExZWMtOWY0OC1iM2ExYzM2MTUyZTIiLCJkYXRhVG9rZW4iOnsiaWQiOjIsInBsYXRmb3JtVUlEIjoiMiJ9LCJpYXQiOjE2NDMwODY2ODUsImV4cCI6MTY0MzE3MzA4NX0.siA80BEvgEFLVMgnx6dnPuCS-8gkTn-qaRaFWNkMf_8'

  mounted() {
    this.connectSocket()
    this.getAllListenEventOnSocket()
  }
}
</script>
