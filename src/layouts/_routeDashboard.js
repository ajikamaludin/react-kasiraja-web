import React from "react";
const Dashboard =  React.lazy(() => import("../views/dashboard"));
const ListProduct = React.lazy(() => import("../views/products"));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/products", name: "product", component: ListProduct }
]

export default routes;