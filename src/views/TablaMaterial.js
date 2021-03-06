var m = require('mithril')
var Platforms = require('../models/Platforms')
var ProgressBar = require('./ProgressBar')

var completarLavados = function (e) {
  console.log('Click: completarLavados')
  Platforms.setCleaningComplete(e)
}

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
          // Mostrar un mensaje de que no hay elementos en la lista
          // y un enlace que te lleve a el formulario
          (Platforms.list.length > 0)
            ? Platforms.list.map(function (el) {
              return m('tr', {key: el.ID}, [
                m('td.collapsing', m('b', el.USED + ' - ' + el.LOT_NUMBER)),
                m('td.collapsing', m('b', el.QTY)),
                m('td', m(ProgressBar, {element: el, time: Platforms.currentTime})),
                m('td', m('a',
                  { 'data-value': el.ID,
                    onclick: m.withAttr('data-value', Platforms.markAsUsed, el)
                  }, 'Usada')),
                m('td', el.OPERATOR_ID),
                m('td', el.COMMENTS)
              ])
            })
            : m('tr', [
              m('td[colspan=6', [
                'No hay Plataformas activas, hay que lavar material - ',
                m('a.item[href=/load]', { oncreate: m.route.link }, 'Carga de material')
              ])
            ])
        ),
        m('tfoot.full-width', [
          m('tr', [
            m('th[colspan=6]', [
              m('div.ui.right.floated.small.secondary.inverted.button', {onclick: Platforms.load}, 'Actualizar'),
              (Platforms.list.filter(function (el) { return el.ISCLEANING === 'Y' }).length !== 0) ? m('div.ui.right.floated.small.primary.inverted.button', {onclick: completarLavados}, 'Completar lavado') : ''
            ])
          ])
        ])
      ])
    ])
  }
}
