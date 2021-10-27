chrome.runtime.onMessage.addListener((request) => {
  switch(request.type) {
    case 'insertText':
      insertText(request.text);
  }
});

function insertText(text) {
  const element = document.activeElement;
  if (!('value' in element)) return document.execCommand('insertText', false, text);

  const start = element.selectionStart || 0;
  const end = element.selectionEnd || 0;
  const prefix = element.value.substring(0, start);
  const suffix = element.value.substring(end, element.value.length);
  element.value = prefix + text + suffix;
  element.selectionStart = start;
  element.selectionEnd = start + text.length;
  element.focus();
}
