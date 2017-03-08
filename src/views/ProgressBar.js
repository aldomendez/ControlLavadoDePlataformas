var m = require('mithril')

module.exports = {
  view: function () {
    return m('div.ui.tiny.progress.sucess', [
      m('div.bar', { style: 'transition-duration: 300ms; width: 100%;' }, [
        m('div.progress', '')
      ]),
      m('div.label', 'en lavado')
    ])
  }
}
