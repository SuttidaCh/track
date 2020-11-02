<template>
  <v-card>
    <v-card-title>
      รายงานสรุปบัญชีรายรับ
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
        { text: 'เลขที่ใบเสร็จ', value: 'receipt' },
        { text: 'ชื่อ-สกุล', value: 'name' },
        { text: 'วันที่ทำรายการ', value: 'date' },
        { text: 'จำนวนเงินทั้งหมด', value: 'total' },
        { text: 'ยอดการบริการ', value: 'service' },
      ],
      textList: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
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
