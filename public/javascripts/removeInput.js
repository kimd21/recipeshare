function removeInputFromField(field_id) {
  let field = document.getElementById(field_id);
  if (field.lastChild.tagName == 'INPUT') {
    field.removeChild(field.lastChild);
  }
}