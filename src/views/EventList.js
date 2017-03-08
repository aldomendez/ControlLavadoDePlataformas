var m = require('mithril')
var LostTime = require('../models/LostTime')
var d3 = require('d3-time-format')
var vague = require('vague-time')

var formatTime = d3.timeFormat("%B %d, %Y at %H:%M");

module.exports = {
  oninit: LostTime.loadList,
  view: function () {
    return m('table.ui.celled.table', 
      m('thead',
        m('tr',
          m('th','Maquina'),
          m('th','Numero de serie'),
          m('th','Hora del evento'),
          m('th','Tiempo desde el evento'),
          m('th','Minutos Perdidos'),
          m('th','Tiempo de ciclo (min)'),
          m('th', 'Comentarios'))),
      m('tbody',
      LostTime.list.map(function (losttime) {
        return m('tr',
          m('td',losttime.SYSTEM_ID),
          m('td',losttime.SERIAL_NUM),
          m('td',formatTime(losttime.A_PROCESS_DATE)),
          m('td',vague.get({to:losttime.A_PROCESS_DATE})),
          m('td',losttime.CYCLE_TIME),
          m('td',losttime.LOST_TIME),
          m('td',m('a',
            {
              href: '/edit/' + losttime.REQID, 
              oncreate: m.route.link
            },'Agregar comentario'))
        )
      })))
}
}
