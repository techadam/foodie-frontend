<template>
    <div class="front-wrapper">

        <div class="front-sidebar">
            <div class="brand">
                <h1><span class="ti-bolt"></span></h1>
            </div>

            <div class="front-sidemenu">
                <ul>
                    <li v-for="(category, index) in categories" :key="index" :class="active === index? 'active' : ''" @click="active = index">
                        <div>
                            <img src="../assets/img/fast-food.svg" alt="">
                            <h3 @click="getItems(category)">{{category.name}}</h3>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
        <Nav :cart="cart" :categories="categories" :user="user" />

        <div class="front-main">
            <div class="main-grid">
                <div class="menu-section">
                    <h3>{{selectedMenu? selectedMenu.name : ''}}</h3>

                    <div class="menu-grid" v-if="selectedMenu">
                        <div :style="`background-image: url(${item.image})`" class="menu-card" v-for="(item, index) in selectedMenu.menu_items" :key="index">
                            <div>
                                <span class="bg-main-gradient item-price">
                                    <span>&#8358;</span> {{item.price}}
                                </span>
                            </div>
                            <div>
                                <span class="item-name">{{item.name}}</span>
                            </div>

                            <button class="btn btn-main-gradient" @click="updateCart(item)">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
                <div class="cart-section">
                    <div class="cart-card">
                        <div class="cart-header">
                            <h3>New Order</h3>
                            <small>{{cart.length}} items in cart</small>
                        </div>

                        <div class="cart-body">
                            <div class="cart-items">
                                <div class="cart-item" v-for="(item, index) in cart" :key="index">
                                    <div class="cart-info">
                                        <span class="ti-trash" @click="dropItem(index)"></span>
                                        <div>
                                            <h5>{{item.name}}</h5>
                                            <small>@ {{(Number(item.price) * Number(item.qty)).toLocaleString()}}</small>
                                        </div>
                                    </div>
                                    <div class="cart-controls">
                                        <input type="text" readonly :value="item.qty">
                                        <div>
                                            <span class="ti-angle-up" @click="updateItemQty(index, item, 1)"></span>
                                            <span class="ti-angle-down" @click="updateItemQty(index, item, 0)"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="cart-sum">
                                <div class="cart-address">
                                    <div class="price-flex">
                                        <div>
                                            <small><b>Address</b></small>
                                            <p>{{address}}</p>
                                        </div>
                                        <button class="btn btn-main-gradient" @click="showAddressModal = true">
                                            <!--<span class="ti-location-pin"></span>--> Change
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div class="price-flex">
                                        <small>Subtotal</small>
                                        <small>{{cartTotal.toLocaleString()}}</small>
                                    </div>

                                    <div class="price-flex">
                                        <small>Total</small>
                                        <h4>{{cartTotal.toLocaleString()}}</h4>
                                    </div>
                                </div>

                                <div class="cart-pay-btn">
                                    <paystack
                                        :amount="cartTotal * 100"
                                        :email="user !== null? user.email : ''"
                                        :paystackkey="paystackkey"
                                        :reference="reference"
                                        :callback="createOrder"
                                        :close="close"
                                        :embed="false"
                                        :disabled="validateCheckoutData || user === null"
                                        class="btn btn-success"
                                        v-if="user !== null && address"
                                    >
                                        <span class="ti-credit-card"></span> Pay Now
                                    </paystack>

                                    <button v-else-if="!address" class="btn btn-success" @click="showAddressModal = true">
                                        Add delivery address
                                    </button>

                                    <button v-else class="btn btn-success" @click="$router.push('/account')">
                                        Login to continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <modal v-if="showAddressModal" @close="showAddressModal = false">
            <h4 slot="header">Provide your address</h4>

            <div slot="body">
                <div class="form-group">
                    <label for="">Your address</label>
                    <input type="text" class="form-control" v-model="address" placeholder="No 230, Abba road" />
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import paystack from 'vue-paystack'
import Nav from '@/components/Nav'
import modal from '@/components/Modal'

export default {
    name: 'Home',
    components: {
        paystack,
        modal,
        Nav,
    },
    data() {
        return {
            paystackkey: "pk_test_YOUR_PAYSTACK_TEST_KEY", //paystack public key
            categories: [],
            active: 0,
            cart: [],
            address: '',
            showAddressModal: false
        }
    },
    mounted() {
        this.getCategories()
        this.getCart()
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
        getCart() {
            this.cart = JSON.parse(localStorage.cart) || [];
        },
        updateCart(menuitem) {
            let cartDB = localStorage.getItem('cart')
            if(!cartDB || JSON.parse(cartDB).length < 1) {
                menuitem.qty = 1
                let cart = [menuitem]
                localStorage.setItem('cart', JSON.stringify(cart))
                this.cart.push(menuitem)
                
                this.$alertify.success('Item added to Cart');
                return
            }
            
            let cart = JSON.parse(cartDB)
            
            let isFound = false
            cart.map(item => {
                if(item.id === menuitem.id) {
                    isFound = true
                    item.qty += 1;
                    return item;
                }
            })

            if(!isFound) {
                menuitem.qty = 1
                cart.push(menuitem)
            }
            
            this.cart = cart
            localStorage.setItem('cart', JSON.stringify(cart))

            this.$alertify.success('Item added to Cart');
        },
        updateItemQty(index, item, flag) {
            if(flag === 0 && Number(item.qty) > 1) {
                item.qty = Number(item.qty) - 1
            }else{
                item.qty = Number(item.qty) + 1
            }

            this.cart[index] = item
            localStorage.setItem('cart', JSON.stringify(this.cart))

            this.$alertify.success('Cart successfully updated');
        },
        dropItem(index) {
            this.cart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(this.cart))
            this.$alertify.success('Item removed from Cart');
        },
        createOrder(response) {
            console.log(response.reference)
            const token = localStorage.token
            const data = {
                payment_ref: response.reference,
                amount: this.cartTotal,
                user_id: this.user.id,
                items: JSON.stringify(this.cart),
                address: this.address
            }

            this.$axios.post(`${this.$apiUrl}/create-order`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                localStorage.removeItem('cart')
                this.address = ''
                this.cart = []
                this.$alertify.success(res.data.message)
            })
            .catch(error => {
                if(error.response.data.message) {
                    return this.$alertify.error(error.response.data.message)
                }
                this.$alertify.error(Object.values(error.response.data)[0][0])
            })
        },
        close() {

        },
    },
    computed: {
        user() {
            return this.$store.getters.getUser
        },
        selectedMenu() {
            return this.categories[this.active]
        },
        cartTotal() {
            let total = 0
            this.cart.map(item => {
                total += Number(item.price) * Number(item.qty)
            })

            return total
        },
        reference() {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    
            for( let i=0; i < 10; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length))
            }
    
            return text;
        },
        validateCheckoutData() {
            //const {name, email, city, address, phone, zip} = this.checkout
            
            //return !name || !email || !city || !address || !phone || !zip
            return false
        }
    }
}
</script>
