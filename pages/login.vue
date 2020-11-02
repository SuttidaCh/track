<template>
  <v-container>
    <v-row justify="center"
      ><v-col md="8">
        <v-card>
          <div class="text-center">
            <br />
            <h1>Login</h1>
          </div>
          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid">
                <v-row>
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
        </v-card></v-col
      ></v-row
    >
  </v-container>
</template>
<script>
import firebase from 'firebase/app'
import { store } from '~/store/index'
import { db, auth } from '~/plugins/firebaseConfig.js'

export default {
  data() {
    return {
      show: false,
      valid: false,
      email: '',
      password: '',
      user: null,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'Password is required'],
      show1: false,
      error: null,
    }
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
  },
}
</script>
