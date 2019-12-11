import Vue from 'vue'

Vue.mixin({
  computed: {
    currentUser() {
      return this.$store.state.user
    },
    toast() {
      const self = this
      return {
        success(message) {
          self.$store.commit({
            type: 'toast',
            message,
            color: 'green'
          })
        },
        error(message) {
          self.$store.commit({
            type: 'toast',
            message,
            color: 'red'
          })
        }
      }
    }
  },
  methods: {
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
})
