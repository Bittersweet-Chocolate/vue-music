export default {
  debounce: function (fn, delay) {
    let timer = null
    return function () {
      clearTimeout(timer)
      const context = this
      const args = arguments
      timer = setTimeout(_ => {
        fn.apply(context, args)
      }, delay)
    }
  },

  throttle: function (fn, delay) {
    let timer = null
    let flag = false
    return function () {
      if (flag) return
      clearTimeout(timer)
      flag = true
      const context = this
      const args = arguments
      timer = setTimeout(_ => {
        flag = false
        fn.apply(context, args)
      }, delay)
    }
  }
}
