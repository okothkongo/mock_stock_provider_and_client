// Data


const {faker} = require("@faker-js/faker/locale/en")


const  currentDate = () => new Date
const  six_hours_ago = () => new Date(currentDate().getTime()- (60 * 60 * 1000 * 6))
function company_constructor(){
  return {
    country: "USA",
    currency: "USD",
    stock_market: faker.commerce.productAdjective(),
    name: faker.company.name(),
    symbol: faker.company.name().substring(0, 3),
    category:`TBD-2022${Math.floor(Math.random() * 15)}`,
    stock_price: Number(faker.finance.amount()),
    timestamp: faker.date.between(six_hours_ago(), new Date )
  };

}

const range = Array.from({length: 1000}, (_, index) => index + 1)
const allCompanies = range.map(_ => company_constructor() );

const newCompanies = (timestamp) => allCompanies.filter(company => company.timestamp >= timestamp  );


// Rest API

const express = require('express')
const app = express()
const port = 3000

app.get('/api/companies', (req, res) => {
  res.send({data:   allCompanies})

})
app.get('/api/companies/:timestamp', (req, res) => {
   const timestamp = req.params.timestamp 
   date = new Date(timestamp)

  if (isNaN(Number(timestamp)) &&  date != "Invalid Date")  {    
    res.send({data:   newCompanies(date)})
  } else {
  
    res.send({data: {error: "invalid date time format"}})
  }

})

app.listen(port, () => {
  console.log(`the app started at port ${port}`)
})


// websocket server

const { Server } = require('ws');
 
const sockserver = new Server({ port: 5000 });
sockserver.on('connection', (ws) => {
   sockserver.clients.forEach((client) => {
      const data = JSON.stringify({data: allCompanies});
       client.send(data);
     
  })
   console.log('New client connected!'); 
  
});


setInterval(() => {
  sockserver.clients.forEach((client) => {
      const data = JSON.stringify({data: allCompanies});
     client.send(data);
      
  });
}, 3000 * 1000); // you can mess around with value to increase or decrease push interval


// websocket cleint

const {Socket, Channel} = require("phoenix-channels")
let client_socket = new Socket("ws://localhost:4000/socket/new_companies")
client_socket.connect()
let channel = client_socket.channel("companies:new_companies")
channel.join()
channel.on("new_companies", new_companies =>{console.log(new_companies)})