const defaultHtmlText = `<html style="color: green">
  <!-- this is a comment -->
  <head>
    <title>Mixed HTML Example</title>
    <style>
      h1 {font-family: comic sans; color: #f0f;}
      div {background: yellow !important;}
      body {
        max-width: 50em;
        margin: 1em 2em 1em 5em;
      }
    </style>
  </head>
  <body>
    <h1>Mixed HTML Example</h1>
    <script>
      function jsFunc(arg1, arg2) {
        if (arg1 && arg2) document.body.innerHTML = "achoo";
      }
    </script>
  </body>
</html>
`;

const defaultCssText = `.red-bg {
  background: red;
}`;

const defaultJsText = `function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
              find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}`;