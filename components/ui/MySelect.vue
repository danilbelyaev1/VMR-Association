<template>
  <div v-click-outside="hide" class="select-default">
    <p v-if="label" class="label-name">{{ label }}</p>
    <p class="select-input" @click="toggle">
      {{ selected.name }}
      <svg
        :class="areOptionVisible ? 'to-bottom' : 'to-top'"
        width="8"
        height="7"
        viewBox="0 0 8 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.86603 6.5C4.48113 7.16667 3.51887 7.16667 3.13397 6.5L0.535898 2C0.150998 1.33333 0.632122 0.500001 1.40192 0.500001L6.59807 0.5C7.36788 0.5 7.849 1.33333 7.4641 2L4.86603 6.5Z"
          fill="white"
          fill-opacity="0.15"
        />
      </svg>
    </p>
    <transition name="options">
      <div v-if="areOptionVisible" class="options">
        <div v-if="searchable" class="searchable">
          <input v-model="searchValue" type="search" />
        </div>
        <div v-if="areOptionVisible" class="option-container">
          <p
            v-if="showEmpty"
            @click="selectOption({ id: null, name: 'Не выбрано' })"
          >
            Не выбрано
          </p>
          <p
            v-for="(option, idx) in filteredOptions"
            :key="idx"
            @click="selectOption(option)"
          >
            {{ option.name }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'MySelect',
  directives: {
    ClickOutside,
  },
  props: {
    options: {
      type: Array,
      default() {
        return []
      },
    },
    label: {
      type: String,
      default: '',
    },
    showEmpty: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Object,
      default: null,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      areOptionVisible: false,
      selected: this.value || { val: null, name: 'Не выбрано' },
      searchValue: '',
    }
  },
  computed: {
    filteredOptions() {
      return this.options.filter((option) => {
        return (
          typeof option.name !== 'string' ||
          option.name.toLowerCase().includes(this.searchValue.toLowerCase())
        )
      })
    },
  },
  methods: {
    hide() {
      this.searchValue = ''
      this.areOptionVisible = false
    },
    toggle() {
      this.areOptionVisible = !this.areOptionVisible
    },
    selectOption(option) {
      this.$emit('input', option)
      this.$emit('select', option)
      this.selected = option
      this.hide()
    },
  },
}
</script>

<style scoped>
.select-default {
  position: relative;
}

.select-input {
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-sizing: border-box;
  border-radius: 10px;
  padding: 15px;
  margin-top: 8px;
  position: relative;
}

.select-input svg {
  position: absolute;
  top: 44%;
  right: 15px;
}

.select-input svg.to-bottom {
  transform: rotate(180deg);
  transition: transform 0.2s;
}

.select-input svg.to-top {
  transform: rotate(0deg);
  transition: transform 0.2s;
}

.options {
  position: absolute;
  width: 100%;
  top: 70px;
  left: 0;
  opacity: 1;
  padding: 20px 15px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-top: none;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
  background-color: #343947;
  z-index: 300;
}

.option-container {
  height: 160px;
  width: 100%;
  overflow-y: scroll;
}

.options p {
  cursor: pointer;
  padding: 3px;
}

.options p:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.options-enter-active,
.options-leave-active {
  transition: opacity ease 0.2s;
}

.options-enter,
.options-leave-to {
  opacity: 0;
}
</style>
