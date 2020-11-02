<template>
  <v-container>
    <v-form ref="form" v-model="valid" @submit.prevent="search">
      <h1>Tracking Number</h1>
      <br />
      <div class="row md-5">
        <v-text-field
          v-model="track"
          :rules="trackRules"
          append-icon="mdi-magnify"
          label="Tracking Number --->  TH ตามด้วยเลข10หลัก"
          class="ma-3"
          solo
          required
        ></v-text-field>
      </div>
      <div class="text-center">
        <v-dialog v-model="dialog" persistent max-width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :disabled="!valid"
              color="#7B7D7D"
              v-bind="attrs"
              class="mr-2"
              :search="search"
              @click="search"
              v-on="on"
            >
              search
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline"> สถานะพัสดุ </v-card-title>
            <v-card-text
              ><v-stepper v-model="e13" vertical :search="search">
                <v-stepper-step step="1" complete>
                  พัสดุเข้าสู่ระบบ
                </v-stepper-step>
                <v-stepper-content step="1"> </v-stepper-content>

                <v-stepper-step step="1" complete>
                  พัสดุถึงศูนย์คัดแยกสินค้า
                </v-stepper-step>
                <v-stepper-content step="1"> </v-stepper-content>

                <v-stepper-step step="1" complete>
                  พัสดุออกจากศูนย์คัดแยกสินค้า
                </v-stepper-step>
                <v-stepper-content step="2"> </v-stepper-content>

                <v-stepper-step step="1" complete>
                  พัสดุถึงสาขาปลายทาง
                </v-stepper-step>
                <v-stepper-content step="1"> </v-stepper-content>

                <v-stepper-step step="4"> พัสดุกำลังนำส่ง </v-stepper-step>

                <v-stepper-content step="4">
                  <v-card
                    color="grey lighten-1"
                    class="mb-12"
                    height="200px"
                  ></v-card>
                  <v-btn color="primary" @click="e13 = 1"> Continue </v-btn>
                  <v-btn text> Cancel </v-btn>
                </v-stepper-content>
              </v-stepper></v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-form>
    <br />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      dialog: false,
      e13: 2,
      track: '',
      trackRules: [
        (v) => !!v || 'Tracking is required',
        (v) =>
          (v && v.length >= 12 && v.length <= 12) ||
          'Tracking must be less than 12 characters',
      ],
    }
  },
  methods: {
    search() {
      alert('ไม่พบข้อมูล')
    },
  },
}
</script>

<style></style>
