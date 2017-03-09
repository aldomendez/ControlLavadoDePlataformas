var m = require('mithril')
var utils = require('../utils')

var parseDateFormat = function (el) {
  el.CREATION_DATE = utils.parseDate(el.CREATION_DATE)
  el.PROCESS_DATE = utils.parseDate(el.PROCESS_DATE)
  el.EXPIRATION_DATE = utils.parseDate(el.EXPIRATION_DATE)
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
      LostTime.list = result.results.map(parseDateFormat)
      console.log(LostTime.list)
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
      // TODO: Tendre que poner una funcion de parseo de fechas que sea mas sencilla
      //       actualmente estoy poniendo una lobreria que es muy pesada para
      //       el beneficio que se optiene
      // data: formatedDateformat(Object.assign({}, LostTime.current)),
      withCredentials: false
    }).then(function (data) {
      m.route.set('/list')
      console.log(data)
      // debugger
    })
  }
}

module.exports = LostTime
