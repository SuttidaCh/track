<template>
  <v-card>
    <v-card-title>
      ข้อมูลผู้ส่ง
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table :headers="headers" :items="textList" :search="search">
      ></v-data-table
    >
  </v-card>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'หมายเลขติดตามพัสดุ', value: 'track' },
        { text: 'ชื่อ-สกุล', value: 'name' },
        { text: 'ที่อยู่', value: 'address' },
        { text: 'ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์', value: 'exstates' },
        { text: 'ติดต่อ', value: 'phone' },
        { text: 'วันที่ทำรายการ', value: 'date' },
        { text: 'รวมเป็นเงิน', value: 'cost' },
      ],
      textList: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    beforeCreate() {
      if (!firebase.auth().currentUser.uid) {
        console.log('No Login')
      } else {
        console.log('Login ok')
      }
    },
    getData() {
      db.collection('Sender')
        .orderBy('timestamp')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.textList = data
        })
    },
  },
}
</script>

<style></style>
