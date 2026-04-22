# 中介者模式（Mediator）

本页内容来自 `pattern/Mediator.md` 的重排与提炼。

## 模式目标

中介者模式通过“中心协调对象”管理多个模块的交互，避免对象之间互相直接依赖。

常见类比：
- 机场塔台统一协调起降
- 事件委托中由上层节点统一处理交互

## 何时使用

- 模块关系复杂，调用链难维护
- 一个流程涉及多个对象并带有状态判断
- 希望把工作流逻辑集中在单一入口

## 简化示例

```js
var orgChart = {
  addNewEmployee: function () {
    var employeeDetail = this.getEmployeeDetail()

    employeeDetail.on('complete', function (employee) {
      var managerSelector = this.selectManager(employee)
      managerSelector.on('save', function (employee) {
        employee.save()
      })
    })
  },
}
```

这里的 `orgChart` 不是数据实体，而是流程中枢：
- 监听一个阶段结束
- 决定下一阶段对象
- 串起后续动作

## 与 Event Aggregator 的关系

- 相同点：都可能使用事件作为通信机制。
- 不同点：Mediator 强调“业务流程协调”，Event Aggregator 强调“事件分发通道”。

二者实现形式可能相似，但设计意图不同。
