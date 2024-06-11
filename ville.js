const queryString = window.location.search;
const villeNameDisplay = document.querySelector('#villeNameDisplay');
const villeTemp = document.querySelector('#villeTemp');
const urlParams = new URLSearchParams(queryString);
const villeName = urlParams.get('villeName');
const villeCp = urlParams.get('villeCp');

console.log(queryString);
console.log(villeName, villeCp);

villeNameDisplay.innerHTML= villeName;