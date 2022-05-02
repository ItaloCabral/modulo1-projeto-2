function parseMoney(value){
  if(value == ''){
    return "R$ 0,00"
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, minimumIntegerDigits: 1 })
}

function handleChangeAmount(element) {
  let value = element.value

  value += ''
  value = parseInt(value.replace(/[\D]+/g, ''))
  value += ''
  value = value.replace(/([0-9]{2})$/g, ",$1")

  if (value.length > 6) {
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
  }

  if(value != 'NaN'){
    element.value = value
  }else{
    element.value = ''
  }
 
}

function handleSubmit(){
  const type = document.getElementById('type')
  const name = document.getElementById('name')
  const amount = document.getElementById('amount')

  const inputs = [type, name, amount]

  inputs.forEach(input => {
    if(input.value.length == 0){
      input.classList.add('error')
      input.addEventListener('focus', () => input.classList.remove('error') )
    }
  })
  
  const isValid = inputs.every(input => input.value.length > 0)

  if(isValid){
    saveTransaction(type.value, name.value, amount.value)
    location.reload()
    return;
  }

  alert("Preencha todos os campos")

}

function saveTransaction(type, name, amount){
  const transactions = localStorage.transactions ? JSON.parse(localStorage.transactions) : []

  const transaction = {
    type,
    name,
    amount
  }

  transactions.push(transaction)

  localStorage.transactions = JSON.stringify(transactions)

}

function clearTransactions(){
  localStorage.clear()
  location.reload()
}

(function (){
  const tableBody = document.querySelector("#statement")
  const totalAmount = document.querySelector('#totalAmount')
  const transactions = localStorage.transactions ? JSON.parse(localStorage.transactions) : []

  if(transactions.length == 0){
    tableBody.innerHTML = `
      <tr>
        <td colspan="3">Nenhuma transação cadastrada</td>
      </tr>
    `
    return;
  }

  let total = 0

  transactions.forEach(transaction => {

    const tr = document.createElement('tr')
    let value = parseFloat(transaction.amount.replace('.', '').replace(',', '.'))

    if(transaction.type == '+'){
      value > 0 ? total += value : total -= value
    }else{
      value < 0 ? total -= value : total -= value
    }

    tr.innerHTML = `
      <td>${transaction.type}</td>
      <td>${transaction.name}</td>
      <td>R$ ${parseMoney(transaction.amount)}</td>
    `
    tableBody.appendChild(tr)
    
  })
  
  const parsedTotal = parseMoney(total)

  totalAmount.innerHTML = `${parsedTotal} <span>[${total > 0 ? "LUCRO" : "PREJUIZO"}]</span>`
})()
