export default {
  // 防抖
  Debounce: function (fn, delay) {
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

  // 节流
  Throttle: function (fn, delay) {
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
  },

  // 随机数
  getRandom: function (min, max, n) {
    var arr = []
    var random = 0
    for (var i = 0; i < n; i++) {
      random = Math.random() * (max - min) + min
      random = Math.floor(random)
      if (arr.indexOf(random) !== -1) {
        i--
        continue
      }
      arr.push(random)
    }
    return arr
  }
}
