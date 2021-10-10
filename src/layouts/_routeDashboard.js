import React from "react"
const Dashboard =  React.lazy(() => import("../views/dashboard"))
const User = React.lazy(() => import("../views/users"))
const Product = React.lazy(() => import("../views/products"))
const Categories = React.lazy(() => import("../views/categories"))
const Customers = React.lazy(() => import("../views/customers"))
const Sales = React.lazy(() => import("../views/sales"))
const Purchases = React.lazy(() => import("../views/purchases"))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/customers", name: "pelanggan", component: Customers },
  { path: "/products", name: "produk", component: Product },
  { path: "/categories", name: "kategori", component: Categories },
  { path: "/users", name: "pengguna", component: User },
  { path: "/sales", name: "penjualan", component: Sales },
  { path: "/purchases", name: "pembelian", component: Purchases },
]

export default routes;