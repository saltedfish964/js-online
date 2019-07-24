function addConsoleText (msg) {
  let divEle = document.createElement('div');
  let consoleContentEle = document.getElementById('console-content');
  divEle.innerHTML = msg;
  consoleContentEle.appendChild(divEle);
  consoleContentEle.scrollTop = consoleContentEle.scrollHeight;
}

function jsOnline () {
  this.bigWrap = document.getElementById('big-wrap');

  this.tabItemList = document.getElementsByClassName('tab-item');

  this.iframe = document.getElementById('iframe');

  this.editorWrapList = document.querySelectorAll('.editor > .wrap');

  this.htmlEditor;
  this.cssEditor;
  this.jsEditor;
}

jsOnline.prototype.initWindowSize = function () {
  let windowHeight = document.documentElement.clientHeight;
  let windowWidth = document.documentElement.clientWidth;

  this.bigWrap.style.height = windowHeight - 30 + 'px';
  this.bigWrap.style.width = windowWidth + 'px';
}

jsOnline.prototype.listenWindowResize = function () {
  let that = this;
  window.onresize = function () {
    let windowHeight = document.documentElement.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    that.bigWrap.style.height = windowHeight - 30 + 'px';
    that.bigWrap.style.width = windowWidth + 'px';

    let jsWrapHeight = windowHeight - 230 + 'px';

    that.jsEditor.setSize('100%', jsWrapHeight);
  }
}

jsOnline.prototype.initEditors = function () {
  let htmlTextarea = document.getElementById('html-textarea');
  let cssTextarea = document.getElementById('css-textarea');
  let jsTextarea = document.getElementById('js-textarea');

  let jsWrapHeight = parseInt(this.bigWrap.style.height) - 200 + 'px';

  this.htmlEditor = CodeMirror.fromTextArea(htmlTextarea, {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: 'hopscotch',
    scrollbarStyle: 'simple',
    mode: 'text/html',
    keyMap: "sublime",
    tabSize: 2,
    autoCloseTags: true,
  });

  this.cssEditor = CodeMirror.fromTextArea(cssTextarea, {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: 'hopscotch',
    scrollbarStyle: 'simple',
    mode: 'css',
    keyMap: "sublime",
    tabSize: 2,
    autoCloseBrackets : true,
  });

  this.jsEditor = CodeMirror.fromTextArea(jsTextarea, {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: 'hopscotch',
    scrollbarStyle: 'simple',
    mode: 'text/javascript',
    keyMap: "sublime",
    tabSize: 2,
    autoCloseBrackets: true,
  });

  this.htmlEditor.setSize('100%', '100%');
  this.cssEditor.setSize('100%', '100%');
  this.jsEditor.setSize('100%', jsWrapHeight);

  this.htmlEditor.setValue(defaultHtmlText);
  this.cssEditor.setValue(defaultCssText);
  this.jsEditor.setValue(defaultJsText);
}

jsOnline.prototype.switchTab = function () {
  let that = this;
  let activeIndex = 0;

  for (let i = 0; i < that.tabItemList.length; i++) {
    that.tabItemList[i].onclick = function () {
      if (activeIndex !== i) {
        that.tabItemList[activeIndex].classList.remove('tab-active');
        that.tabItemList[i].classList.add('tab-active');

        that.editorWrapList[activeIndex].style.visibility = 'hidden';
        that.editorWrapList[i].style.visibility = 'visible';
        activeIndex = i;
      }
    }
  }
}

jsOnline.prototype.renderIframeContent = function () {
  let htmlText = this.htmlEditor.getValue();
  let cssText = this.cssEditor.getValue();
  let jsText = this.jsEditor.getValue();
  let iframeWindowObj = this.iframe.contentWindow;

  let inputStyleEle = iframeWindowObj.document.getElementById('input-style');
  let inputScriptEle = iframeWindowObj.document.getElementById('input-script');

  let headEle = iframeWindowObj.document.querySelector('head');
  let bodyEle = iframeWindowObj.document.querySelector('body');

  if (String(inputStyleEle) !== 'null' && String(inputScriptEle) !== 'null') {
    headEle.removeChild(inputStyleEle);
    bodyEle.removeChild(inputScriptEle);
  }

  let styleEle = iframeWindowObj.document.createElement('style');
  let scriptEle = iframeWindowObj.document.createElement('script');

  styleEle.id = 'input-style';
  scriptEle.id = 'input-script';

  styleEle.innerHTML = cssText;
  scriptEle.innerHTML = jsText;

  headEle.appendChild(styleEle);
  bodyEle.innerHTML = htmlText;
  bodyEle.appendChild(scriptEle);
}

jsOnline.prototype.editorOnChange = function () {
  let that = this;
  let throttleRenderIframeContent = _.throttle(function () {
    that.renderIframeContent();
  }, 2000);

  this.htmlEditor.on('change', throttleRenderIframeContent);

  this.cssEditor.on('change', throttleRenderIframeContent);

  this.jsEditor.on('change', throttleRenderIframeContent);
}

jsOnline.prototype.fullSscreen = function () {
  let fullScreenEle = document.getElementById('full-screen');
  let editorEle = document.getElementById('editor');

  fullScreenEle.onclick = function () {
    editorEle.style.display = editorEle.style.display !== 'none' ? 'none' : 'block';
  }
}

jsOnline.prototype.cleanConsole = function () {
  let cleanBtn = document.getElementById('clean-btn');
  let consoleContentEle = document.getElementById('console-content');

  cleanBtn.onclick = function () {
    consoleContentEle.innerHTML = '';
  }
}

jsOnline.prototype.init = function () {
  this.initWindowSize();
  this.listenWindowResize();
  this.initEditors();
  this.switchTab();
  this.renderIframeContent();
  this.editorOnChange();
  this.fullSscreen();
  this.cleanConsole();
}

window.onload = function () {
  new jsOnline().init();
}