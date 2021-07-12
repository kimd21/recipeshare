// Format feedback form
export function submitFeedbackForm(form) {
  let obj = new XMLHttpRequest();
  obj.onreadystatechange = () => {
    if (obj.readyState == 4) {
      if (obj.status == 200) {
        let r = JSON.parse(obj.responseText);
        alert(r.message);
      } else {
        alert('XMLHttp Status' + obj.status + '; ' + obj.statusText);
      }
    }
  };
  obj.open('post', form.action, true);
  obj.setRequestHeader('Content-Type', 'application/json');
  obj.send(JSON.stringify({ message: form.message.value}));
  return false;
}