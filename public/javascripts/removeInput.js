function removeInputFromField(field_id) {
  let field = document.getElementById(field_id);
  field.removeChild(field.lastChild);
}