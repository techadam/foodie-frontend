<template>
    <dashboard-layout>
        <div slot="main-content">
            <h2 class="dash-title">Add user</h2>
            
            <section class="recent">
                <div class="">
                    <div class="activity-card pad-1">
                        <form enctype="multipart/form-data">
                            <div class="form-group">
                                <label for="">Fullname</label>
                                <input type="text" v-model="user.name" class="form-control" placeholder="Name of user">
                            </div>

                            <div class="form-group">
                                <label for="">Email</label>
                                <input type="text" v-model="user.email" class="form-control" placeholder="Email of user">
                            </div>

                            <div class="form-group">
                                <label for="">Role</label>
                                <select v-model="user.role" class="form-control">
                                    <option value="">Choose</option>
                                    <option value="admin">Administrator</option>
                                    <option value="customer">Customer</option>
                                    <option value="driver">Driver</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="">Password</label>
                                <input type="password" v-model="user.password" class="form-control" placeholder="*********">
                            </div>
                            

                            <div class="form-group">
                                <button type="button" @click="addUser" class="btn btn-main">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    </dashboard-layout>
</template>

<script>
import DashboardLayout from '@/components/Layouts/DashboardLayout'

export default {
    name: 'AddMenu',
    components: {
        DashboardLayout,
    },
    data() {
        return {
            categories: [],
            user: {
                name: '',
                email: '',
                role: '',
                password: '',
            }
        }
    },
    mounted() {
        
    },
    methods: {
        addUser() {
            const {name, email, role, password} = this.user
            
            if(!name || !email || !role || !password) {
                return this.$alertify.error('Incomplete form data')
            }

            this.$axios.post(`${this.$apiUrl}/auth/register`, {name, email, role, password}, {
                headers: {
                    Authorization: `Bearer ${localStorage.authtoken}`
                }
            })
            .then(() => {
                this.$router.push('/admin/users')
            })
            .catch(error => {
                if(error.response.data.message) {
                    return this.$alertify.error(error.response.data.message)
                }
                this.$alertify.error(Object.values(error.response.data)[0][0])
            })
        }
    }
}
</script>

<style lang="css">
    .pad-1 {
        padding: 1rem
    }
</style>