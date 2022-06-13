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
              <v-list-item-title v-for="user in users" :key="user.id">
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
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="joinFree"> Join Free </v-btn>
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
  // Mango one
  IS_USERID = true
  userId = 4
  eventId = '1'

  get accessToken() {
    // return this.$config.tokenClient2
    return '4'
  }

  async mounted() {
    this.connectSocket()
    this.getAllListenEventOnSocket()
    const { round, items } = await this.$store.dispatch('item/getItemList')
    this.round = round
    console.info(items)
  }
}
</script>
