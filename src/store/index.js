import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        loader: false,
        user: null,
    },
    getters: {
        getUser: (state) => {
            const user = localStorage.getItem('user')
            if(state.user != null) return state.user

            if(user && JSON.parse(user)) return JSON.parse(user)

            return null
        }
    },
    mutations: {
        setUser: (state, payload) => {
            state.user = payload
        },
    },
    actions: {
        
    }
})

export default store