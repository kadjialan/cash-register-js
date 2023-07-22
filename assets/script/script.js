const cash = document.getElementById('cash')
const price = document.getElementById('price')
const oneHundred = document.getElementById('one-hundred')
const twenty = document.getElementById('twenty')
const ten = document.getElementById('ten')
const five = document.getElementById('five')
const one = document.getElementById('one')
const quarter = document.getElementById('quarter')
const dime = document.getElementById('dime')
const nickel = document.getElementById('nickel')
const penny = document.getElementById('penny')
const form = document.getElementById('cash-register')
const resultPara = document.getElementById('result')

function checkCashRegister (price, cash, cid) {
  const currency = {
    PENNY: 1,
    NICKEL: 5,
    DIME: 10,
    QUARTER: 25,
    ONE: 100,
    FIVE: 500,
    TEN: 1000,
    TWENTY: 2000,
    'ONE HUNDRED': 10000
  }

  let cashTotalAmount = 0
  let diff = cash * 100 - price * 100
  const changeSum = diff
  let status = ''
  let change = []

  const filteredCid = cid.filter((element) => {
   return +element[1] !== 0
  })
  
  filteredCid.forEach((element) => {
    let curr = element[0]
    let currSum = +element[1] * 100
    cashTotalAmount += currSum
    let amount = 0
    
    while (diff >= currency[curr] && currSum > 0) {
      amount += currency[curr]
      diff -= currency[curr]
      currSum -= currency[curr]
    }
    console.log(amount)
    if (amount !== 0) {
      change.push([curr])
      
    }
  })

  if (diff === 0 && changeSum === cashTotalAmount) {
    status = 'CLOSED'
    change = cid
  } else if (diff < 0) {
    status = 'INSUFFICIENT_FUNDS'
    change = []
  } else {
    status = 'OPEN'
  }

  resultPara.innerHTML = `${status} // ${change}`
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const registerArray = [
    ['ONE HUNDRED', oneHundred.value],
    ['TWENTY', twenty.value],
    ['TEN', ten.value],
    ['FIVE', five.value],
    ['ONE', one.value],
    ['QUARTER', quarter.value],
    ['DIME', dime.value],
    ['NICKEL', nickel.value],
    ['PENNY', penny.value]
  ]

  checkCashRegister(price.value, cash.value, registerArray)
})
