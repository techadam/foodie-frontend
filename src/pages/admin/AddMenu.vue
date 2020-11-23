<template>
    <dashboard-layout>
        <div slot="main-content">
            <h2 class="dash-title">Add category</h2>
            
            <section class="recent">
                <div class="">
                    <div class="activity-card pad-1">
                        <form enctype="multipart/form-data">
                            <div class="form-group">
                                <label for="">Name</label>
                                <input type="text" v-model="menuItem.name" class="form-control" placeholder="Item name">
                            </div>

                            <div class="form-group">
                                <label for="">Category</label>
                                <select v-model="menuItem.category_id" class="form-control">
                                    <option value="">Choose</option>
                                    <option :value="category.id" v-for="(category, index) in categories" :key="index">
                                        {{category.name}}
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="">Price</label>
                                <input type="number" v-model="menuItem.price" min="1" class="form-control" placeholder="Item price">
                            </div>

                            <div class="form-group">
                                <label for="">image</label>
                                <input type="file" @change="saveImage($event)" class="form-control">
                            </div>
                            

                            <div class="form-group">
                                <button type="button" @click="addItem" class="btn btn-main">Submit</button>
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
            menuItem: {
                name: '',
                isAvailable: true,
                category_id: '',
                price: '',
                image: '',
            }
        }
    },
    mounted() {
        this.getCategories()
    },
    methods: {
        getCategories() {
            this.$axios.get(`${this.$apiUrl}/categories/all`)
            .then(res => {
                this.categories = res.data.data
            })
            .catch(error => {
                console.log(error.response)
            })
        },
        async saveImage(e) {
            const imageData = new FormData()
            imageData.append('file', e.target.files[0])
            imageData.append('upload_preset', 'insta-clone')
            imageData.append('cloud', 'coderesource')

            try {
                const result = await this.$axios.post(`https://api.cloudinary.com/v1_1/coderesource/image/upload`, imageData);
                this.menuItem.image = result.data.url
            }catch(error) {
                console.log(error.response);
            }
        },
        addItem() {
            const {name, price, category_id, image, isAvailable} = this.menuItem
            
            if(!name || !price || !category_id || !image) {
                return this.$alertify.error('Incomplete form data')
            }

            this.$axios.post(`${this.$apiUrl}/menu/add`, {name, price, category_id, image, isAvailable}, {
                headers: {
                    Authorization: `Bearer ${localStorage.authtoken}`
                }
            })
            .then(() => {
                this.$router.push('/admin/menu')
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