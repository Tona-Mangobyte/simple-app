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
                {{ user.username }}</v-list-item-title
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
          <v-btn color="primary" @click="getDuration"> Duration </v-btn>
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
  // Tona MB
  userId = 8
  accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyand0IjoiODo5YjNhMDUwMC03ZDk2LTExZWMtYTg0My04N2QwMjM0ZWQ4YTYiLCJkYXRhVG9rZW4iOnsiaWQiOjgsInBsYXRmb3JtVUlEIjoiYTFjN2MxMmMtOTJhZS00ZDZjLThlMDMtOTU2YTBlYTk4ZDFjIn0sImlhdCI6MTY0MzA4NDYzNCwiZXhwIjoxNjQzMTcxMDM0fQ.S77hV-4dTNBS6CQDb9SNmYt8grUwfZLbo5V0GfC4z_c'

  mounted() {
    this.connectSocket()
    this.getAllListenEventOnSocket()
  }
}
</script>
