function addstep(list_id) {
  // Get element of list with id
  let list = document.getElementById(list_id);

  // Create an input element
  let entry = document.createElement('input');
  entry.type = 'text';
  entry.id = 'step';

  // Create a button to submit input element
  let entryButton = document.createElement('button');
  entryButton.type = 'button';
  entryButton.id = 'stepbutton';

  // Append input elements to form
  list.appendChild(entry);
  list.appendChild(entryButton);

  // Append input value to list on button click
  document.getElementById('stepbutton').onclick = function() {
    let item = document.getElementById('step').value;
    let li = '<li>' + item + '</li>';
    list.appendChild(li);
  }
}