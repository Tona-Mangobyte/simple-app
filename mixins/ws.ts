import { Component, Vue } from 'nuxt-property-decorator'
import { io, Socket } from 'socket.io-client'

@Component
export default class extends Vue {
  IS_USERID = false
  // SOCKET REQUEST EVENT
  MATCH_START = '1'
  MATCH_CANCEL = '2'
  MATCH_JOIN = '4'
  MATCH_JOIN_CANCEL = '3'
  BLUFF_RATE = '5'
  JOIN_MATCH_ROOM = '6'
  LEAVE_MATCH_ROOM = '7'
  DURATION_MATCH_ROOM = '8'
  QUICK_MATCH_ROOM = '9'
  GAME_FREE_JOIN = '10'

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
  LISTEN_DURATION_MATCH_ROOM = '15'
  STARTED_QUICK_IN_MATCH_ROOM = '16'
  RESULT_MATCH_ROUND = '17'

  // SOCKET LISTEN ERROR
  CONNECTION_ERROR = 'connect_error'
  GENERAL_ERROR = 'error'

  socket!: Socket
  isConnect = false

  percentage = '0%'

  // Token Access API
  get accessToken(): string {
    throw new Error('access token api is required')
  }

  get itemList() {
    return this.$store.getters['item/allItems']
  }

  // duration time counter
  duration = 30
  counter = 0
  quick = { type: 'TEXT', items: [] }

  // users in waiting room
  users = []

  connectSocket() {
    try {
      this.socket = io('http://34.85.34.129:238', {
        path: '/minority.game/',
        transports: ['polling'],
        auth: {
          token: this.IS_USERID
            ? this.accessToken
            : `Bearer ${this.accessToken}`,
        },
      })
    } catch (e) {
      console.info('======================')
      console.error(e)
    }
  }

  get getConnectionState() {
    return this.isConnect ? 'Disconnect' : 'Connect'
  }

  getAllListenEventOnSocket() {
    this.socket.on(this.CONNECTION, (socket) => {
      if (this.socket.connected) {
        console.log('The client is connected')
        this.isConnect = true
      }
      console.info(this.socket)
      console.info(socket)
    })
    this.socket.on(this.USER_CONNECTED, (data: any) => {
      console.log('listen user connection')
      console.log(data)
      this.isConnect = false
    })
    this.socket.on(this.WAITING_USERS_LIST, (resp: any) => {
      console.log('waiting users list')
      console.log(resp)
      this.users = resp.data
    })
    this.socket.on(this.MATCH_JOINED, (resp: any) => {
      console.log('matches joined')
      console.log(resp)
      this.users = resp.data
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
      const { rate, selectedItem } = data.data
      const { itemId } = selectedItem
      /* const index = this.itemList.findIndex((item: any) => item.id === itemId)
      const item: any = this.itemList[index]
      item.percentage = `${rate}%` */
      this.$store.dispatch('item/updatePercentage', { itemId, rate })
    })
    this.socket.on(this.LISTEN_DURATION_MATCH_ROOM, (resp: any) => {
      this.counter = resp.data.duration
    })
    this.socket.on(this.STARTED_QUICK_IN_MATCH_ROOM, (resp: any) => {
      console.log('the quick started')
      console.log(resp)
      this.quick = resp.data.quick
    })
    this.socket.on(this.RESULT_MATCH_ROUND, (result: any) => {
      console.log('Result match in round')
      console.log(result)
    })
    this.socket.on(this.DISCONNECT, () => {
      console.log('The client is disconnect')
    })
    this.socket.on(this.CONNECTION_ERROR, (err) => {
      console.info('CONNECTION_ERROR')
      console.log(err)
    })
    this.socket.on(this.GENERAL_ERROR, (err) => {
      console.info('GENERAL_ERROR')
      console.log(err)
    })
  }

  // Emit Event to Socket Server

  // Params
  eventId = ''
  userId = 0
  matchId = 0
  itemId = 0
  round = 0

  start() {
    console.log('matches starting...')
    const data = `{ "eventId": "${this.eventId}" }`
    this.socket.emit(this.MATCH_START, data)
  }

  cancel() {
    console.log('matches cancel...')
    const data = `{ "eventId": "${this.eventId}", "userId": ${this.userId} }`
    this.socket.emit(this.MATCH_CANCEL, data)
  }

  join() {
    console.log('matches join...')
    const data = `{ "eventId": "${this.eventId}", "userId": ${this.userId} }`
    this.socket.emit(this.MATCH_JOIN, data)
  }

  joinFree() {
    console.log('Game Free join...')
    const data = `{ "eventId": 1}`
    this.socket.emit(this.GAME_FREE_JOIN, data, (result: any) => {
      console.log('Game Free joined')
      console.info(result)
    })
    console.log('start duration match...')
    const dataDuration = `{ "eventId": "${this.eventId}", "duration": 60, "round": ${this.round} }`
    this.socket.emit(this.DURATION_MATCH_ROOM, dataDuration)
  }

  joinCancel() {
    console.log('matches join cancel...')
    const data = `{ "eventId": "${this.eventId}", "matchId": "${this.matchId}", "userId": ${this.userId} }`
    this.socket.emit(this.MATCH_JOIN_CANCEL, data)
  }

  bluffRates() {
    console.log('bluff Rates...')
    const isBluff = true
    const data = `{ "eventId": ${this.eventId}, "itemId": ${this.itemId}, "userId": ${this.userId}, "round": ${this.round}, "isBluff": ${isBluff} }`
    this.socket.emit(this.BLUFF_RATE, data, (result: any) => {
      console.log('is bluff success')
      console.info(result)
      const { rate, selectedItem } = result.data
      const { itemId } = selectedItem
      this.$store.dispatch('item/updatePercentage', { itemId, rate })
    })
  }

  onSelect() {
    console.log('select item...')
    const data = `{ "eventId": ${this.eventId}, "itemId": ${this.itemId}, "userId": ${this.userId}, "round": ${this.round}, "isBluff": false }`
    this.socket.emit(this.BLUFF_RATE, data, (result: any) => {
      console.log('select item success')
      console.info(result)
    })
  }

  getDuration() {
    console.log('start duration match...')
    const data = `{ "eventId": "${this.eventId}", "duration": ${this.duration}, "round": 1 }`
    this.socket.emit(this.DURATION_MATCH_ROOM, data)
  }

  addUserToRoom() {
    const data = `{ "eventId": "${this.eventId}" }`
    this.socket.emit(this.JOIN_MATCH_ROOM, data)
  }

  leaveUserFromRoom() {
    const data = `{ "eventId": "${this.eventId}" }`
    this.socket.emit(this.LEAVE_MATCH_ROOM, data)
  }
}
