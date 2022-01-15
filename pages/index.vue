<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8">
      <v-card>
        <v-card-title class="headline"> Welcome to Minority Game </v-card-title>
        <v-card-text>
          <p>Some handlers in matches</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="start"> March Start </v-btn>
          <v-btn color="primary" @click="cancel"> March Cancel </v-btn>
          <v-btn color="primary" @click="join"> March Join </v-btn>
          <v-btn color="primary" @click="joinCancel"> March Join Cancel </v-btn>
          <v-btn color="primary" @click="bluffRates"> Bluff Rates </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { io, Socket } from 'socket.io-client'

@Component
export default class extends Vue {
  // SOCKET REQUEST EVENT
  MATCH_START = '1'
  MATCH_CANCEL = '2'
  MATCH_JOIN = '4'
  MATCH_JOIN_CANCEL = '3'
  BLUFF_RATE = '5'

  // SOCKET LISTEN EVENT
  CONNECTION = 'connect'
  DISCONNECT = 'disconnect'
  USER_CONNECTED = '0'
  WAITING_USERS_LIST = '13'
  MATCH_STARTED = '4'
  MATCH_JOINED = '2'
  MATCH_JOIN_CANCELLED = '3'
  MATCH_CANCELLED = '5'
  BLUFF_RATES = '6'

  // SOCKET LISTEN ERROR
  CONNECTION_ERROR = 'connect_error'
  GENERAL_ERROR = 'error'

  socket!: Socket

  mounted() {
    console.log('====mounted========')
    this.socket = io('http://localhost:9000', {
      path: '/minority.game/',
      auth: {
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyand0IjoiMTpkYjdkNTU3MC03NWI0LTExZWMtOTg2NC0zZjVlMzFjYTZkNTkiLCJkYXRhVG9rZW4iOnsiaWQiOjEsInBsYXRmb3JtVUlEIjoiMiJ9LCJpYXQiOjE2NDIyMTgwMTcsImV4cCI6MTY0MjMwNDQxN30.U5YAImBSvkyLC7CT-Z1V6A9zGgIkIpyEa8DMABLRMsw',
      },
    })
    // client-side
    this.socket.on(this.CONNECTION, () => {
      if (this.socket.connected) {
        console.log('The client is connected')
      }
    })
    this.socket.on(this.USER_CONNECTED, (data: any) => {
      console.log('listen user connection')
      console.log(data)
    })
    this.socket.on(this.WAITING_USERS_LIST, (data: any) => {
      console.log('waiting users list')
      console.log(data)
    })
    this.socket.on(this.MATCH_JOINED, (data: any) => {
      console.log('matches joined')
      console.log(data)
    })
    this.socket.on(this.MATCH_JOIN_CANCELLED, (data: any) => {
      console.log('matches join cancelled')
      console.log(data)
    })
    this.socket.on(this.MATCH_STARTED, (data: any) => {
      console.log('matches started')
      console.log(data)
    })
    this.socket.on(this.MATCH_CANCELLED, (data: any) => {
      console.log('matches cancelled')
      console.log(data)
    })
    this.socket.on(this.BLUFF_RATES, (data: any) => {
      console.log('bluff Rates')
      console.log(data)
    })
    this.socket.on(this.DISCONNECT, () => {
      console.log('The client is disconnect')
    })
    this.socket.on(this.CONNECTION_ERROR, (err) => {
      console.log(err)
    })
    this.socket.on(this.GENERAL_ERROR, (err) => {
      console.log(err)
    })
  }

  start() {
    console.log('matches starting...')
    this.socket.emit(this.MATCH_START, {
      eventId: 'abbdc8b6-d85e-425c-997e-9ffbfbb454c9',
    })
  }

  cancel() {
    console.log('matches cancel...')
    this.socket.emit(this.MATCH_CANCEL, {
      eventId: 'abbdc8b6-d85e-425c-997e-9ffbfbb454c9',
      userId: 1,
    })
  }

  join() {
    console.log('matches join...')
    this.socket.emit(this.MATCH_JOIN, {
      eventId: 'abbdc8b6-d85e-425c-997e-9ffbfbb454c9',
      matchId: 6,
    })
  }

  joinCancel() {
    console.log('matches join cancel...')
    this.socket.emit(this.MATCH_JOIN_CANCEL, {
      eventId: 'abbdc8b6-d85e-425c-997e-9ffbfbb454c9',
      matchId: 6,
      userId: 1,
    })
  }

  bluffRates() {
    console.log('bluff Rates...')
    this.socket.emit(this.BLUFF_RATE, {
      page: 1, // optional
      limit: 10, // optional
      eventId: 1, // Required
    })
  }
}
</script>
