var m = require('mithril')
var vague = require('vague-time')

var isCleaning = function (el) {
  return (el.ISCLEANING === 'Y')
}
// var isUsed = function (el) {
//   return (el.USED === 'Y')
// }

module.exports = {
  oninit: function (vnode) {
    // vnode.data.percent = vnode.attrs.time
    console.log(vnode.attrs)
  },
  view: function (vnode) {
    return m('div.ui.tiny.progress', {class: (isCleaning(vnode.attrs.element) ? 'disabled' : 'success active')}, [
      m('div.bar', { style: 'transition-duration: 300ms; width: 100%;' }, [
        m('div.progress', '')
      ]),
      m('div.label', isCleaning(vnode.attrs.element) ? 'en lavado' : vague.get({to: vnode.attrs.element.EXPIRATION_DATE}))
    ])
  }
}
