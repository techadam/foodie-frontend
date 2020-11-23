<template>
    <div class="account-wrapper">
        <div>
            <div>
                <div class="account-header">
                    <h3><span class="ti-bolt"></span> Foodie</h3>
                    <small>Awesome food and Beverages</small>
                </div>

                <div class="account-tabs">
                    <button :class="isActive === 0? 'is-active': ''" @click="isActive = 0">Login</button>
                    <button :class="isActive === 1? 'is-active': ''" @click="isActive = 1">Register</button>
                </div>

                <div class="account-form-wrapper">
                    <component :is="compsArr[isActive]" :data="compsData[isActive]" @eventact="processEvent"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'

export default {
    name: 'Account',
    data() {
        return {
            compsArr: [
                Login,
                Register,
            ],
            isActive: 0,
            compsData: [
                {
                    email: '',
                    password: '',
                },
                {
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                }
            ]
        }
    },
    methods: {
        processEvent(payload) {
            if(payload.eventType === 'signin') {
                this.signin()
            }else if(payload.eventType === 'signup') {
                this.signup()
            }
        },
        signin() {
            const { email, password } = this.compsData[this.isActive]

            if(!email || !password) {
                return this.$alertify.error('Incomplete credentials');
            }

            this.$axios.post(`${this.$apiUrl}/auth/login`, {
                email, 
                password
            })
            .then(res => {
                const data = res.data

                if(data.user.role !== 'admin') {
                    localStorage.token = JSON.stringify(data.token)
                    localStorage.user = JSON.stringify(data.user)
                    this.$store.commit('setUser', data.user)
                    this.$router.push('/')
                }
            })
            .catch(error => {
                this.$alertify.error(error.response.data.message)
            })
        },
        signup() {
            let { role, name, email, password } = this.compsData[this.isActive]

            if(!email || !password || !role || !name) {
                return this.$alertify.error('Incomplete form data');
            }
            
            this.$axios.post(`${this.$apiUrl}/auth/register`, {
                name, 
                email,
                password, 
                role
            })
            .then(res => {
                this.compsData[this.isActive] = {
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                }
                this.$alertify.success(res.data.message)
            })
            .catch(error => {
                this.$alertify.error(error.response.data.message)
            })

        }
    }
}
</script>
