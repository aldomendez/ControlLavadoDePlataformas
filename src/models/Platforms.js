var m = require('mithril')
var utils = require('../utils')

var parseDateFormat = function (el) {
  el.CREATION_DATE = utils.parseDate(el.CREATION_DATE)
  el.PROCESS_DATE = utils.parseDate(el.PROCESS_DATE)
  el.EXPIRATION_DATE = utils.parseDate(el.EXPIRATION_DATE)
  return el
}

var Platform = {
  list: [],
  current: {},
  numberOfRequests: 0,
  loadList: function () {
    return m.request({
      method: 'GET',
      url: 'http://wmatvmlr401/lr4/api/platform_cleaning.php/liveLots',
      withCredentials: true
    }).then(function (result) {
      Platform.list = result.results.map(parseDateFormat)
      console.log(Platform.list)
    })
  },
  load: function (id) {
    // TODO: Avoid infinite call in case there is no records in the response
    if (Platform.list.length === 0 && Platform.numberOfRequests < 5) {
      Platform.loadList().then(function () {
        Platform.load(id)
      })
      Platform.numberOfRequests++
    } else {
      Platform.numberOfRequests = 0
      Platform.current = Platform.list.filter(function (el) {
        return (el.REQID === id)
      }).reduce(function (prev, curr) { return curr }, {})
    }
    // console.log(Platform.numberOfRequests)
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
      // data: formatedDateformat(Object.assign({}, Platform.current)),
      withCredentials: false
    }).then(function (data) {
      m.route.set('/list')
      console.log(data)
      // debugger
    })
  },
  setCleaningComplete: function (e) {
    console.log(e)
    e.preventDefault()
    // debugger
    return m.request({
      method: 'PUT',
      url: 'http://wmatvmlr401/lr4/api/platform_cleaning.php/liveLots',
      data: {cleaning: 'complete'},
      withCredentials: false
    }).then(function (data) {
      Platform.load()
    })
  }
}

module.exports = Platform
