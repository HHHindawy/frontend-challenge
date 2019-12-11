<template>
  <div>
    <div id="left-background">
      <span class="title white--text ma-3 font-weight-bold">Pushbots</span>
    </div>
    <div id="right-background">
      <v-card id="login-form" flat width="400px">
        <v-card-title class="headline">
          Log into your account
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="login">
            <v-text-field v-model="email" label="Email" required />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            />
            <v-btn
              type="submit"
              :loading="loading"
              small
              block
              dark
              color="#008b8b"
            >
              Sign In
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: 'frontend@ninja.com',
      password: '12345',
      loading: false
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then((result) => {
          this.$router.push('/dashboard')
          this.toast.success(`Welcome back ${this.currentUser.name}`)
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.toast.error('Wrong email or password.')
          } else {
            this.toast.error('Error while authenticating.')
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
#left-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: #008b8b;
}

#right-background {
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: white;
}

#login-form {
  position: fixed;
  top: 25%;
  left: 60%;
}
</style>
