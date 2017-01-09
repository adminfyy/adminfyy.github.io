#js pattern 当中我的理解
	观察者模式和订阅发布模式之间的区别
	二者相比较，我们会发现 在js的世界里面，我们会发现观察者模式更容易被意识到，
	它们通常 以“发布/订阅”的设计模式实现， 二者非常相似，它们之间的区别，需要注意。

	观察者模式形式如下, 希望能够收到主题通知的观察者，它必须订阅"触发“事件的对象。

	发布/订阅者模式与此不同，它在订阅者（希望收到通知的对象们）和发布者（分发事件的对象）建立了一个通道，
	可以叫他为主题通道或者时间通道。  这整个事件系统允许你通过代码进行具体事件的定义，以及设定订阅者所需要的参数，
	这个想法主要的目的是，避免订阅者和发布者之间的依赖关系。

	正是因为这个与观察者模式不同点， 任意的发布者都能够实现一个适当的事件处理函数，用来注册和接受 发布者所群发的消息。

	下面是一个 可能使用  发布/订阅 模式的场景
`
// A very simple new mail handler
 
// A count of the number of messages received
var mailCounter = 0;
 
// Initialize subscribers that will listen out for a topic
// with the name "inbox/newMessage".
 
// Render a preview of new messages
var subscriber1 = subscribe( "inbox/newMessage", function( topic, data ) {
 
  // Log the topic for debugging purposes
  console.log( "A new message was received: ", topic );
 
  // Use the data that was passed from our subject
  // to display a message preview to the user
  $( ".messageSender" ).html( data.sender );
  $( ".messagePreview" ).html( data.body );
 
});
 
// Here's another subscriber using the same data to perform
// a different task.
 
// Update the counter displaying the number of new
// messages received via the publisher
 
var subscriber2 = subscribe( "inbox/newMessage", function( topic, data ) {
 
  $('.newMessageCounter').html( ++mailCounter );
 
});
 
publish( "inbox/newMessage", [{
  sender: "hello@google.com",
  body: "Hey there! How are you doing today?"
}]);
 
// We could then at a later point unsubscribe our subscribers
// from receiving any new topic notifications as follows:
// unsubscribe( subscriber1 );
// unsubscribe( subscriber2 );

`
	这个案例的主要idea是  解耦的提升 ，它们通过订阅另外一个对象的具体的任务，或者说活动，当这个事件被触发的时候，订阅者就能收到。
	而不是单个对象直接调用另外一个对象的方法,

# 优点
	这两种模式都鼓励我们，要去认真思考 应用内 各个模块之间的关系， 它们还能够帮助我们确定一些能用这种模式取代的层关系。
	这个优势能够用来拆分模块，促进模块模块之间的松耦合，这样子我们的代码就更有可能重复使用，并且容易管理。

	从更长远的动机讲，是为了解决这种情形：  两个相互关联的 类之间需要保持一致性，避免这两个类的高耦合性。
	举个例子，当一个对象具备通知的能力，但是不需要考虑那些跟它有关的对象。

	当你使用这种模式的时候，发布者以及观察者可以存在灵活的关系，这个模式提供了巨大的灵活性，但是实际中，我们的系统不同层之间存在着
	高耦合性，这个模式可能会比较难以实现。

	这个模式不一定是每个问题的最佳解决方案，但是对于设计低耦合性的系统而言，它仍然是最好的工具之一，所以它应该被视为所有javascript开发者，
	一个非常实用的工具。
# 缺点
		与结果相关的是，这个模式的某些问题影响了它们的主要好处，在publish/subscripbe模式中，为了解除pub/sub之间的关联性， 某些情况下我们会很难确保程序会按我们
	所想的那样子运行。

		举个例子， 发布者可能假设一个或者多个订阅者，监听这个事件。
		我们做这样一个假设，有人记录或者向外输出相关应用进程。如果订阅者出现了日志记录的崩溃，那么由于 这个解耦的特性， 发布者就无从得知。
		另外一个缺点是，订阅者之间是相互无视的，并且这个模式对于切换发布者之间的损耗是视而不见的，由于发布者跟订阅者之间的动态关系，更新
		附带的东西可能就更难调试。
	
	下面为Publish/subscribe 实现


# Publish/Subscribe 实现 
	这个模式在Javascript的生态系统适应得非常好，主要的原因是因为 ECMAScript 的实现也是事件驱动的。
	你在浏览器环境中使用它会觉得确实是这样，因为DOM 使用事件 作为它主要的交互API。

	实际上是这样的， ECMAScript 和 DOM 都没有提供 核心的对象或者方法，来创建定制的事件（dom3的 customEvent这是个例外，因为它绑在了dom上面，所以这并非通用的实现）