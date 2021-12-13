import { createRouter, createWebHistory } from 'vue-router'

// set up Lunchbox router
// ====================
import OutlinedShape from './lunchbox/OutlinedShape/OutlinedShape.vue'
const lunchboxRouter = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: OutlinedShape, name: 'home' }],
})

// create Lunchbox app
// ====================
import { createApp as createLunchboxApp } from 'lunchboxjs'
import LunchboxApp from './lunchbox/LunchboxApp.vue'
const lunchboxApp = createLunchboxApp(LunchboxApp)
lunchboxApp.use(lunchboxRouter)

// set up HTML router
// ====================
import FrontPage from './html/FrontPage.vue'
const htmlRouter = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: FrontPage, name: 'home' }],
})
// Lunchbox router should follow HTML router
htmlRouter.afterEach((to) => lunchboxRouter.push(to))

// create HTML app
// ====================
import { createApp } from 'vue'
import HtmlApp from './html/HtmlApp.vue'
const htmlApp = createApp(HtmlApp)
htmlApp.use(htmlRouter)

// mount apps
// ====================
htmlApp.mount('#html-app')
lunchboxApp.mount('#lunchbox-app')

// autoblur
import { autoBlur } from 'auto-blur'
autoBlur('a')
autoBlur('button')
