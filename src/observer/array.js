let oldArrayMethods = Array.prototype

export let arrayMethods = Object.create(oldArrayMethods)

const methods = [
  'push',
  'shift',
  'unshift',
  'pop',
  'sort',
  'splice',
  'reverse'
]

methods.forEach(method => {
  arrayMethods[method] = function(...args){
    const result = oldArrayMethods[method].apply(this, args)

    let inserted // 插入的元素

    switch (method) {
      case 'push':
        console.log('push被调用了')
        inserted = args
        break;
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
        break
      default:
        break;
    }
    if(inserted){
      this.__ob__.observerArray(inserted)
      console.log(this)
    }
    return result
  }
})