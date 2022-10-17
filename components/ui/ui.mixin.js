export default {
  props: {
    value: {},
    vid: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    mode: {
      type: String,
      default: 'eager',
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    errorName: {
      type: String,
      default: null,
    },
    rules: {
      type: [String, Object],
      default: null,
    },
    customMessages: {
      type: Object,
      default: null,
    },
    showErrorClass: {
      type: Boolean,
      default: true,
    },
    requiredStar: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'value',
  },
  computed: {
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: (event) => {
          if (this.type === 'file') {
            // eslint-disable-next-line no-console
            console.log('triggered')
            this.$emit('input', event.target.files[0])
          } else {
            this.$emit('input', event.target.value)
          }
        },
      })
    },
    labelOrPlaceholder() {
      return this.errorName || this.label || this.placeholder
    },
    vidOrName() {
      return this.vid || this.privateName
    },
    privateName() {
      if (this.name !== null) {
        return this.name
      }

      return (
        (this?.$vnode?.data?.model?.expression || '').split('.').pop() || null
      )
    },
    required() {
      if (typeof this.rules === 'string' && this.requiredStar) {
        return this.rules?.includes('required')
      }
      return false
    },
  },
}
