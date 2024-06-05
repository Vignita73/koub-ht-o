const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const villeName = urlParams.get('villeName')
villeName.log(product);