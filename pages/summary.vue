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

    <v-data-table
      :headers="headers"
      :items="textList"
      :search="search"
      item-key="cost"
    >
      <template slot="body.append">
        <tr>
          <td class="pink--text">Totals</td>
          <td></td>
          <td></td>
          <td class="pink--text">{{ sumField('cost') }}</td>
        </tr>
      </template>
    </v-data-table>
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
        { text: 'เลขที่ใบเสร็จ', value: 'Receiptnum' },
        { text: 'ชื่อ-สกุล', value: 'name' },
        { text: 'วันที่ทำรายการ', value: 'date' },
        { text: 'จำนวนเงินทั้งหมด', value: 'cost' },
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
    sumField(key) {
      // sum data in give key (property)
      return this.textList.reduce((a, b) => a + b[key], 0)
    },
  },
}
</script>

<style></style>
