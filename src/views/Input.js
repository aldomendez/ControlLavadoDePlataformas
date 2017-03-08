var m = require('mithril')

module.exports = {
  view: function (vnode) {
    return m('main.layout', [
      m('h1', [
        m("a[href='/list']", {oncreate: m.route.link}, 'Eventos')
      ]),
      m('section', vnode.children)
    ])
  }
}
