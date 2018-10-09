// Based on jest-serializer-vue

const beautify = require('pretty');

function isHtmlString (received) {
  return received && typeof(received) === 'string' && received.startsWith('<');
}

function isVueWrapper (received) {
  return received && typeof(received) === 'object' && typeof(received.isVueInstance) === 'function';
}

module.exports = {
  test: function (received) {
    return isHtmlString(received) || isVueWrapper(received);
  },
  print: function (received) {
    const html = (isVueWrapper(received) ? received.html() : received) || '';
    const removedServerRenderedText = html.replace(/ data-server-rendered="true"/, '');
    // To see available options: https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js
    const options = {
      indent_size: 2,
      unformatted: ['code', 'pre'],
      inline: [],
      indent_inner_html: true,
      indent_char: ' ',
      indent_size: 2,
      sep: '\n'
    };
    return beautify(removedServerRenderedText, options);
  }
};
