#Javascript设计模式/我的理解（翻译
## Observer模式与Publish/Subscribe模式的区别
  观察者模式和订阅发布模式之间的区别二者相比较，我们会发现 在js的世界里面，我们会发现观察者模式更容易被意识到，
它们通常 以“发布/订阅”的设计模式实现， 二者非常相似，它们之间的区别，需要注意。

观察者模式形式如下, 希望能够收到主题通知的观察者，它必须订阅"触发“事件的对象。

  发布/订阅者模式与此不同，它在订阅者（希望收到通知的对象们）和发布者（分发事件的对象）建立了一个通道，
可以叫他为主题通道或者时间通道。  这整个事件系统允许你通过代码进行具体事件的定义，以及设定订阅者所需要的参数，
这个想法主要的目的是，避免订阅者和发布者之间的依赖关系。

  正是因为这个与观察者模式不同点， 任意的发布者都能够实现一个适当的事件处理函数，用来注册和接受 发布者所群发的消息。

下面是一个 可能使用  发布/订阅 模式的场景
```javascript
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

```
	这个案例的主要idea是  解耦的提升 ，它们通过订阅另外一个对象的具体的任务，或者说活动，当这个事件被触发的时候，订阅者就能收到。
	而不是单个对象直接调用另外一个对象的方法,

## 优点
这两种模式都鼓励我们，要去认真思考 应用内 各个模块之间的关系， 它们还能够帮助我们确定一些能用这种模式取代的层关系。
这个优势能够用来拆分模块，促进模块模块之间的松耦合，这样子我们的代码就更有可能重复使用，并且容易管理。

从更长远的动机讲，是为了解决这种情形：  两个相互关联的 类之间需要保持一致性，避免这两个类的高耦合性。
举个例子，当一个对象具备通知的能力，但是不需要考虑那些跟它有关的对象。

当你使用这种模式的时候，发布者以及观察者可以存在灵活的关系，这个模式提供了巨大的灵活性，但是实际中，我们的系统不同层之间存在着
高耦合性，这个模式可能会比较难以实现。

这个模式不一定是每个问题的最佳解决方案，但是对于设计低耦合性的系统而言，它仍然是最好的工具之一，
所以它应该被视为所有javascript开发者，
一个非常实用的工具。
## 缺点
与结果相关的是，这个模式的某些问题影响了它们的主要好处，在publish/subscripbe模式中，为了解除pub/sub之间的关联性， 某些情况下我们会很难确保程序会按我们
所想的那样子运行。

举个例子， 发布者可能假设一个或者多个订阅者，监听这个事件。
我们做这样一个假设，有人记录或者向外输出相关应用进程。如果订阅者出现了日志记录的崩溃，那么由于 这个解耦的特性， 发布者就无从得知。
另外一个缺点是，订阅者之间是相互无视的，并且这个模式对于切换发布者之间的损耗是视而不见的，由于发布者跟订阅者之间的动态关系，更新
附带的东西可能就更难调试。

下面为Publish/subscribe 实现


## Publish/Subscribe 实现 
这个模式在Javascript的生态系统适应得非常好，主要的原因是因为 ECMAScript 的实现也是事件驱动的。
你在浏览器环境中使用它会觉得确实是这样，因为DOM 使用事件 作为它主要的交互API。

实际上是这样的， ECMAScript 和 DOM 都没有提供 核心的对象或者方法，来创建定制的事件（dom3的 customEvent这是个例外，
因为它绑在了dom上面，所以这并非通用的实现）。

幸运的是,主流的JS工具包，像是dojo, jQuery,YUI已经有了这类工具，只要花一点小小的努力，你能够轻松的建立起Pub/Sub模式，下面我们看到一些例子。

`javascript 
// Publish
 
// jQuery: $(obj).trigger("channel", [arg1, arg2, arg3]);
$( el ).trigger( "/login", [{username:"test", userData:"test"}] );
 
// Dojo: dojo.publish("channel", [arg1, arg2, arg3] );
dojo.publish( "/login", [{username:"test", userData:"test"}] );
 
// YUI: el.publish("channel", [arg1, arg2, arg3]);
el.publish( "/login", {username:"test", userData:"test"} );
 
 
// Subscribe
 
// jQuery: $(obj).on( "channel", [data], fn );
$( el ).on( "/login", function( event ){...} );
 
// Dojo: dojo.subscribe( "channel", fn);
var handle = dojo.subscribe( "/login", function(data){..} );
 
// YUI: el.on("channel", handler);
el.on( "/login", function( data ){...} );
 
 
// Unsubscribe
 
// jQuery: $(obj).off( "channel" );
$( el ).off( "/login" );
 
// Dojo: dojo.unsubscribe( handle );
dojo.unsubscribe( handle );
 
// YUI: el.detach("channel");
el.detach( "/login" );
`

针对于想要通过香草味(简洁)的JavaScript使用Pub/Sub模式的同学，AmplifyJS包含了一个干净的，未知库主义的实现，
能够与任何的JS库一起使用。Radio.js,PubSubJS 或者 Pure JS 都是不错的选择。


## Publish/Subscribe 实现

`var pubsub = {};
 
(function(myObject) {
 
    // Storage for topics that can be broadcast
    // or listened to
    var topics = {};
 
    // An topic identifier
    var subUid = -1;
 
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    myObject.publish = function( topic, args ) {
 
        if ( !topics[topic] ) {
            return false;
        }
 
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
 
        while (len--) {
            subscribers[len].func( topic, args );
        }
 
        return this;
    };
 
    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    myObject.subscribe = function( topic, func ) {
 
        if (!topics[topic]) {
            topics[topic] = [];
        }
 
        var token = ( ++subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
 
    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    myObject.unsubscribe = function( token ) {
        for ( var m in topics ) {
            if ( topics[m] ) {
                for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                    if ( topics[m][i].token === token ) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    };
}( pubsub ));`

## 案例： Decoupling an Ajax-based jQuery application

在我们最后的案例中，我们从实用性的角度看待，在代码中使用Pub/Sub模式解耦我们的代码，
为什么能够替我们省下痛苦的重构。

在重Ajax的程序中，我们常常有这样的情形：我们收到了一个响应，我们想在实现不单单一个动作。
我们可以简单的，把所有的post-request逻辑放到 success callback函数里面，但是这个方法里面
有一些缺点。

在高耦合的程序中, 如果我们想要保证功能的复用性，内置函数/代码的依赖关系不断增加，有些时候会导致我们需要付出更大的工作量。
这意味着什么呢?  如果我们只是想要一次收集所有的结果，那么把所有的请求逻辑放在回调的函数里面其实还好。但是在某些情况下就不大合适，
如果我们想要在之后的Ajax请求使用同样的数据来源，我们就必须重写数据好多次。

我们可以从一开始就使用pubsub模式，这样能节省时间，而不是来回在各个层级之间 调用相同的data-source，并且优化它们。

通过观察者模式，我们能够轻松的划分程序级别的通告，  如果你用别的模式，可能没有这么优雅。
注意下面的案例，当用户表明他想要进行一次搜索查询，就发布一个主题通告，当请求响应已经返回了，数据可用了，这时候
也发布一个通告。订阅者可以待会决定如何使用这些事件。这样做的优点是这样的： 只要我们想，我们可以使用10个不同的订阅者来
加工从不同层级不同方式返回的数据，它的主要责任就是发送请求，并且把返回的数据传递给希望使用的人。
这个焦点的分离，能够让我们的代码设计 更加简洁一点。
## html/templates
```<form id="flickrSearch">
 
   <input type="text" name="tag" id="query"/>
 
   <input type="submit" name="submit" value="submit"/>
 
</form>
 
 
 
<div id="lastQuery"></div>
 
<ol id="searchResults"></ol>
 
 
 
<script id="resultTemplate" type="text/html">
    <% _.each(items, function( item ){ %>
        <li><img src="<%= item.media.m %>"/></li>
    <% });%>
</script>```
## javascripts

```
;(function( $ ) {
 
   // Pre-compile template and "cache" it using closure
   var resultTemplate = _.template($( "#resultTemplate" ).html());
 
   // Subscribe to the new search tags topic
   $.subscribe( "/search/tags", function( e, tags ) {
       $( "#lastQuery" )
                .html("<p>Searched for:<strong>" + tags + "</strong></p>");
   });
 
   // Subscribe to the new results topic
   $.subscribe( "/search/resultSet", function( e, results ){
 
       $( "#searchResults" ).empty().append(resultTemplate( results ));
 
   });
 
   // Submit a search query and publish tags on the /search/tags topic
   $( "#flickrSearch" ).submit( function( e ) {
 
       e.preventDefault();
       var tags = $(this).find( "#query").val();
 
       if ( !tags ){
        return;
       }
 
       $.publish( "/search/tags", [ $.trim(tags) ]);
 
   });
 
 
   // Subscribe to new tags being published and perform
   // a search query using them. Once data has returned
   // publish this data for the rest of the application
   // to consume
 
   $.subscribe("/search/tags", function( e, tags ) {
 
       $.getJSON( "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
              tags: tags,
              tagmode: "any",
              format: "json"
            },
 
          function( data ){
 
              if( !data.items.length ) {
                return;
              }
 
              $.publish( "/search/resultSet", { items: data.items } );
       });
 
   });
 
 
})( jQuery );```


在应用设计中的许多不同的场景中，观察者模式用来解耦是一个实用的选择。
如果你还没有用过，我建议你可以看看上面的案例并且拿一个过来实践，
这是最简单的设计模式之一，也是最强大之一。