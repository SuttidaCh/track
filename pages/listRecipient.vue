<template>
  <v-card>
    <v-card-title>
      ข้อมูลผู้รับ
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="textList"
      :search="search"
    ></v-data-table>
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
        { text: 'ชื่อ-สกุล', value: 're_name' },
        { text: 'ที่อยู่', value: 're_address' },
        { text: 'ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์', value: 're_exstates' },
        { text: 'ติดต่อ', value: 're_phone' },
        { text: 'วันที่ทำรายการ', value: 'date' },
      ],
      textList: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      db.collection('Recipient')
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
