
var utils = {
  pad: function (n, width, z) {
    z = z || '0'
    n = n + ''
    if (n.length >= width) {
      return n
    } else {
      return new Array(width - n.length + 1).join(z) + n
    }
  },
  parseDate: function (d) {
    var dateComponents = d.split('-')
    return new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2], dateComponents[3], dateComponents[4])
    // return new Date(d.substring(0, 4), d.substring(4, 6) - 1, d.substring(6, 8), d.substring(8, 10), d.substring(10, 12), d.substring(12, 14))
  },
  currentShift: function () {
    var d, day, hour
    d = new Date()
    day = d.getDay()
    hour = +('' + utils.pad(d.getHours(), 2) + utils.pad(d.getMinutes(), 2))
    if (day === 6 && hour < 630) {
      return 3
    }
    if (day === 0 && hour < 630) {
      return 5
    }
    if (day === 0 || day === 6) {
      if (hour < 630 || hour > 1830) {
        return 5
      } else {
        return 4
      }
    } else {
      if (hour < 630 || hour > 2300) {
        return 3
      } else if (hour > 630 && hour < 1530) {
        return 1
      } else {
        return 2
      }
    }
  }
}
module.exports = utils
