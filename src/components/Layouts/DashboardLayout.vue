<template>
    <div>
        <input type="checkbox" id="sidebar-toggle">
        <div class="sidebar">
            <div class="sidebar-header">
                <h3 class="brand">
                    <span class="ti-bolt"></span> 
                    <span>Foodie</span>
                </h3> 
                <label for="sidebar-toggle" class="ti-menu-alt"></label>
            </div>
            
            <div class="sidebar-menu">
                <ul>
                    <li>
                        <router-link to="/admin/dashboard">
                            <span class="ti-home"></span>
                            <span>Home</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/categories">
                            <span class="ti-face-smile"></span>
                            <span>Categories</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/menu">
                            <span class="ti-agenda"></span>
                            <span>Menu</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/orders">
                            <span class="ti-clipboard"></span>
                            <span>Orders</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/users">
                            <span class="ti-folder"></span>
                            <span>Users</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        
        
        <div class="main-content">
            
            <header>
                <div class="search-wrapper">
                    <span class="ti-search"></span>
                    <input type="search" placeholder="Search">
                </div>
                
                <div class="social-icons">
                    <span @click="signout" class="ti-power-off"></span>
                    <div></div>
                </div>
            </header>
            
            <main>
                <slot name="main-content"></slot>
            </main>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardLayout',
    methods: {
        signout() {
            localStorage.removeItem('authtoken')
            localStorage.removeItem('admin')
            this.$router.push('/admin/login');
        }
    }
}
</script>