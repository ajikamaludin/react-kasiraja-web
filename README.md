## kasirAja web
contoh react SPA POS ( point of sales ) built with react

### backend
`Hapijs REST API - kasirAja`: [Link](https://github.com/ajikamaludin/hapi-kasiraja-api)

### feature
- nodejs rest api
- bisa lebih dari 1 toko `multi store`
- bisa lebih dari 1 kasir `multi users`
- pengelolaan produk, stok dan unit
- pembelian
- penjualan
- diskon penjualan
- UI design use [ChakraUI](https://chakra-ui.com/)
### start 
- install

        npm install

- config .env file for api url/endpoint

        cp .env.example .env

- run the app

        npm run start

### deploy 
- build static 

        npm build

- compress `build` directory upload to your root hosts