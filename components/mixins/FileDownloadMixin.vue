<script>
export default {
  methods: {
    forceFileDownload(response, title) {
      const url = window.URL.createObjectURL(new Blob([response]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', title)
      document.body.appendChild(link)
      link.click()
    },
  },
}
</script>
