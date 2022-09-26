export default {
  install: function (Vue, option) {
    Vue.directive('title', {
      inserted: function (el, binding) {
        document.title = binding.value
      }
    })
  }
}
