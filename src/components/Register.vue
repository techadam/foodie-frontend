<template>
    <div class="account-form">
        <h3>Create your account</h3>
        <div class="form-group">
            <label for="">Sign up as</label>
            <div class="role-grid">
                <div class="role">
                    <span>Customer</span>
                    <input type="radio" id="customer" name="role" value="customer" v-model="data.role">
                    <label for="customer">
                        <span></span>
                    </label>
                </div>

                <div class="role">
                    <span>Driver</span>
                    <input type="radio" id="driver" name="role" value="driver" v-model="data.role">
                    <label for="driver">
                        <span></span>
                    </label>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="">Full name</label>
            <input type="text" v-model="data.name" class="form-control" placeholder="John doe" />
        </div>

        <div class="form-group">
            <label for="">Email</label>
            <input type="text" v-model="data.email" class="form-control" placeholder="example@gmail.com" />
        </div>
        
        <div class="form-group">
            <label for="">Password</label>
            <input type="password" v-model="data.password" class="form-control" placeholder="**********" />
        </div>

        <div class="form-group">
            <button class="btn btn-main-gradient btn-block" @click="$emit('eventact', {eventType: 'signup'})">Sign up</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Register'
}
</script>