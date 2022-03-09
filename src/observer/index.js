import { arrayMethods } from './array.js'

class Observer {
  constructor(value){
    if(Array.isArray(value)) {
      value.__proto__ = arrayMethods
      Object.defineProperty(value, '__ob__', {
        enumerable: false,
        writable: false,
        value: this
      })
      this.observerArray(value)
    } else {
      this.walk(value)
    }
  }

  observerArray(value){
    value.forEach(it => {
      observe(it)
    })
  }

  walk(data){
    let keys = Object.keys(data)
    keys.forEach(key => {
      let val = data[key]
      defineReactive(data, key, val)
    })
  }
}

function defineReactive(data, key, val){
  observe(val)
  Object.defineProperty(data, key, {
    get(){
      return val
    },
    set(newVal){
      if(newVal === val) return
      observe(newVal)
      val = newVal
    }
  })
}
export function observe(data){
  if(typeof data === 'object' && data !== null){
    return new Observer(data)
  }

}