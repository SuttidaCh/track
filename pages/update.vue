<template>
  <v-card>
    <v-container>
      <v-form>
        <h1>Update Status</h1>
        <br />

        <v-data-table
          :headers="headers"
          :search="search"
          :items="textList"
          single-expand
          :expanded.sync="expanded"
          item-key="track"
          show-expand
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>อัปเดตสถานะพัสดุ</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>

              <v-dialog v-model="dialog" persistent max-width="500px">
                <v-card>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="8">
                          <v-select
                            v-model="editedItem.status"
                            :items="status"
                            label="สถานะ"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="8">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.date"
                                label="ปี/เดือน/วัน"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              ref="picker"
                              v-model="editedItem.date"
                              :max="new Date().toISOString().substr(0, 10)"
                              min="1950-01-01"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save()">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:expanded-item="{ item }">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <tr>
                {{
                  item.date
                }}
              </tr>
            </td>
            <td>
              <tr>
                {{
                  item.status[1]
                }}
              </tr>
              <tr>
                {{
                  item.status[2]
                }}
              </tr>
              <tr>
                {{
                  item.status[3]
                }}
              </tr>
              <tr>
                {{
                  item.status[4]
                }}
              </tr>
              <tr>
                {{
                  item.status[5]
                }}
              </tr>
            </td>

            <th></th>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    expanded: [],
    singleExpand: false,
    search: '',
    dialog: false,
    dialogDelete: false,
    menu: false,
    status: [
      'พัสดุถึงศูนย์คัดแยกสินค้า',
      'พัสดุออกจากศูนย์คัดแยกสินค้า',
      'พัสดุถึงสาขาปลายทาง',
      'พัสดุกำลังนำส่ง',
      'พัสดุจัดส่งเรียบร้อย',
    ],
    headers: [
      {
        text: 'หมายเลขติดตามพัสดุ',
        value: 'track',
        align: 'start',
        sortable: false,
      },
      { text: 'ชื่อ-สกุล', value: 're_name' },
      { text: 'ที่อยู่', value: 're_address' },
      { text: 'ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์', value: 're_exstates' },
      { text: 'วันที่ทำรายการ', value: 'date' },
      { text: 'สถานะ', value: 'status[0]' },
      { text: 'Actions', value: 'actions' },
      { text: '', value: 'data-table-expand', sortable: false },
    ],
    textList: [],
    editedIndex: -1,
    editedItem: {
      date: '',
      status: '',
      track: '',
    },
    defaultItem: {
      date: '',
      status: '',
    },
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.getData()
  },

  methods: {
    saveDate(date) {
      this.$refs.menu.save(date)
    },
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
    editItem(item) {
      this.editedIndex = this.textList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.track = item.track
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.textList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.textList.splice(this.editedIndex, 1)
      this.closeDelete()
      db.collection('Recipient')
        .doc()
        .delete()
        .then(function () {
          console.log('Document successfully deleted!')
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      console.log(this.editedItem.track)
      db.collection('Recipient')
        .doc(this.editedItem.track)
        // .child('track')
        // .push(this.editedItem.status)
        .update({
          status: firebase.firestore.FieldValue.arrayUnion(
            this.editedItem.status
          ),
          date: this.editedItem.date,
        })
        .then(() => {
          console.log('Document successfully written! -> Update Status')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
      this.close()
    },
  },
}
</script>
