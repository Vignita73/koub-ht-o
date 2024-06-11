const queryString = window.location.search;
const villeNameDisplay = document.querySelector('#villeNameDisplay');
const villeTemp = document.querySelector('#villeTemp');
const btnClear = document.querySelector('#storageClear');
const urlParams = new URLSearchParams(queryString);
const villeName = urlParams.get('villeName');
const villeCp = urlParams.get('villeCp');

console.log(queryString);
console.log(villeName, villeCp);

villeNameDisplay.innerHTML= villeName;

localStorage.setItem('selectedVilleName', villeName);
localStorage.setItem('selectedVilleCp', villeCp);


btnClear.addEventListener('click',function(){
    localStorage.clear();
    alert('Les données ont été effacées.');
    window.location.href = "./index.html";
});