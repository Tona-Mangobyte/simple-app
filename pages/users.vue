<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">
          Fetch data from Dormie Site</v-card-title
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Users extends Vue {
  mounted() {
    console.log(this.$config)
    const apiKey = this.$config.apiKey
    console.log('fetch data from dormie site')
    // /v1/admin/config?limit=-1&page=1
    // /news?page=1&limit=3&sort=publishedAt&direction=DESC
    // /news?page=1&limit=10&postedAt=2022-02-09T03:34:58.000Z
    this.$axios
      .get('news?page=1&limit=3&sort=publishedAt&direction=DESC', {
        headers: {
          'x-api-key': apiKey,
        },
        // withCredentials: true,
        // mode: 'no-cors',
        // credentials: 'same-origin',
        // crossdomain: true,
      })
      .then(function (response) {
        // handle success
        console.log(response)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }
}
</script>
