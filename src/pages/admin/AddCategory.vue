<template>
    <dashboard-layout>
        <div slot="main-content">
            <h2 class="dash-title">Add category</h2>
            
            <section class="recent">
                <div class="">
                    <div class="activity-card pad-1">
                        <div class="form-group">
                            <label for="">Category name</label>
                            <input type="text" v-model="name" class="form-control" placeholder="Category name">
                        </div>

                        <div class="form-group">
                            <button @click="addCategory" class="btn btn-main">Submit</button>
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
    name: 'AddCategory',
    components: {
        DashboardLayout,
    },
    data() {
        return {
            name: ''
        }
    },
    methods: {
        addCategory() {
            if(!this.name) {
                return this.$alertify.error('Incomplete form data')
            }

            this.$axios.post(`${this.$apiUrl}/categories/add`, {name: this.name}, {
                headers: {
                    Authorization: `Bearer ${localStorage.authtoken}`
                }
            })
            .then(() => {
                this.$router.push('/admin/categories')
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