<template>
  <div>
    <v-select
      id="multiselect"
      :value="value"
      :placeholder="placeholder"
      :label="label"
      multiple
      :options="options"
      @input="change"
    />
  </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VSelectOpenIndicator from '~/components/ui/VSelectOpenIndicator'

vSelect.props.components.default = () => ({
  OpenIndicator: VSelectOpenIndicator,
})

export default {
  components: { vSelect },
  props: {
    options: {
      required: true,
      type: Array,
    },
    placeholder: {
      default: '',
      type: String,
    },
    label: {
      default: null,
      type: String,
    },
    value: {
      required: true,
      type: Array,
    },
  },
  methods: {
    change(v) {
      this.$emit('input', v)
    },
  },
}
</script>
<style>
.vs__selected {
  gap: 5px;
}
.vs__selected-options {
  padding: 7px;
}
.vs__dropdown-option--selected {
  color: #aaa;
  cursor: default;
}
.v-select {
  --vs-font-size: 14px;

  --vs-controls-color: #fff;
  --vs-border-color: rgba(255, 255, 255, 0.15);
  --vs-border-radius: 10px;

  --vs-line-height: 2;

  --vs-dropdown-bg: #343947;
  --vs-dropdown-color: #424754;
  --vs-dropdown-option-color: #fff;

  --vs-selected-bg: #424754;
  --vs-selected-color: #fff;

  --vs-search-input-color: #bcbcbc;

  --vs-dropdown-option--deselect-bg: #fb5858;
  --vs-dropdown-option--deselect-color: #fff;

  /* Dropdown */
  --vs-dropdown-z-index: 1000;
  --vs-dropdown-min-width: 160px;
  --vs-dropdown-max-height: 350px;
  --vs-dropdown-option-bg: #ef3636;
  --vs-dropdown-option-padding: 3px 20px;
  /* Active State */

  /* Deselect State */
  --vs-dropdown-option--deselect-bg: #fb5858;
  --vs-dropdown-option--deselect-color: #fff;

  --vs-dropdown-option--active-bg: #424754;
  --vs-dropdown-option--active-color: #eeeeee;

  --vs-actions-padding: 10px 15px;
}
</style>
