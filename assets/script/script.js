const cash = document.getElementById("cash");
const price = document.getElementById("price");
const oneHundred = document.getElementById("one-hundred");
const twenty = document.getElementById("twenty");
const ten = document.getElementById("ten");
const five = document.getElementById("five");
const one = document.getElementById("one");
const quarter = document.getElementById("quarter");
const dime = document.getElementById("dime");
const nickel = document.getElementById("nickel");
const penny = document.getElementById("penny");
const form = document.getElementById("cash-register");
const resultPara = document.getElementById("result");

function checkCashRegister(price, cash, cid) {
  const currency = {
    PENNY: 1,
    NICKEL: 5,
    DIME: 10,
    QUARTER: 25,
    ONE: 100,
    FIVE: 500,
    TEN: 1000,
    TWENTY: 2000,
    "ONE HUNDRED": 10000,
  };

  let cashTotalAmount = 0; 
  let diff = cash * 100 - price * 100;
  let changeSum = diff;
  let status = "";
  let change = [];

  let filteredCid = cid.filter((element) => element[1] !== 0).reverse();

  filteredCid.forEach((element) => {
    let curr = element[0];
    let currSum = element[1] * 100;
    cashTotalAmount += currSum;
    let amount = 0;

    while (diff >= currency[curr] && currSum > 0) {
      amount += currency[curr];
      diff -= currency[curr];
      currSum -= currency[curr];
    }
    if (amount !== 0) {
      change.push([curr, amount / 100]);
    }
  });

  if (diff === 0 && changeSum === cashTotalAmount) {
    status = "CLOSED";
    change = cid;
  } else if (diff < 0) {
    status = "INSUFFICIENT_FUNDS";
    change = [];
  } else {
    status = "OPEN";
  }

  resultPara.innerHTML = `${status} // ${change}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const registerArray = [
    ["PENNY", penny.value],
    ["NICKEL", nickel.value],
    ["DIME", dime.value],
    ["QUARTER", quarter.value],
    ["ONE", one.value],
    ["FIVE", five.value],
    ["TEN", ten.value],
    ["TWENTY", twenty.value],
    ["ONE HUNDRED", oneHundred.value],
  ];

  checkCashRegister(price.value, cash.value, registerArray);
  console.log(registerArray);
});
