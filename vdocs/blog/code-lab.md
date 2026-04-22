# Pattern 代码示例集

以下代码来自 `pattern/` 目录，作为文章配套实验材料。

## `mediator.js`

```js
// simple implement
var mediator = (function () {
  var topics = {}

  var subscribe = function (topic, fn) {
    if (!topics[topic]) topics[topic] = []
    topics[topic].push({ context: this, callback: fn })
    return this
  }

  var publish = function (topic) {
    if (!topics[topic]) return false
    var args = Array.prototype.slice.call(arguments, 1)
    for (var i = 0; i < topics[topic].length; i++) {
      var subscriber = topics[topic][i]
      subscriber.callback.apply(subscriber.context, args)
    }
    return this
  }

  return { subscribe: subscribe, publish: publish }
})()
```

## `Publish.js`

```js
var pubsub = {}
;(function (myObject) {
  var topics = {}
  var subscribeId = 0

  myObject.subscribe = function (topic, func) {
    if (!topics[topic]) topics[topic] = []
    var token = (++subscribeId).toString()
    topics[topic].push({ func: func, token: token })
    return token
  }

  myObject.Publish = function (topic, args) {
    var targetSubscribers = topics[topic] || []
    for (var i = 0; i < targetSubscribers.length; i++) {
      targetSubscribers[i].func(args)
    }
    return this
  }
})(pubsub)
```

## `Observer.html`

```html
<input type="checkbox" id="mainCheckbox" />
<button id="addNewObserver">添加监听器</button>
<div id="observersContainer"></div>
```

可在本地打开 `pattern/Observer.html` 体验动态新增观察者。
