# Observer 与 Publish/Subscribe

这篇内容整理自 `pattern/Publish.md`，并做了结构化精简。

## 核心差异

- Observer：观察者直接订阅目标对象，目标对象主动通知观察者。
- Publish/Subscribe：发布者和订阅者通过事件通道解耦，彼此不直接依赖。

## 为什么要用它

- 降低模块间耦合，事件驱动扩展成本低。
- 适合一个动作触发多个后续处理（日志、UI、统计）。

## 代价与风险

- 调用链变长，调试复杂度上升。
- 发布者通常不知道订阅者执行是否成功。

## 简化示例

```js
var pubsub = {}

;(function (myObject) {
  var topics = {}
  var subUid = -1

  myObject.publish = function (topic, args) {
    if (!topics[topic]) return false
    var subscribers = topics[topic]
    for (var i = subscribers.length - 1; i >= 0; i--) {
      subscribers[i].func(topic, args)
    }
    return this
  }

  myObject.subscribe = function (topic, func) {
    if (!topics[topic]) topics[topic] = []
    var token = (++subUid).toString()
    topics[topic].push({ token: token, func: func })
    return token
  }
})(pubsub)
```

## 阅读建议

先看 [中介者模式](/blog/mediator-pattern.html)，再对比两者“事件结构相似但意图不同”的部分，会更清晰。
