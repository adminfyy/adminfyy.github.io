module.exports = {
  oneDay: 24 * 60 * 60 * 1000 - 1000,
  oneHour: 60 * 60 * 1000,
  addOneDay: function (date) {
    return date + this.oneDay
  },
  minusOneDay: function (date) {
    return date - this.oneDay
  },
  minusEightHours: function (date) {
    return date - 8 * this.oneHour
  }
}


