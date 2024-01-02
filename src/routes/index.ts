import {createRouter, createWebHistory} from "vue-router";

import Home from "../Pages/Home/Page.vue";
import Cards from "../Pages/Card/Page.vue";
import Card from "../Pages/Card/Id/Page.vue";
import Login from "../Pages/admin/login/Page.vue"

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            component: Login
        },
        {
            path: "/",
            component: Home
        },
        {
            path: "/card/edit/:id",
            component: Home
        },
        {
            path: "/card",
            component: Cards
        },
        {
            path: "/card/:id",
            component: Card
        }
    ]
})

export default routes;