<template>
  <div>
    <!-- Apps -->
    <v-container fluid grid-list-sm>
      <v-layout row wrap justify-center>
        <v-pagination
          v-model="page"
          :length="totalPages"
          total-visible="6"
          circle
          @input="fetchApps()"
        ></v-pagination>
        <v-flex v-if="loading" id="loader" class="text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="#008b8b"
            style="max-width: 50%"
            indeterminate
          ></v-progress-circular>
        </v-flex>
        <v-flex v-for="app in apps" v-else :key="app.id" xs12 md12 lg6>
          <AppCard :app="app" />
        </v-flex>
        <v-pagination
          v-model="page"
          :length="totalPages"
          total-visible="6"
          circle
          @input="fetchApps()"
        ></v-pagination>
      </v-layout>
    </v-container>
    <!-- ./Apps -->
  </div>
</template>

<script>
import cookies from 'js-cookie'
import AppCard from '~/components/AppCard'

export default {
  components: {
    AppCard
  },
  data() {
    return {
      apps: [],
      loading: false,
      total: 0,
      page: 1,
      take: 10
    }
  },
  computed: {
    totalPages() {
      return this.total / this.take
    },
    skip() {
      return (this.page - 1) * this.take
    }
  },
  mounted() {
    this.fetchApps()
  },
  methods: {
    fetchApps() {
      this.loading = true
      const token = cookies.get('token')
      const URL = `api/apps?take=${this.take}&skip=${this.skip}&sortBy=title&direction=asc`
      this.$axios({
        method: 'get',
        url: URL,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          this.apps = response.data.data
          this.total = response.data.total
        })
        .catch(() => {
          this.toast.error('Error while fetching apps.')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
#loader {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
