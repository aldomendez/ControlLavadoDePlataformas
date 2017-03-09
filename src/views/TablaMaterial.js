var m = require('mithril')
var Platforms = require('../models/Platforms')
var ProgressBar = require('./ProgressBar')

module.exports = {
  oninit: Platforms.loadList,
  view: function () {
    return m('section', [m('h1', 'Material listo para usar'),
      m('table.ui.striped.compact.table', [
        m('thead',
          m('tr', [
            m('th.single.line', 'Lote'),
            m('th', 'Cantidad'),
            m('th', 'Expiracion'),
            m('th', 'Usar'),
            m('th', 'Operador'),
            m('th', 'Comentarios')
          ])
        ),
        m('tbody',
          Platforms.list.map(function (el) {
            return m('tr', [
              m('td.collapsing', m('b', el.LOT_NUMBER)),
              m('td.collapsing', m('b', el.QTY)),
              m('td', m(ProgressBar, el)),
              m('td', m('a',
                {
                  href: '/edit/' + Platforms.REQID,
                  oncreate: m.route.link
                }, 'Usada')),
              m('td', el.OPERATOR_ID),
              m('td', el.COMMENTS)
            ])
          })
        ),
        m('tfoot.full-width', [
          m('tr', [
            m('th[colspan=6]', [
              m('div.ui.right.floated.small.primary.inverted.button', 'Completar lavado')
            ])
          ])
        ])
      ])
    ])
  }
}
