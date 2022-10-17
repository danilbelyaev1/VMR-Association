<script>
export default {
  data() {
    return {
      errorMessage: null,
      errorTimeout: null,
    }
  },
  methods: {
    /**
     * Добавить текст ошибки
     * @param {string} text
     * @param {Object} [options]
     * @param {number} [options.timeout]
     */
    setErrorMessage(text, options) {
      clearTimeout(this.errorTimeout)
      this.errorMessage = text
      if (options?.timeout !== 0) {
        this.errorTimeout = setTimeout(
          () => (this.errorMessage = null),
          options?.timeout || 3000
        )
      }
    },

    /**
     * @param error
     * @param {Object} [observer]
     * @param {Object} [options]
     * @param {number} [options.timeout]
     */
    takeErrorResponseWithObserver(error, observer, options) {
      if (observer && error.response.status === 422) {
        const responseErrors = error.response.data.errors

        if (responseErrors.inn) {
          responseErrors.inn = responseErrors.inn.filter((item) => {
            return !responseErrors.name.includes(item)
          })
        }

        observer.setErrors(responseErrors)

        const responseKeys = Object.keys(responseErrors)
        const observerKeys = Object.keys(observer.fields)
        const fieldsThatNotInObserver = responseKeys.filter(
          (x) => !observerKeys.includes(x)
        )

        if (fieldsThatNotInObserver.length) {
          const errorMessage = Object.entries(responseErrors)
            .filter((item) => {
              return fieldsThatNotInObserver.includes(item[0])
            })
            .flatMap((item) => item[1])
            .join(', ')

          this.setErrorMessage(errorMessage, options)
        }
      } else {
        this.setErrorMessage(
          error?.response?.data?.message ||
            'Произошла ошибка, повторите запрос',
          options
        )
      }
    },
  },
}
</script>
