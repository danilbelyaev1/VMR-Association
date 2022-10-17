export default ({ $axios, store }) => {
  $axios.onError((error) => {
    if (error instanceof Error && error.message === 'Network Error') {
      store.dispatch('errors/serverError', {
        status: 0,
        message: 'Ошибка сети',
        showModal: true,
      })
    } else {
      const { status } = error.response

      const showModal = true
      if (status === 429) {
        store.dispatch('errors/serverError', {
          status,
          message: 'Слишком много запросов.',
          showModal,
        })
      }
    }
  })
}
