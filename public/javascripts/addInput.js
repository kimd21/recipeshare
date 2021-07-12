// Add input to a list form
export function addInputToField(field_id, placeholder) {
  let field = document.getElementById(field_id);
  let input = document.createElement('input');

  input.type = 'text';
  input.placeholder = placeholder;
  input.name = field_id + '[]';

  field.appendChild(input);
}