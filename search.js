const submit = document.querySelector("#sub");
const localisation = document.querySelector("#localisation");
const villeDisplay = document.querySelector("#villeDisplay");

submit.addEventListener("click",function(){
    console.log("location =" + localisation.value);
    fetch("https://api.meteo-concept.com/api/location/cities?token=1aebfdf3069836a71bd533a70c5e08e8c3a72434d5857e61bb9400233d3e718e&search=" + localisation.value)
    .then(response => response.json())
    .then(data => {
        villeDisplay.innerHTML="";
        console.log(data);
        for (let i = 0; i < data.cities.length; i++) {
            const villeDiv = document.createElement('div');
            villeDiv.classList.add('villeDiv');
            const villeName = document.createElement('h2');
            villeName.innerText = data.cities[i].name + ' ( ' + data.cities[i].cp + ' )';
            villeDiv.appendChild(villeName);
            const villeBtn = document.createElement('a');
            villeBtn.href = "./ville.html?villeName=" + data.cities[i].name + "&villeCp=" + data.cities[i].cp;
            villeBtn.innerHTML = "<button>"+"selectionner"+"</button>"
            villeDiv.appendChild(villeBtn);
            villeDisplay.appendChild(villeDiv);
        }
    })
    .catch(error => alert("Erreur : " + error));
})