var m = require('mithril')
// var utils = require('../utils')

var User = {
  list: [],
  lot: '',
  qty: '',
  setNewLotToClean: function (e) {
    User.list.unshift({
      lot: User.lot,
      qty: User.qty,
      comment: ''
    })
    e.preventDefault()
    console.log(e)
  },
  loadList: function () {
    return m.request({
      method: 'GET',
      url: 'http://wmatvmlr401/lr4/api/platform_cleaning.php/tobeDefined',
      withCredentials: false
    }).then(function (result) {
      console.log(result)
    })
  }
}

module.exports = User
