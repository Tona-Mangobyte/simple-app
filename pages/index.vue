<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Welcome to Minority Game </v-card-title>
        <v-card-text>
          <p>Some handlers in matches</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="start"> March Start </v-btn>
          <v-btn color="primary" @click="cancel"> March Cancel </v-btn>
          <v-btn color="primary" @click="joinCancel"> March Join Cancel </v-btn>
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
  socket!: Socket
  mounted() {
    console.log('====mounted========')
    this.socket = io('http://localhost:9000', {
      path: '/minority.game/',
      auth: {
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyand0IjoiMjpkZmQ0Mjg4MC03NTFjLTExZWMtOGU0OC1kOWMzZjhiOGU1NmUiLCJkYXRhVG9rZW4iOnsiaWQiOjIsInBsYXRmb3JtVUlEIjoiMSJ9LCJpYXQiOjE2NDIxNTI3NDEsImV4cCI6MTY0MjIzOTE0MX0.l9ui_X7Zu-_TreClQdQ0u15l9-RUhgKreLCcrHO7r1U',
      },
    })
    // client-side
    this.socket.on('connect', () => {
      if (this.socket.connected) {
        console.log('The client is connected')
      }
    })
    this.socket.on('0', (data: any) => {
      console.log('listen user connection')
      console.log(data)
    })
    this.socket.on('13', (data: any) => {
      console.log('waiting users list')
      console.log(data)
    })
    this.socket.on('3', (data: any) => {
      console.log('matches join cancelled')
      console.log(data)
    })
    this.socket.on('4', (data: any) => {
      console.log('matches started')
      console.log(data)
    })
    this.socket.on('5', (data: any) => {
      console.log('matches cancelled')
      console.log(data)
    })
    this.socket.on('disconnect', () => {
      console.log('The client is disconnect')
    })
    this.socket.on('connect_error', (err) => {
      console.log(err)
    })
    this.socket.on('error', (err) => {
      console.log(err)
    })
  }

  start() {
    console.log('matches starting...')
  }

  cancel() {
    console.log('matches cancel...')
    this.socket.emit('2', {
      eventId: '26cffccf-2d77-4f99-8640-08ce63a7df93',
      userId: 2,
    })
  }

  joinCancel() {
    console.log('matches join cancel...')
  }
}
</script>
