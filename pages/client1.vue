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
              v-model.number="userId"
              label="User Id"
            ></v-text-field>
            <v-text-field
              v-model.number="duration"
              label="Duration"
            ></v-text-field>
          </v-form>
          <v-radio-group v-model="itemId">
            <v-radio
              v-for="n in itemList.items"
              :key="n.id"
              :label="`${n.title}(${percentage})`"
              :value="n.id"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="joinFree"> Join Free </v-btn>
          <v-btn color="primary" @click="bluffRates"> IS Bluff </v-btn>
          <!--<v-btn color="primary" @click="start"> March Start </v-btn>-->
          <v-btn color="primary" @click="cancel"> March Cancel </v-btn>
          <v-btn color="primary" @click="join"> March Join </v-btn>
          <v-btn color="primary" @click="joinCancel"> March Join Cancel </v-btn>
          <v-btn color="primary" @click="getDuration"> Duration </v-btn>
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
  // Tona MB
  IS_USERID = true
  userId = 5
  eventId = '1'
  itemList = {
    items: [],
  }

  get accessToken() {
    // return this.$config.tokenClient1
    return '5'
  }

  async mounted() {
    this.connectSocket()
    this.getAllListenEventOnSocket()
    const apiKey = this.$config.apiKey
    const { data } = await this.$axios.get('freeSelectItemList', {
      headers: { 'x-api-key': apiKey, accept: 'application/json;api.v=1' },
    })
    this.itemList = data.data
    const { round } = data.data
    this.round = round
    console.info(this.itemList)
    this.socket.on(this.BLUFF_RATES, (data: any) => {
      console.log('bluff Rates #2')
      console.log(data)
      const { rate } = data.data
      this.percentage = `${rate}%`
    })
  }
}
</script>
