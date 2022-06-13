<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">
          Demo Minority Game Free | Counter {{ counter }}
        </v-card-title>
        <v-card-text>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-for="(user, index) in users" :key="index">
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
  </v-row>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ws from '~/mixins/ws'

@Component
export default class extends mixins(ws) {
  // Mango one Admin
  IS_USERID = true
  userId = 2
  eventId = '1'

  get accessToken() {
    // return this.$config.tokenClient
    return '2'
  }

  async mounted() {
    this.connectSocket()
    this.getAllListenEventOnSocket()
    /* const apiKey = this.$config.apiKey
    const { data } = await this.$axios.get('freeSelectItemList', {
      headers: { 'x-api-key': apiKey, accept: 'application/json;api.v=1' },
    })
    const { round, items } = data.data
    this.round = round
    this.itemList = items.map((item: any) => {
      item.percentage = '0%'
      return item
    })
    console.info(this.itemList)
    console.info(this.round) */
    /* this.socket.on(this.BLUFF_RATES, (data: any) => {
      console.log('bluff Rates #2')
      const { rate, selectedItem } = data.data
      const { itemId } = selectedItem
      const index = this.itemList.findIndex((item: any) => item.id === itemId)
      const item: any = this.itemList[index]
      item.percentage = `${rate}%`
    }) */
    const { round, items } = await this.$store.dispatch('item/getItemList')
    this.round = round
    console.info(items)
  }
}
</script>
