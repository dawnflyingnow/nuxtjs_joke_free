import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
const store = () => new Vuex.Store({
    state: {
        count: 0,
        dataList: null,//数据列表
        page: 1,//当前页码
        type:'',//分类
    },
    mutations: {
        add(state) {
            state.count++
        },
        setDataList(state, data) {
            state.dataList = data
        },
        setPage(state, data) {
            state.page = data
        },
        setType(state, data) {
            state.type = data
        }
    },
    actions: {
        async getData({ commit,state }) {
            let params = {}
            params.page = state.page
            params.count = 12
            if(!!state.type){
                params.type = state.type
            }
            const paramsString = Object.keys(params).map(key => key + '=' + params[key]).join('&')

            const url = `https://api.apiopen.top/getJoke?${paramsString}`
            const {data} = await axios.get(url)

            commit('setDataList',data.result)            
        }
    }
})

export default store