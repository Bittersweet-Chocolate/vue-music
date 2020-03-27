import { Toast } from 'mint-ui'
const utils = {
  // 防抖
  _debounce(fn, delay = 1000) {
    var timer
    return function () {
      var th = this
      var args = arguments
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        timer = null
        fn.apply(th, args)
      }, delay)
    }
  },
  // 节流
  _throttle(fn, interval = 1000) {
    let timer = null
    let flag = false
    return function () {
      if (flag) return
      clearTimeout(timer)
      const context = this
      const args = arguments
      timer = setTimeout(_ => {
        flag = false
        fn.apply(context, args)
      }, interval)
    }
  },

  // 随机数
  getRandom(min, max, n) {
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
  },
  getMore() {
    Toast({
      message: '还在开发ing',
      position: 'center',
      duration: 2000
    })
  }
}
export default utils
