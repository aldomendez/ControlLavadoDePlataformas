var m = require('mithril')
if (process.env === 'production') {
  require('offline-plugin/runtime').install()
}

if (document) { document.title = 'Control de lavados de plataforma' }

var TablaMaterial = require('./views/TablaMaterial')
var LoadForm = require('./views/LoadForm')
var Layout = require('./views/Layout')

m.route(document.body, '/list', {
  '/list': {
    render: function () {
      return m(Layout, m(TablaMaterial))
    }
  },
  '/load': {
    render: function (vnode) {
      return m(Layout, m(LoadForm, vnode.attrs))
    }
  }
})
