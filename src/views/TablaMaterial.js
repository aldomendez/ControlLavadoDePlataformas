var m = require('mithril')
var Platforms = require('../models/Platforms')
var ProgressBar = require('./ProgressBar')
// var vague = require('vague-time')

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
            m('th[colspan=5]', [
              m('div.ui.right.floated.small.primary.inverted.button', 'Completar lavado')
            ])
          ])
        ])
      ])
    ]
    )

    // return m('table.ui.celled.table',
    //   m('thead',
    //     m('tr',
    //       m('th', 'Maquina'),
    //       m('th', 'Numero de serie'),
    //       m('th', 'Hora del evento'),
    //       m('th', 'Tiempo desde el evento'),
    //       m('th', 'Minutos Perdidos'),
    //       m('th', 'Tiempo de ciclo (min)'),
    //       m('th', 'Comentarios'))),
    //   m('tbody',
    //   LostTime.list.map(function (losttime) {
    //     return m('tr',
    //       m('td', losttime.SYSTEM_ID),
    //       m('td', losttime.SERIAL_NUM),
    //       m('td', vague.get({to: losttime.A_PROCESS_DATE})),
    //       m('td', losttime.CYCLE_TIME),
    //       m('td', losttime.LOST_TIME),
    //       m('td', m('a',
    //         {
    //           href: '/edit/' + losttime.REQID,
    //           oncreate: m.route.link
    //         }, 'Agregar comentario'))
    //     )
    //   })))
  }
}
