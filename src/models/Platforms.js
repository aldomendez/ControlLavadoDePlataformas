var m = require('mithril')
var d3 = require('d3-time-format')

var formatTime = d3.timeFormat('%Y-%m-%d %H:%M:%S')
var formatedDateformat = function (el) {
  el.A_PROCESS_DATE = formatTime(el.A_PROCESS_DATE)
  el.B_PROCESS_DATE = formatTime(el.B_PROCESS_DATE)
  return el
}

var LostTime = {
  list: [],
  current: {},
  numberOfRequests: 0,
  loadList: function () {
    return m.request({
      method: 'GET',
      url: 'http://wmatvmlr401/lr4/api/platform_cleaning.php/liveLots',
      withCredentials: true
    }).then(function (result) {
      LostTime.list = result.results.map(function (el) {
        return {
          'REQID': el.REQID,
          'SYSTEM_ID': el.SYSTEM_ID,
          'SERIAL_NUM': el.SERIAL_NUM,
          'PASS_FAIL': el.PASS_FAIL,
          'A_PROCESS_DATE': new Date(+el.A_PROCESS_DATE),
          'B_PROCESS_DATE': new Date(+el.B_PROCESS_DATE),
          'YWW': el.YWW,
          'CYCLE_TIME': parseFloat(el.CYCLE_TIME),
          'LOST_TIME': parseFloat(el.LOST_TIME),

          'ID': el.ID,
          'CREATION_DATE': '2017-03-08 14:29',
          'LOT_NUMBER': 'P-PL',
          'OPERATOR_ID': '884526',
          'SHIFT': '1',
          'PROCESS_DATE': '2017-03-08 14:29',
          'EXPIRATION_DATE': '2017-03-08 22:29',
          'QTY': '8',
          'COMMENTS': el.COMMENTS || ''

        }
      })
    })
  },
  load: function (id) {
    // TODO: Avoid infinite call in case there is no records in the response
    if (LostTime.list.length === 0 && LostTime.numberOfRequests < 5) {
      LostTime.loadList().then(function () {
        LostTime.load(id)
      })
      LostTime.numberOfRequests++
    } else {
      LostTime.numberOfRequests = 0
      LostTime.current = LostTime.list.filter(function (el) {
        return (el.REQID === id)
      }).reduce(function (prev, curr) { return curr }, {})
    }
    // console.log(LostTime.numberOfRequests)
  },
  save: function (e) {
    console.log(e)
    e.preventDefault()
    // debugger
    return m.request({
      method: 'PUT',
      url: 'http://wmatvmlr401/lr4/lr4/apiplatform_cleaning.php',
      data: formatedDateformat(Object.assign({}, LostTime.current)),
      withCredentials: false
    }).then(function (data) {
      m.route.set('/list')
      console.log(data)
      // debugger
    })
  }
}

module.exports = LostTime
