var m = require('mithril')
var LostTime = require('../models/LostTime')
var FailModes = require('../models/FailModes')
var d3 = require('d3-time-format')

var formatTime = d3.timeFormat('%B %d, %Y at %H:%M')

var assignFailModeToComment = function assignFailModeToComment (e) {
  LostTime.current.COMMENTS = e
}

module.exports = {
  oninit: function (vnode) { LostTime.load(vnode.attrs.id) },
  view: function () {
    return m('div',
      m('h1', 'Captura de comentarios'),
      m('form.ui.form', [
        m('.two.fields',
          m('div.field',
            m('label', 'Equipo'),
            m('div', m('input[type=text]', {
              disabled: true,
              oninput: m.withAttr('value', function (value) {
                // LostTime.current.COMMENTS = value
              }),
              value: LostTime.current.SYSTEM_ID
            }))),
          m('div.field',
            m('label', 'Serial num'),
            m('div', m('input[type=text]', {
              disabled: true,
              oninput: m.withAttr('value', function (value) {
                // LostTime.current.COMMENTS = value
              }),
              value: LostTime.current.SERIAL_NUM
            })))),
        m('div.field',
          m('label', 'Hora del evento'),
          m('div', m('input[type=text]', {
            disabled: true,
            oninput: m.withAttr('value', function (value) {
              // LostTime.current.COMMENTS = value
            }),
            value: formatTime(LostTime.current.A_PROCESS_DATE)
          }))),
        m('.grouped.fields',
          [
            m('label', {for: 'fail-modes'}, 'Modo de falla'),
            FailModes.map(function (fm, i) {
              return m('.field', {
                'data-element': fm.mode + ' - ' + fm.description,
                onclick: m.withAttr('data-element', assignFailModeToComment)
              },
                m('.ui.radio.checkbox',
                  m('input[type=radio]', {name: 'fail-modes', id: 'fail-modes-radio-' + i}),
                  m('label', {for: 'fail-modes-radio-' + i}, fm.mode + ' - ' + fm.description)))
            })
          ]),
        m('div.field',
          {class: ((LostTime.current.COMMENTS.length) >= 140 ? 'error' : '')},
          m('label', 'Comentarios - te quedan ' + (140 - LostTime.current.COMMENTS.length) + ' caracteres'),
          m('div', m('input[type=text]', {
            list: 'FailModes',
            disabled: false,
            oninput: m.withAttr('value', function (value) {
              LostTime.current.COMMENTS = value
            }),
            value: LostTime.current.COMMENTS
          })),
          m('datalist', {id: 'FailModes'}, FailModes.map(function (fm, i) {
            return m('option', {value: (fm.mode + ' - ' + fm.description)})
          }))),
        m('div.field',
          m('button.ui.primary.button', {onclick: LostTime.save}, 'Guardar'))
      ]))
  }
}
