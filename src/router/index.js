import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

// Define route components.
import Home from '@/pages/Home'
import Account from '@/pages/Account'

//Admin routes
import Dashboard from '@/pages/admin/Index'
import Login from '@/pages/admin/Login'
import Categories from '@/pages/admin/Categories'
import AddCategory from '@/pages/admin/AddCategory'
import Orders from '@/pages/admin/Orders'
import Menu from '@/pages/admin/Menu'
import AddMenu from '@/pages/admin/AddMenu'
import Users from '@/pages/admin/Users'
import AddUser from '@/pages/admin/AddUser'


// Define some routes
const routes = [
    { path: '/', component: Home },
    { path: '/account', component: Account },
    { path: '/admin/login', component: Login },
    { path: '/admin/dashboard', meta: { requiresAuth: true, admin: true }, component: Dashboard },
    { path: '/admin/categories', meta: { requiresAuth: true, admin: true }, component: Categories },
    { path: '/admin/category/add', meta: { requiresAuth: true, admin: true }, component: AddCategory },
    { path: '/admin/menu', meta: { requiresAuth: true, admin: true }, component: Menu },
    { path: '/admin/menu/add', meta: { requiresAuth: true, admin: true }, component: AddMenu },
    { path: '/admin/orders', meta: { requiresAuth: true, admin: true }, component: Orders },
    { path: '/admin/users', meta: { requiresAuth: true, admin: true }, component: Users },
    { path: '/admin/user/add', meta: { requiresAuth: true, admin: true }, component: AddUser },
]

// Create the router instance and pass the `routes` option
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    const admin = JSON.parse(localStorage.getItem("admin"));
    const authtoken = localStorage.getItem("authtoken");
    
    if(to.meta.admin && to.meta.admin === true) {
        if(!authtoken || authtoken === null) {
            next('/admin/login')
        }

        if(!admin || admin === null) {
            next('/')
        }
        
        if(admin.role !== 'admin') {
            next('/')
        }
        
    }

    if (to.path === '/admin/login') {
        if (authtoken) {
          return next('/admin/dashboard')
        }
    }

    if (to.path === '/account') {
        if (token) {
          return next('/')
        }
    }

    if (to.path !== '/account') {
        if (!token) {
            return next()
        }
    }
    next()
})


export default router