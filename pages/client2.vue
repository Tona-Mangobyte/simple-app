<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Welcome to Minority Game </v-card-title>
        <v-card-text>
          <p>Welcome client 2</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { io } from 'socket.io-client'
export default {
  mounted() {
    console.log('================Mount================')
    const socket = io('http://localhost:9000', {
      path: '/minority.game/',
      auth: {
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyand0IjoiMTpmZTJlMTBjMC03NDQ1LTExZWMtOTI0Ni1iNWFmNWM1YjdmMTkiLCJkYXRhVG9rZW4iOnsiaWQiOjEsInBsYXRmb3JtVUlEIjoiMiJ9LCJpYXQiOjE2NDIwNjA0NTAsImV4cCI6MTY0MjE0Njg1MH0.Et7rpfV-MSwaFCC1PHSYcWWgBKNVIGcYyskDeFLVCqY',
      },
    })
    // client-side

    // eslint-disable-next-line require-await
    socket.on('connect', async () => {
      // const engine = socket.io.engine.
      if (socket.connected) {
        console.log('The client has connected')
        console.log(socket)
        console.log(socket.id)
        socket.on(socket.id, (data) => {
          console.log('listen user re')
          console.log(data)
        })
      }
    })
    socket.on('0', (data) => {
      console.log(data)
    })
    socket.on('13', (data) => {
      console.log('waiting users list')
      console.log(data)
    })
    socket.on('disconnect', () => {
      console.log(socket.id) // undefined
    })
    socket.on('connect_error', (err) => {
      console.log(err)
    })
    socket.on('error', (err) => {
      console.log(err)
    })
  },
}
</script>
