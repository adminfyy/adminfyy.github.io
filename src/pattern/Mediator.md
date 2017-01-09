## 中介者模式
在观察者模式的章节，我们了解了 通过单个对象实现多事件通信的方式。
这也就是我们常说的发布/订阅模式，或者说 Event Aggregation。开发者
遇到这种问题的时候经常想到的是中介者模式，这是正常的，所以接下来，
讨论一下他们的区别。

通过查阅字典，得知，中介者是这个意思： 
a neutral party that assists in negotiations and conflict resolution.。
一个解决冲突、协商的中间者。在我们的时候，中介者是一个行为设计模式。
这个设计我们允许我们定义一个统一的接口。系统的不同部分通信会调用到的。

如果一个系统的组件之间出来了太多的直接联系，这时候，你应该使用一个控制的
中心点取代。中介者降低了耦合性，他通过保证这种方式来实现，避免组件之间，
直接关联，它们的交互通过一个中心点，这可以帮助我们提高组件的复用性以及
系统的解耦。

现在世界中的类比，可能就是机场交通控制系统，一个塔控制飞机起飞和降落，
因为所有的通信都是飞机到塔的通信，而不是飞机之间的通信。这个集中化的控制器，
是这个系统成功的关键，这也是中介者在软件设计里面所定位的角色。

另外一个类比应该是，事件冒泡和事件委派。如果在整个系统中，所有的订阅者都是
依赖于document而不是独立的node，那么document就相当于一个中介者，取代于绑定于
单个节点的事件，一个更高界别的对象被当做为中介者，用于通知订阅者们交互相关的
事件。

当我们谈论到了中介者和EventAggregator模式，我们会感觉两者是可以互相替换的，因
为它们的实现看起来相似。然而，它们的语意和意图是非常不同的。

尽管两者的实现使用了相同的结构，我仍然相信，这这里面还有明显的不同之处。我相信，
在日常交流中，我们应该不能相互替换/或者说令人困惑。

### 一个简单的中介者模式

在 这里我们说，中介者是 用来协调不同对象之间逻辑和行为的一个对象。
它通过另外一个对象或者是外部输入来作出判断和什么时候调用另外一个对象。



你可以简单的写这样一个对象；

```
var mediator = {};

```

```
var orgChart = {
 
  addNewEmployee: function(){
 
    // getEmployeeDetail provides a view that users interact with
    var employeeDetail = this.getEmployeeDetail();
 
    // when the employee detail is complete, the mediator (the 'orgchart' object)
    // decides what should happen next
    employeeDetail.on("complete", function(employee){
 
      // set up additional objects that have additional events, which are used
      // by the mediator to do additional things
      var managerSelector = this.selectManager(employee);
      managerSelector.on("save", function(employee){
        employee.save();
      });
 
    });
  },
 
  // ...
}
```

这个例子演示了一个非常基础的中介者的实现，通过一个对象加上一些能够订阅事件和触发事件的工具方法。
过去，我常常用将这类型的对象当做“工作流”对象，但是，事实上这个叫做中介者。就是一个对象控制别的
不同对象之间的工作流，把所有工作流只知道的相关的职责全部集中到了一个简单的对象上面，这样做的优点，
是工作流更容易管理和维护。

### 相同点和不同点 （ mediator  / event aggregator )
 
毫无疑问，两者之间的相同处是： 事件和 中介， 不同点是很肤浅的。当我们去探索这些模式的意图，去看它
的具体实现的时候会发现非常不一样, 设计模式的本质更加不同。

###事件
在上面的例子中，event aggregator 和 mediator 都使用了事件。 事件集中器  显而易见是与事件打交道，毕竟
他的名字里面还有个事件。中介者，主要使用事件的原因是因为 事件能够让 生活变得更好一点，但不是说 一定要
应用事件才能实现中介者，你可以使用回调。等等。

###中立对象
双方都使用中立对象来 处理东西。event aggregator 扮演的是 相对于 event publisher 和 event subscribe 事件
的第三方。它扮演的事件集中通过的点。mediator也是一样， 所以这有什么不同呢？ 为什么我们不叫 event aggregator
为mediator呢？答案跟 应用的工作罗和逻辑 被 编码有关。


下面的内容没什么重点，我看不下去了……