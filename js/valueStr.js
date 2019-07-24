const defaultHtmlText = `<h1 class="my-h1">Welcome JsOnline</h1>
<button class="my-button" id="my-button">click</button>`;

const defaultCssText = `body {
  margin: 0;
  background: #eeeeee;
}
.my-h1 {
  text-align: center;
  color: #333333;
  margin-top: 10%;
}
.my-button {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}`;

const defaultJsText = `document.getElementById('my-button').onclick = function () {
  console.log('Hi!');
}`;