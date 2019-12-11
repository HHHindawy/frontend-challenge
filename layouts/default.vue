<template>
  <v-app>
    <v-content>
      <!-- Toolbar -->
      <Toolbar v-if="currentUser" />
      <!-- ./Toolbar -->
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-snackbar
      v-model="$store.state.snackbar.shown"
      :timeout="0"
      :color="$store.state.snackbar.color"
    >
      {{ $store.state.snackbar.text }}
      <v-btn dark text @click.native="$store.commit('closeSnackBar')"
        >Close</v-btn
      >
    </v-snackbar>
  </v-app>
</template>

<script>
import Toolbar from '~/components/generic/Toolbar'
export default {
  components: {
    Toolbar
  }
}
</script>
