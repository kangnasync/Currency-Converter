const BASE_URL="https://open.er-api.com/v6/latest/";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const mssg=document.querySelector(".msg");

window.addEventListener("load",()=>{
    updateExchangeRate();
});

for(select of dropdowns){
 for(currCode in countryList){
    let newOptn=document.createElement("option");
    newOptn.innerText=currCode;
    newOptn.value=currCode;
    if(select.name==="from" && currCode==="USD"){
        newOptn.selected="selected";
    }
    else if(select.name==="to" && currCode==="INR"){
        newOptn.selected="selected";
    }
    select.append(newOptn);
}

    select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
});
}   

const updateFlag=(element)=>{
let currCode=element.value;
let countryCode=countryList[currCode];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
const updateExchangeRate=async()=>{
let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}/${fromCurr.value}`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data.rates[toCurr.value];
    let finalAmt=amtVal*rate;
    mssg.innerText=`${amtVal} ${fromCurr.value}=${finalAmt.toFixed(2)} ${toCurr.value}`
}
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});