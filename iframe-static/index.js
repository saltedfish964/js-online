window.onerror = function (msg) {
  window.parent.addConsoleText(msg);
  return true;
}

console.log = function (msg) {
  window.parent.addConsoleText(msg);
}