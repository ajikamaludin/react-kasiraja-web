import React from "react"
const Dashboard =  React.lazy(() => import("../views/dashboard"))
const User = React.lazy(() => import("../views/users"))
const Product = React.lazy(() => import("../views/products"))
const Categories = React.lazy(() => import("../views/categories"))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/products", name: "produk", component: Product },
  { path: "/categories", name: "kategori", component: Categories },
  { path: "/users", name: "pengguna", component: User },
]

export default routes;