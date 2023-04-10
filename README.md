# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary: The useful tool to scrape products information from Amazon via WebScrapingApi
* Version 1.0.0 

### How do I get set up? ###

* Set up git hooks
    * `cd hooks`
    * `/bin/bash initHooks.sh`
* Summary of set up
    * `npm i`
* How to run tests
    * `npm run test`
* How to run development 
    * `npm run watch`
* Build instructions
    * `npm run build`


### Call API
* You can use `data` folder which has collection postman 
* eg: 

`
curl --location 'localhost:3000/products?engine=lazada&link=https%3A%2F%2Fwww.lazada.vn%2Fcatalog%2F%3Fq%3Dpokemon%26from%3Dinput' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5hbS10aGFuZyIsImlhdCI6MTY4MDg1MDgxNywiZXhwIjoxNjgxNDU1NjE3fQ.0ZfRuliZ1x6qoC-D1SgIBNLmRv92tZQ0pvdBvFWmppk' \
--data ''
`

