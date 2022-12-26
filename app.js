const express = require('express')
const {faker} = require("@faker-js/faker/locale/en")
const app = express()
const port = 3000

function company_constructor(){
  return {
    country: "USA",
    currency: "USD",
    stock_market: faker.commerce.productAdjective(),
    name: faker.company.name(),
    symbol: faker.company.name().substring(0, 3),
    category: faker.commerce.department(),
    stock_price: faker.finance.amount()
  };

}

const range = Array.from({length: 1000000}, (_, index) => index + 1)
const all_companies = range.map(_ => company_constructor() );


app.get('/api/companies/new_companies', (req, res) => {
  res.send({data: all_companies})

})

app.listen(port, () => {
  console.log(`the app started at port ${port}`)
})
