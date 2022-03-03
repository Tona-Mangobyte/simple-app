<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline"> Welcome to Websocket </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SockJS from 'sockjs-client'
import * as stompjs from '@stomp/stompjs'

@Component
export default class ClientSpring extends Vue {
  mounted() {
    const sock = new SockJS('http://localhost:8080/chat/')
    console.log(sock)
    const stompClient = stompjs.Stomp.over(sock)
    console.log(stompClient)
    stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame)
      stompClient.subscribe('/topic/messages', function (messageOutput) {
        console.log(JSON.parse(messageOutput.body))
        // showMessageOutput(JSON.parse(messageOutput.body))
      })
    })
  }
}
</script>
