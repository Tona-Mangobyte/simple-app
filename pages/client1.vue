<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">
          Demo Minority Game Free | Counter {{ counter }} | Total Player
          {{ totalPlayer }}
        </v-card-title>
        <v-card-text>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-for="user in users" :key="user.id">
                {{ user.gameUsername }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <!--<v-form ref="form" lazy-validation>
            <v-text-field v-model="eventId" label="Event Id"></v-text-field>
            <v-text-field
              v-model.number="userId"
              label="User Id"
            ></v-text-field>
            <v-text-field
              v-model.number="duration"
              label="Duration"
            ></v-text-field>
          </v-form>-->
          <v-radio-group v-model="itemId">
            <v-radio
              v-for="n in itemList"
              :key="n.id"
              :label="`${n.title}(${n.percentage})`"
              :value="n.id"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="joinFree"> Join Free </v-btn>
          <v-btn color="primary" @click="leaveFree"> leave Join Free </v-btn>
          <v-btn color="primary" @click="bluffRates"> IS Bluff </v-btn>
          <v-btn color="primary" @click="onSelect"> Select </v-btn>
          <!--<v-btn color="primary" @click="start"> March Start </v-btn>-->
          <!--<v-btn color="primary" @click="cancel"> March Cancel </v-btn>-->
          <!--<v-btn color="primary" @click="join"> March Join </v-btn>
          <v-btn color="primary" @click="joinCancel"> March Join Cancel </v-btn>
          <v-btn color="primary" @click="getDuration"> Duration </v-btn>
          <v-btn color="primary" @click="addUserToRoom">
            Add User(Join Already)
          </v-btn>
          <v-btn color="primary" @click="leaveUserFromRoom"> Leave User </v-btn>-->
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
  // Tona MB
  IS_USERID = true
  userId = 1
  eventId = '1'

  get accessToken() {
    // return this.$config.tokenClient1
    return '1'
  }

  async mounted() {
    this.connectSocket()
    this.getAllListenEventOnSocket()
    const { round, items } = await this.$store.dispatch('item/getItemList')
    this.round = round
    console.info(items)
  }

  leaveFree() {
    console.log('Game Free leave join...')
    const data = `{ "eventId": 1}`
    this.socket.emit(this.LEAVE_MATCH_ROOM, data)
    this.totalPlayer = 0
  }
}
</script>
