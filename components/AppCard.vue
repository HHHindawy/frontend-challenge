<template>
  <v-card class="ma-2">
    <v-card-title>
      <v-avatar v-if="app.icon" tile size="50px" class="ma-2">
        <img :src="app.icon" />
      </v-avatar>
      {{ app.title }}
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-share</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle>
      <v-icon>phone_iphone</v-icon>
      {{ formatNumber(app.totalUsers) }} users
      <v-icon v-if="app.platforms.ios">mdi-apple</v-icon>
      <v-icon v-if="app.platforms.android">mdi-android</v-icon>
      <v-icon v-if="app.platforms.chrome">mdi-google-chrome</v-icon>
      <v-icon v-if="app.platforms.firefox">mdi-firefox</v-icon>
      <v-icon v-if="app.platforms.opera">mdi-opera</v-icon>
      <v-icon v-if="app.platforms.safari">mdi-apple-safari</v-icon>
    </v-card-subtitle>

    <v-sparkline
      color="#0cb0b0"
      :value="!!app.chartData.length ? app.chartData : []"
      smooth="20"
      height="60"
      line-width="2"
      fill
      auto-draw
    ></v-sparkline>

    <v-card-text class="text-center">
      <v-icon color="#0cb0b0">mdi-square</v-icon>
      <span class="subtitle-2 font-weight-light">
        Daily Active Users
      </span>
    </v-card-text>

    <v-card-actions>
      <v-btn icon>
        <v-icon>mdi-telegram</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>replay</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>phone_iphone</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-chart-areaspline-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      required: true
    }
  }
}
</script>
