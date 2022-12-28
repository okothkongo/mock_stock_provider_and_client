# 
This app consists of:
## REST API SERVER
The endpoints are
`api/companies` and `/api/companies/:timestamp`
whose response shown below  on sucess
```json
{
  "data": [
    {
      "category": "Music",
      "country": "USA",
      "currency": "USD",
      "name": "Collins - Purdy",
      "stock_market": "Ergonomic",
      "stock_price": 626.77,
      "symbol": "Col",
      "timestamp": "2022-12-28T00:31:11.988Z"
    }
  ]
}
```
 incase wrong data time format is used as timestamp `/api/companies/:timestamp` returns `422` and response body shown below.Timestamp should be in `UTC` timezone.

```json
{
 "error": "invalid date time format"
}
```

WEBSOCKET SERVER
This push new companies at given interval.

```json
```json
{
  "companies": [
    {
      "category": "Music",
      "country": "USA",
      "currency": "USD",
      "name": "Collins - Purdy",
      "stock_market": "Ergonomic",
      "stock_price": 626.77,
      "symbol": "Col",
      "timestamp": "2022-12-28T00:31:11.988Z"
    }
  ]
}
```
``
WEBSOCKET CLIENT

It listens on channel `"companies:new_companies"` and waits for message `"new_companies"`
## Dependencies
Nodejs

## Up and Running
* npm install
* run the server `node app.js`
