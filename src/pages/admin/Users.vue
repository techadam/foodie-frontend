<template>
    <dashboard-layout>
        <div slot="main-content">
            <h2 class="dash-title">Users</h2>
                    
            <div class="page-action">
                <button class="btn btn-main" @click="$router.push('/admin/user/add')"><span class="ti-plus"></span> Add user</button>
            </div>
            
            
            <section class="recent">
                <div class="">
                    <div class="activity-card">
                        <h3>Added users</h3>
                        
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(user, index) in users" :key="index" >
                                        <td>#{{index + 1}}</td>
                                        <td>{{user.name}}</td>
                                        <td>{{user.email}}</td>
                                        <td>{{user.role}}</td>
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
    name: 'Users',
    data() {
        return {
            users: []
        }
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        getUsers() {
            this.$axios.get(`${this.$apiUrl}/users/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.authtoken}`
                }
            })
            .then(res => {
                this.users = res.data.data
            })
            .catch(error => {
                console.log(error.response)
            })
        },
    }
}
</script>