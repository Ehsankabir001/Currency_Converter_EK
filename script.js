const main = document.querySelector(".main");
const amount_input= document.querySelector("#amount");
const from = document.querySelector("#from_currency");
const to = document.querySelector("#to_currency");
const result = document.querySelector("#result");


window.addEventListener("load", async ()=>{
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();
    // console.log(data);
    const currency_options = Object.keys(data.rates);
    
    currency_options.forEach(currency => {
        const option1 = document.createElement("option")
        option1.value = currency;
        option1.textContent = currency;
        from.appendChild(option1);
        
        const option2 = document.createElement("option")
        option2.value = currency;
        option2.textContent = currency;
        to.appendChild(option2);
    })
})

main.addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount =parseFloat(amount_input.value);
    const fromValue = from.value;
    const toValue = to.value;

    if(amount < 0 ){
        alert("Enter a valid amount");
        return;
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromValue}`);
    const data = await response.json();

    const rate = data.rates[toValue];
    const convertedAmount = (amount*rate).toFixed(2);

    result.textContent = `${amount} ${fromValue} = ${convertedAmount} ${toValue}`;
})