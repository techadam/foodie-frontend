<template>
    <dashboard-layout>
        <div slot="main-content">
            <h2 class="dash-title">Overview</h2>
                    
            <div class="dash-cards">
                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-briefcase"></span>
                        <div>
                            <h5>Account Balance</h5>
                            <h4>$30,659.45</h4>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="">View all</a>
                    </div>
                </div>
                
                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-reload"></span>
                        <div>
                            <h5>Pending</h5>
                            <h4>$19,500.45</h4>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="">View all</a>
                    </div>
                </div>
                
                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-check-box"></span>
                        <div>
                            <h5>Processed</h5>
                            <h4>$20,659</h4>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="">View all</a>
                    </div>
                </div>
            </div>
            
            <section class="recent">
                <div class="">
                    <div class="activity-card">
                        <h3>Recent menu items</h3>
                        
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>price</th>
                                        <th>Available?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(menuItem, index) in menu" :key="index" >
                                        <td>#{{index + 1}}</td>
                                        <td><img :src="menuItem.image" style="border-radius: 50%" height="50px" width="50px" alt=""></td>
                                        <td>{{menuItem.name}}</td>
                                        <td>{{menuItem.category.name}}</td>
                                        <td>{{menuItem.price}}</td>
                                        <td>
                                            <span class="badge success" v-if="Number(menuItem.isAvailable) === 1">Available</span>
                                            <span class="badge warning" v-else>Not available</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </dashboard-layout>
</template>

<script>
import DashboardLayout from '@/components/Layouts/DashboardLayout'

export default {
    components: {
        DashboardLayout
    },
    name: 'AdminHome',
    data() {
        return {
            menu: []
        }
    },
    mounted() {
        this.getMenu()
    },
    methods: {
        getMenu() {
            this.$axios.get(`${this.$apiUrl}/menu/all`)
            .then(res => {
                this.menu = res.data.data.slice(0, 3)
            })
            .catch(error => {
                console.log(error.response)
            })
        },
    }
}
</script>