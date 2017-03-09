var m = require('mithril')
var vague = require('vague-time')

var isCleaning = function (el) {
  return (el.ISCLEANING === 'Y')
}

module.exports = {
  oninit: function (vnode) {
    vnode.state.status = isCleaning(vnode.attrs) ? 'disabled' : 'success'
    console.log(vnode.attrs)
  },
  view: function (vnode) {
    return m('div.ui.tiny.progress', { class: vnode.state.status }, [
      m('div.bar', { style: 'transition-duration: 300ms; width: 100%;' }, [
        m('div.progress', '')
      ]),
      m('div.label', isCleaning(vnode.attrs) ? 'en lavado' : vague.get({to: vnode.attrs.EXPIRATION_DATE}))
    ])
  }
}
