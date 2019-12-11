<template>
  <v-app-bar v-if="currentUser" dark app fixed color="#008b8b">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title class="white--text pl-0">Pushbots</v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      prepend-inner-icon="search"
      label="Search your apps"
      class="hidden-sm-and-down mx-5"
      hide-details
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn text>
      <v-icon>mdi-account-group</v-icon>
      <span class="subheading white--text">{{ currentUser.totalDevices }}</span>
    </v-btn>
    <v-btn text>
      <v-icon>apps</v-icon>
      <span class="subheading white--text">{{ currentUser.totalApps }}</span>
    </v-btn>
    <div class="hidden-xs-only mx-3">
      <v-layout column>
        <v-flex>
          <span class="subheading white--text">{{ currentUser.name }}</span>
        </v-flex>
        <v-flex>
          <v-chip small>
            <v-icon small class="pr-1">mdi-crown</v-icon>
            {{ currentUser.plan }}
          </v-chip>
        </v-flex>
      </v-layout>
    </div>
    <v-btn icon large>
      <v-avatar size="32px">
        <img :src="currentUser.avatar" />
      </v-avatar>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>
            <v-icon>exit_to_app</v-icon>
            Logout
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
