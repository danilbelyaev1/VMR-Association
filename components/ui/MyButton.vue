<template>
  <button
    v-bind="$attrs"
    :class="{ btn: !disableRootClasses }"
    :disabled="disabled || loader"
    v-on="inputListeners"
  >
    <template v-if="loader">
      <b-spinner small></b-spinner>
    </template>
    <slot v-else name="button:text">
      <span>{{ text }}</span>
    </slot>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    text: {
      type: String,
      default: 'Отправить',
    },
    loader: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disableRootClasses: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputListeners() {
      return Object.assign({}, this.$listeners)
    },
  },
}
</script>

<style scoped></style>
