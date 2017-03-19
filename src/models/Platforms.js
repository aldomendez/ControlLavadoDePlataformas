var m = require('mithril')
var utils = require('../utils')

var parseDateFormat = function (el) {
  el.CREATION_DATE = utils.parseDate(el.CREATION_DATE)
  el.PROCESS_DATE = utils.parseDate(el.PROCESS_DATE)
  el.EXPIRATION_DATE = utils.parseDate(el.EXPIRATION_DATE)
  return el
}

var Platform = {
  currentTime: new Date(),
  serverTime: new Date(),
  list: [],
  current: {},
  numberOfRequests: 0,
  loadList: function () {
    return m.request({
      method: 'GET',
      url: 'http://wmatvmlr401/lr4/api/platform_cleaning.php/liveLots',
      withCredentials: false
    }).then(function (result) {
      Platform.serverTime = utils.parseDate(result.timestamp)
      Platform.list = result.results.map(parseDateFormat)
      console.log(Platform)
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
  setMaterialToClean: function (e) {
    console.log(e)
    e.preventDefault()
    // debugger
    return m.request({
      method: 'PUT',
      url: 'http://wmatvmlr401/lr4/lr4/apiplatform_cleaning.php',
      data: {},
      withCredentials: false
    }).then(function (data) {
      m.route.set('/list')
      console.log(data)
      // debugger
    })
  },
  markAsUsed: function (e) {
    return m.request({
      method: 'POST',
      url: 'http://wmatvmlr401/lr4/api/platform_cleaning.php/markAsUsed',
      data: { id: this.ID },
      withCredentials: false
    }).then(function (data) {
      Platform.loadList()
    })
  },
  setCleaningComplete: function (e) {
    console.log(e)
    e.preventDefault()
    // debugger
    return m.request({
      method: 'PUT',
      url: 'http://wmatvmlr401/lr4/api/platform_cleaning.php/completeCleaning'
      // data: {cleaning: 'complete'}
    }).then(function (data) {
      Platform.loadList()
    })
  }
}

module.exports = Platform
