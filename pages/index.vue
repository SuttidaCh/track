<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-col justify="center" align="center">
          <h1 class="text-uppercase">Fast Tracking Service</h1>
        </v-col>
      </v-col>
    </v-row>
    <br />
    <v-carousel v-model="model" cycle :show-arrows="false">
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">Hello {{ slide }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
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
      colors: [
        '#FFD54F',
        '#F8BBD0',
        '#81C784',
        '#E59866',
        '#85C1E9',
        '#D2B4DE',
        '#E57373',
      ],
      slides: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  },
}
</script>
