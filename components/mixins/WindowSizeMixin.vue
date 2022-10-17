<script>
export default {
  data() {
    return {
      windowHeight: null,
      windowWidth: null,
    }
  },

  computed: {
    isMobile() {
      return this.windowWidth < 992
    },
  },

  mounted() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize() {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
    },
  },
}
</script>
