var m = require('mithril')
var d3 = require('d3-time-format')

var formatTime = d3.timeFormat("%Y-%m-%d %H:%M:%S");
formatedDateformat = function(el){
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
      url: './index.php/losttime/4x25/shim',
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
        return (el.REQID == id) ? true : false
      }).reduce(function (prev, curr) { return curr }, {})
    }
    // console.log(LostTime.numberOfRequests)
  },
  save: function (e) {
    console.log(e);
    e.preventDefault()
    // debugger
    return m.request({
      method: 'PUT',
      url: './index.php/losttime/4x25/shim',
      data: formatedDateformat(Object.assign({}, LostTime.current)),
      withCredentials: false
    }).then(function (data) {
      m.route.set('/list')
      console.log(data)
      // debugger
    })
  }
}

// Carga la lista cada 20 min
var cron = setInterval(LostTime.loadList,1200000)

module.exports = LostTime
