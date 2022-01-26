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
  JOIN_MATCH_ROOM = '6'
  LEAVE_MATCH_ROOM = '7'
  QUICK_MATCH_ROOM = '9'

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

  // SOCKET LISTEN ERROR
  CONNECTION_ERROR = 'connect_error'
  GENERAL_ERROR = 'error'

  socket!: Socket
  isConnect = false

  // Token Access API
  accessToken = ''

  // duration time counter
  duration = 30
  counter = 0
  quick = { type: 'TEXT', items: [] }

  // users in waiting room
  users = []

  connectSocket() {
    this.socket = io('http://localhost:9000', {
      path: '/minority.game/',
      transports: ['websocket'],
      auth: {
        token: `Bearer ${this.accessToken}`,
      },
    })
  }

  get getConnectionState() {
    return this.isConnect ? 'Disconnect' : 'Connect'
  }

  getAllListenEventOnSocket() {
    this.socket.on(this.CONNECTION, () => {
      if (this.socket.connected) {
        console.log('The client is connected')
        this.isConnect = true
      }
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
    })
    this.socket.on(this.LISTEN_DURATION_MATCH_ROOM, (resp: any) => {
      this.counter = resp.data.duration
    })
    this.socket.on(this.STARTED_QUICK_IN_MATCH_ROOM, (resp: any) => {
      console.log('the quick started')
      console.log(resp)
      this.quick = resp.data.quick
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

  // Emit Event to Socket Server

  // Params
  eventId = ''
  userId = 0
  matchId = 0

  start() {
    console.log('matches starting...')
    this.socket.emit(this.MATCH_START, {
      eventId: this.eventId,
    })
  }

  cancel() {
    console.log('matches cancel...')
    this.socket.emit(this.MATCH_CANCEL, {
      eventId: this.eventId,
      userId: this.userId,
    })
  }

  join() {
    console.log('matches join...')
    this.socket.emit(this.MATCH_JOIN, {
      eventId: this.eventId,
      matchId: this.matchId,
    })
  }

  joinCancel() {
    console.log('matches join cancel...')
    this.socket.emit(this.MATCH_JOIN_CANCEL, {
      eventId: this.eventId,
      matchId: this.matchId,
      userId: this.userId,
    })
  }

  bluffRates() {
    console.log('bluff Rates...')
    this.socket.emit(this.BLUFF_RATE, {
      page: 1, // optional
      limit: 10, // optional
      eventId: this.eventId, // Required
    })
  }

  getQuick() {
    console.log('start quick choose match...')
    this.socket.emit(this.QUICK_MATCH_ROOM, {
      eventId: this.eventId, // Required
      duration: this.duration, // sec
      round: 1,
    })
  }

  addUserToRoom() {
    this.socket.emit(this.JOIN_MATCH_ROOM, {
      eventId: this.eventId, // Required
    })
  }

  leaveUserFromRoom() {
    this.socket.emit(this.LEAVE_MATCH_ROOM, {
      eventId: this.eventId, // Required
    })
  }
}
