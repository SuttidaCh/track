import Vuex from 'vuex'
const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      currentuser: [
        { firstname: '' },
        { lastname: '' },
        { email: '' },
        { username: '' },
        { userId: '' },
        { img: '' },
        { admin: null },
        { timestamp: '' },
        { bg: '' },
      ],
      isLoggedIn: false,
    }),
    getters: {
      currentuser: (state) => state.currentuser,
    },
    mutations: {
      logingIn: (state, { userdata }) => {
        state.isLoggedIn = true
        state.currentuser.firstname = userdata[0].firstname
        state.currentuser.lastname = userdata[0].lastname
        state.currentuser.email = userdata[0].email
        state.currentuser.username = userdata[0].username
        state.currentuser.userId = userdata[0].userId
        state.currentuser.img = userdata[0].img
        state.currentuser.admin = userdata[0].admin
        state.currentuser.timestamp = userdata[0].timestamp
        state.currentuser.Gender = userdata[0].Gender
        state.currentuser.bg = userdata[0].bg
      },
      logingOut: (state) => {
        state.isLoggedIn = false
        state.currentuser = [
          { firstname: '' },
          { lastname: '' },
          { email: '' },
          { username: '' },
          { userId: '' },
          { img: '' },
          { admin: null },
          { timestamp: '' },
          { bg: '' },
        ]
      },
    },
    actions: {
      async setUser({ commit }, userdata) {
        commit('logingIn', { userdata })
      },
      async logout({ commit }) {
        commit('logingOut')
      },
    },
  })
}
export default createStore
