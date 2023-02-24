import  Binance  from "binance-api-node";

const API_KEY ="IeYIEuOzFwsifN8gCaRUoQWaj5127pJrJuFDNgNd3ssCp1WeA8pqPQlzpvPq1bvk"
const API_SECRET="MKAK0BOA50XtKhj10p9bNOLT1bl8b8je5A5s82cxop1HQCRCKsJ3hie3JvyS6Bfc"
const RISK = 20 // siempre se recomienda 1% del valor 
const SYMBOL = 'AAVEUSDT ' 
const LEVERAGE = 5  

const client = new Binance.default ({
    apiKey: API_KEY,
  apiSecret: API_SECRET
})
//1-calcula margen de riesgo 

const balances = await client.futuresAccountBalance()
const usdtBalance = balances.find(b =>b.asset === 'USDT' )
const margin = parseFloat(usdtBalance.balance) * RISK / 100.0
 
//console.log({margin,usdtBalance});
//2-cantidad de activo a arriesgar 
const entryPrice = (52.50).toFixed(2)
const qty = (margin * LEVERAGE /entryPrice ).toFixed(1)

//console.log({entryPrice, qty});


//3- crear orden de apalancamiento
await client.futuresLeverage({
    symbol: SYMBOL,
    leverage: LEVERAGE,
  })

 //4 Crear orden 
 const orderInfo = await client.futuresOrder({
    symbol: SYMBOL,
    side: 'BUY',
    type:'LIMIT',
    quantity: qty,
    price: entryPrice,
  }) 


console.log(orderInfo);