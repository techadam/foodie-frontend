<template>
    <dashboard-layout>
        <div slot="main-content">
            <h2 class="dash-title">Orders</h2>
            
            
            <section class="recent">
                <div class="">
                    <div class="activity-card">
                        <h3>Order history</h3>
                        
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>PayRef</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Date delivered</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(order, index) in orders" :key="index" >
                                        <td>#{{index + 1}}</td>
                                        <td>{{order.payment_ref}}</td>
                                        <td>{{order.amount}}</td>
                                        <td>{{order.status}}</td>
                                        <td>
                                            {{order.date_delivered}}
                                        </td>
                                        <td>
                                            <button class="btn btn-main"><span class="ti-info-circle"></span> View</button>
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
    name: 'Orders',
    data() {
        return {
            orders: []
        }
    },
    mounted() {
        this.getOrders()
    },
    methods: {
        getOrders() {
            this.$axios.get(`${this.$apiUrl}/orders/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.authtoken}`
                }
            })
            .then(res => {
                this.orders = res.data.data
                this.orders.map(order => {
                    order.items = JSON.parse(order.items)
                    return order
                })
            })
            .catch(error => {
                console.log(error.response)
            })
        },
    }
}
</script>