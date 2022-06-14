import { io, Socket } from 'socket.io-client'

export class SocketProvider {
  socket!: Socket
  apiUrl!: string

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

  isConnect = false

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
    // init listen ws
    this.getAllListenEventOnSocket()
  }

  connectSocket(accessToken: string) {
    try {
      this.socket = io(this.apiUrl, {
        path: '/minority.game/',
        transports: ['polling'],
        auth: {
          token: accessToken,
        },
      })
    } catch (e) {
      console.info('======================')
      console.error(e)
    }
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
      // this.users = resp.data
    })
    this.socket.on(this.MATCH_JOINED, (resp: any) => {
      console.log('matches joined')
      console.log(resp)
      // this.users = resp.data
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
    this.socket.on(this.BLUFF_RATES, async (data: any) => {
      console.log('bluff Rates')
      console.log(data)
      const { rate, selectedItem } = data.data
      const { itemId } = selectedItem
      await window.$nuxt.$store.dispatch('item/updatePercentage', {
        itemId,
        rate,
      })
    })
    this.socket.on(this.LISTEN_DURATION_MATCH_ROOM, (resp: any) => {
      console.info(resp.data.duration)
      // this.counter = resp.data.duration
    })
    this.socket.on(this.STARTED_QUICK_IN_MATCH_ROOM, (resp: any) => {
      console.log('the quick started')
      console.log(resp)
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
}
