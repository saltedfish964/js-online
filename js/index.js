var editor1 = CodeMirror.fromTextArea(document.getElementById("code1"), {
  lineNumbers: true,
  styleActiveLine: true,
  matchBrackets: true,
  theme: 'hopscotch',
  scrollbarStyle: "simple",
  mode: "javascript",
});

var editor2 = CodeMirror.fromTextArea(document.getElementById("code2"), {
  lineNumbers: true,
  styleActiveLine: true,
  matchBrackets: true,
  theme: 'hopscotch',
  scrollbarStyle: "simple",
  mode: "javascript",
});

var editor3 = CodeMirror.fromTextArea(document.getElementById("code3"), {
  lineNumbers: true,
  styleActiveLine: true,
  matchBrackets: true,
  theme: 'hopscotch',
  scrollbarStyle: "simple",
  mode: "javascript",
});

editor1.setSize('100%', '100%');
editor2.setSize('100%', '100%');
editor3.setSize('100%', '100%');

var windowHeight = document.documentElement.clientHeight;
var windowWidth = document.documentElement.clientWidth;

var wrapList = document.getElementsByClassName('wrap');
var bigWrap = document.getElementById('big-wrap');

bigWrap.style.height = windowHeight + 'px';
bigWrap.style.width = windowWidth + 'px';

for (let i = 0; i < wrapList.length; i++) {
  wrapList[i].style.height = windowHeight / 2 + 'px';
  wrapList[i].style.width = windowWidth / 2 + 'px';
}

console.log(windowHeight, windowWidth)