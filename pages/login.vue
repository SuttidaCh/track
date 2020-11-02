<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="11" sm="6" md="4">
          <v-card min-height="400" elevation="0" class="grey">
            <v-toolbar flat height="200" color="grey"> </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      class="mx-4 grey"
                      required
                      solo
                      value
                      autofocus
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="show1 ? 'text' : 'password'"
                      label="Password"
                      class="mx-4 grey"
                      solo
                      required
                      @click:append="show1 = !show1"
                    >
                    </v-text-field>
                    <v-row justify="center">
                      <v-btn :disabled="!valid" @click="login">Login</v-btn>
                    </v-row>
                    <div v-if="error" class="alert alert-danger">
                      {{ error }}
                    </div>
                    <br />
                    <v-row justify="center">
                      <nuxt-link :to="{ name: 'register' }"> </nuxt-link>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import { store } from '~/store/index'
import { db, auth } from '~/plugins/firebaseConfig.js'

export default {
  data() {
    return {
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
        })
    },
  },
}
</script>
