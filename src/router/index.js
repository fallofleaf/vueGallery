import {createRouter, createWebHistory} from "vue-router";
import Index from "../components/Index"
import Search from "@/components/Search";

const routes = [
    {path: '/', component: Index},
    {path: '/search', component: Search},
]


export const router = createRouter({
    history: createWebHistory(),
    routes,// `routes: routes` 的缩写
})