var m = require('mithril')

module.exports = {
  view: function (vnode) {
    return m('main.ui.container', [
      m('nav.ui.menu',
        [
          m('.header.item', 'FIT'),
          m('.header.item', 'Lavado de plataformas'),
          m('a.item[href=/list]', {oncreate: m.route.link}, 'Material listo'),
          m('a.item[href=/load]', {oncreate: m.route.link}, 'Carga de material')
        ]),
      m('section', vnode.children)
    ])
  }
}
