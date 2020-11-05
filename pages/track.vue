<template>
  <div>
    <v-form ref="form" v-model="valid" @submit.prevent="search">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            :rules="searchRules"
            label="Tracking Number --->  TH ตามด้วยเลข10หลัก"
            append-icon="mdi-magnify"
            single-line
            hide-details
            required
          ></v-text-field>
        </v-card-title>

        <div class="text-center">
          <v-dialog v-model="dialog" persistent max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="!valid"
                color="#7B7D7D"
                v-bind="attrs"
                class="mr-2"
                :search="getData"
                @click="getData"
                v-on="on"
              >
                search
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline"> สถานะพัสดุ </v-card-title>

              <v-card>
                <v-card-text>
                  <v-data-table
                    :headers="headers"
                    :items="tracklist"
                    :search="search"
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card-text>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken" text @click="dialog = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card>
    </v-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data() {
    return {
      valid: true,
      dialog: false,
      search: '',
      track: [],
      searchRules: [
        (v) => !!v || 'Tracking is required',
        (v) =>
          (v && v.length >= 12 && v.length <= 12) ||
          'Tracking must be less than 12 characters',
      ],
      tracklist: [],
      headers: [
        { text: 'หมายเลขติดตามพัสดุ', value: 'track' },
        { text: 'ชื่อ-สกุล', value: 're_name' },
        { text: 'สถานะการจัดส่ง', value: 'status' },
      ],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    Submit() {
      this.$refs.form.Submit()
    },
    getData() {
      db.collection('Recipient')
        .orderBy('timestamp')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.tracklist = data
        })
    },
  },
}
</script>

<style></style>
