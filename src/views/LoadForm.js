var m = require('mithril')
var LostTime = require('../models/LostTime')

module.exports = {
  oninit: function (vnode) { if (vnode.attr) { LostTime.load(vnode.attrs.id) } },
  view: function () {
    return m('section', [
      m('form.ui.form', [
        m('h3', 'Informacion del operador'),
        m('div.two.fields', [
          m('div.field', [m('label', 'Numero del operador'), m('input[type=text]')]),
          m('div.field', [m('label', 'Turno'), m('input[type=text]')])
        ])
      ]),
      m('form.ui.form', [
        m('h3', 'Materiales'),
        m('div.three.fields', [
          m('div.field', [m('label', 'Lote'), m('input[type=text]')]),
          m('div.field', [m('label', 'Cantidad'), m('input[type=text]')]),
          m('div.field', [m('label', '&nbsp;'), m('input.ui.fluid.button[type=submit][value=Agregar a la lista]')])
        ])
      ]),
      m('table.ui.very.compact.collapsing.table', [
        m('thead', [
          m('tr', [
            m('th', 'Lote'),
            m('th', 'Cantidad')
          ])
        ]),
        m('tbody', [
          m('tr', [
            m('td', 'P-LP1212611021'),
            m('td', '8')
          ])
        ])
      ]),
      m('br'),
      m('form.ui.form', [
        m('div.field', [
          m('label', 'Comentarios'),
          m('input[list=FailModes][type=text]'),
          m('datalist[id=FailModes]', [
            m('option', {value: 'ALPS - Problemas para levantar el ALPS / Retrabajo'})
          ])
        ]),
        m('div.field', [
          m('input[type=submit].ui.primary.button', {value: 'Llevar a lavado'})
        ])
      ])
    ])
  }
}
