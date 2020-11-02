<template>
  <v-app dark>
    <!--แถบข้าง-->
    <v-navigation-drawer
      v-if="this.$store.state.isLoggedIn == true"
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
      color="#F4D03F"
    >
      <v-list
        ><v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              <v-body>
                <v-row justify="center">
                  {{ this.$store.state.currentuser.firstname }}
                  {{ this.$store.state.currentuser.lastname }}
                </v-row>
              </v-body>
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-row justify="center">
                {{ this.$store.state.currentuser.email }}
              </v-row>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--แถบบนมือถือ-->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn text @click.stop="drawer = !drawer"
        ><v-toolbar-title v-text="title"
      /></v-btn>
      <v-row justify="end">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark v-bind="attrs" v-on="on">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <!--login-->
            <v-list v-if="this.$store.state.isLoggedIn == true">
              <v-list nav dense>
                <v-list-item link nuxt to="/">
                  <v-list-item-icon>
                    <v-icon>mdi-qrcode-scan</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-list>
            <!--notlogin-->
            <v-list v-else>
              <v-list nav dense>
                <v-list-item link nuxt to="/track">
                  <v-list-item-icon>
                    <v-icon>mdi-qrcode-scan</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>track</v-list-item-title>
                </v-list-item>
                <v-list-item link nuxt to="/login">
                  <v-list-item-icon>
                    <v-icon>mdi-login</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Login</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-list>
          </v-list>
        </v-menu>
      </v-row>
    </v-app-bar>
    <!--แถบบนคอม-->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="#7B7D7D"
      class="hidden-sm-and-down"
    >
      <v-btn text @click.stop="drawer = !drawer"
        ><v-toolbar-title v-text="title"
      /></v-btn>
      <v-spacer />
      <v-spacer />
      <!--login-->
      <div
        v-if="this.$store.state.isLoggedIn == true"
        class="d-flex justify-center align-center"
      >
        <v-col>
          <v-btn @click.stop="drawer = !drawer" @click="main">HOME</v-btn>
        </v-col>
      </div>
      <!--notlogin-->
      <div v-else>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-1 col-" color="#F4D03F" to="/track">Track</v-btn>
            <v-btn class="ma-1 col-" color="#C62828" v-bind="attrs" v-on="on">
              Login
            </v-btn>
          </template>
          <v-card>
            <div class="text-center">
              <br />
              <h1>Login</h1>
            </div>
            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid">
                  <v-row>
                    <v-col cols="12" sm="6" md="4"> </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        :rules="passRules"
                        label="Password"
                        required
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn
                :disabled="!valid"
                color="blue darken-1"
                text
                @click="login(), (dialog = false)"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script>
import firebase from 'firebase/app'
import { store } from '~/store/index'
import { db, auth } from '~/plugins/firebaseConfig.js'

export default {
  data: () => {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-qrcode-scan',
          title: 'Tracking Number',
          to: '/track',
        },
        {
          icon: 'mdi-account',
          title: 'Service',
          to: '/customer',
        },
        {
          icon: 'mdi-account-edit',
          title: 'Sender List',
          to: '/listSender',
        },
        {
          icon: 'mdi-account-edit',
          title: 'Recipient List',
          to: '/listRecipient',
        },
        {
          icon: 'mdi-barcode-scan',
          title: 'Update Status',
          to: '/update',
        },
        {
          icon: 'mdi-folder',
          title: 'Summary report',
          to: '/summary',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Fast Tracking Service',
      show: false,
      valid: true,
      email: '',
      emailRules: [(v) => !!v || 'E-mail is required'],
      password: '',
      passRules: [(v) => !!v || 'Password is required'],
      dialog: false,
    }
  },
  created() {
    this.checkuser()
  },
  methods: {
    log() {
      this.login()
    },
    login() {
      this.$refs.form.validate()
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log('ล็อคอินสำเร็จ')
          const userId = firebase.auth().currentUser.uid
          db.collection('User')
            .doc(userId)
            .onSnapshot((querySnapshot) => {
              const data = []
              querySnapshot.forEach((doc) => {
                data.push(doc.data())
              })
              const userdata = data
              console.log(userdata)
              this.$store.dispatch('setUser', userdata)
            })
          this.dialogsucess = true
          this.$router.replace('/')
        })
        .catch((err) => {
          this.error = err.message
          alert('ไม่พบข้อมูล')
        })
    },
    checkuser() {
      const data = auth.onAuthStateChanged((user) => {
        if (user) {
          const userId = firebase.auth().currentUser.uid
          db.collection('User')
            .where('userId', '==', userId)
            .onSnapshot((querySnapshot) => {
              const data = []
              querySnapshot.forEach((doc) => {
                data.push(doc.data())
              })
              const userdata = data
              console.log(userdata)
              this.$store.dispatch('setUser', userdata)
            })
        }
      })
    },
    logout() {
      this.$store.dispatch('logout')
      this.rightDrawer = false
      auth
        .signOut()
        .then(() => {
          console.log('ออกจากระบบแล้ว')
          this.$router.replace('/')
        })
        .catch(function (error) {})
    },
    main() {
      this.$router.replace('/')
    },
  },
}
</script>
