// Create a stringified method that we can inject into the page.
var injectCode = '(' + function() {
  var oldConsoleLog = window.console.log;
  window.console.log = function(string) {
    if (typeof string === 'string') {
      var match = /TotalSeatsAvailable: ([0-9]+)/g.exec(string)
      if (match) {
        alert(match[1] + ' seats available');
      }
    }
    oldConsoleLog.apply(this, arguments);
  }
} + ')();';

document.documentElement.setAttribute('oncanplay', injectCode);
document.documentElement.dispatchEvent(new CustomEvent('canplay'));
document.documentElement.removeAttribute('oncanplay');
