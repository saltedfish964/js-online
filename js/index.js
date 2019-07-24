function jsOnline () {
  this.bigWrap = document.getElementById('big-wrap');
  this.wrapList = document.getElementsByClassName('wrap');

  this.htmlEditor;
  this.cssEditor;
  this.jsEditor;
}

jsOnline.prototype.initWindowSize = function () {
  let windowHeight = document.documentElement.clientHeight;
  let windowWidth = document.documentElement.clientWidth;

  this.bigWrap.style.height = windowHeight + 'px';
  this.bigWrap.style.width = windowWidth + 'px';

  for (let i = 0; i < this.wrapList.length; i++) {
    this.wrapList[i].style.height = windowHeight / 2 + 'px';
    this.wrapList[i].style.width = windowWidth / 2 + 'px';
  }
}

jsOnline.prototype.listenWindowResize = function () {
  let that = this;
  window.onresize = function () {
    let windowHeight = document.documentElement.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    that.bigWrap.style.height = windowHeight + 'px';
    that.bigWrap.style.width = windowWidth + 'px';

    for (let i = 0; i < that.wrapList.length; i++) {
      that.wrapList[i].style.height = windowHeight / 2 + 'px';
      that.wrapList[i].style.width = windowWidth / 2 + 'px';
    }
  }
}

jsOnline.prototype.initEditors = function () {
  let htmlTextarea = document.getElementById('html-textarea');
  let cssTextarea = document.getElementById('css-textarea');
  let jsTextarea = document.getElementById('js-textarea');

  let mixedMode = {
    name: "htmlmixed",
    scriptTypes: [{
      matches: /\/x-handlebars-template|\/x-mustache/i,
      mode: null
    },
    {
      matches: /(text|application)\/(x-)?vb(a|script)/i,
      mode: "vbscript"
    }]
  };

  this.htmlEditor = CodeMirror.fromTextArea(htmlTextarea, {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: 'hopscotch',
    scrollbarStyle: 'simple',
    mode: mixedMode,
  });

  this.cssEditor = CodeMirror.fromTextArea(cssTextarea, {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: 'hopscotch',
    scrollbarStyle: 'simple',
    mode: 'css',
  });

  this.jsEditor = CodeMirror.fromTextArea(jsTextarea, {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: 'hopscotch',
    scrollbarStyle: 'simple',
    mode: 'javascript',
  });

  this.htmlEditor.setSize('100%', '100%');
  this.cssEditor.setSize('100%', '100%');
  this.jsEditor.setSize('100%', '100%');

  this.htmlEditor.setValue(defaultHtmlText);
  this.cssEditor.setValue(defaultCssText);
  this.jsEditor.setValue(defaultJsText);
}

jsOnline.prototype.init = function () {
  this.initWindowSize();
  this.listenWindowResize();
  this.initEditors();
}

window.onload = function () {
  new jsOnline().init();
}