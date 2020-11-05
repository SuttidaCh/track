<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="8">
        <v-col justify="center" align="center">
          <h1 class="text-uppercase">📦Fast Access Transpotation Service 🚚</h1>
        </v-col>
      </v-col>
    </v-row>
    <br />
    <v-carousel v-model="model" cycle :show-arrows="false" max-width="50%">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <div class="container">
      <div class="text-center">
        <h2 class="section-heading">Services</h2>
      </div>
      <br />
      <div class="row text-center">
        <div class="col-md-4">
          <span class="mdi mdi-cart mdi-48px"></span>
          <h3 class="my-3">E-Commerce</h3>
        </div>
        <div class="col-md-4">
          <span class="mdi mdi-truck-fast mdi-48px"></span>
          <h3 class="my-3">fast service</h3>
        </div>
        <div class="col-md-4">
          <span class="mdi mdi-package-variant mdi-48px"></span>
          <h3 class="my-3">Service Rates</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          src:
            'https://i.pinimg.com/originals/37/f9/bc/37f9bc2f39015e5763835515b6b1f683.jpg',
        },
        {
          src:
            'https://i.pinimg.com/originals/b5/36/47/b536479e2f42856050e4291fd27e90b1.jpg',
        },
        {
          src:
            'https://i.pinimg.com/originals/30/41/23/304123ca5027f628a3eba6635afd763c.jpg',
        },
      ],
    }
  },
}
</script>
