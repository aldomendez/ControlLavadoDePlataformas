var m = require('mithril')

var EventList = require('./views/EventList')
var UserForm = require('./views/UserForm')
var Layout = require('./views/Layout')

m.route(document.body, '/list', {
  '/list': {
    render: function () {
      return m(Layout, m(EventList))
    }
  },
  '/edit/:id': {
    render: function (vnode) {
      return m(Layout, m(UserForm, vnode.attrs))
    }
  }
})
