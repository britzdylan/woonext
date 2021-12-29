export default async function toggleFilterBlock(id, context) {
  let item = document.getElementById(id);
  if (item.style.display == 'none') {
    item.style.display = 'block';
    document.getElementById(`chevron-up-${context}`).style.display = 'none';
    document.getElementById(`chevron-down-${context}`).style.display = 'block';
    return;
  }

  if (item.style.display == 'block') {
    document.getElementById(`chevron-up-${context}`).style.display = 'block';
    document.getElementById(`chevron-down-${context}`).style.display = 'none';
    item.style.display = 'none';
    return;
  }
}
