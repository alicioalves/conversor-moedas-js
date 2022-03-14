let currencyOne;
let currencyTwo;
let currencyAmount;
let currentDate = new Date();
let resultFormat = {style: 'currency', currency: currencyTwo};


function getExchangeRate(){
    fetch(`http://economia.awesomeapi.com.br/json/last/${currencyOne}-${currencyTwo}`).then(result => {
        if(result.ok)
            return result.json();
        else
            alert('Ocorreu um erro interno. Tente novamente mais tarde');
    }) .then (result => {
        init(result);
    })
}

function init(resultFromServer){
    let exchangeCode = Object.keys(resultFromServer);
    let exchangeRate = resultFromServer[exchangeCode].ask;
    let exchangeRateLocale = (exchangeRate * 1).toLocaleString('pt-BR', {
        style: 'currency',
        currency: currencyTwo,
    });
    let exchangeResult = (currencyAmount * exchangeRate).toLocaleString('pt-BR', {
        style: 'currency',
        currency: currencyTwo,
    });
    console.log(exchangeRate, exchangeResult);
    const exchangeName = document.getElementById('exchangeName');
    const exchangeRateElement = document.getElementById('exchangeRate');
    const opDate = document.getElementById('opDate');
    const exchangeResultElement = document.getElementById('exchangeResult');

    console.log(resultFromServer);
    exchangeName.innerHTML = resultFromServer[exchangeCode].name;
    exchangeRateElement.innerHTML = `1 ${currencyOne} igual a ${exchangeRateLocale} ${currencyTwo}`;
    opDate.innerHTML = `Em: ${currentDate.getDate()} / ${currentDate.getMonth()+1} / ${currentDate.getFullYear()} ${currentDate.getHours()} : ${currentDate.getMinutes()} : ${currentDate.getSeconds()}`;
    exchangeResultElement.innerHTML = `${currencyAmount} ${currencyOne} = ${exchangeResult}`;

    setVisibilityExchangeResultContainer();
}

function setVisibilityExchangeResultContainer(){
    const exchangeResultContainer = document.getElementById('exchangeResultContainer');
    
    exchangeResultContainer.style.visibility = 'visible';
}

document.getElementById('exchangeButton').addEventListener('click', () => {
    currencyOne = document.getElementById('listOfCurrencyOne').value;
    currencyTwo = document.getElementById('listOfCurrencyTwo').value;
    currencyAmount = document.getElementById('currencyAmount').value;
    if(!currencyOne || !currencyTwo){
        alert('Por favor, selecione as moedas.');
    } else if (!(/^[0-9]*$/.test(currencyAmount))) {
        alert('Por favor, digite um número válido.');
    } else if (currencyOne == currencyTwo){
        alert('Por favor, selecione moedas diferentes');
    } else
        getExchangeRate(currencyOne, currencyTwo);
})
