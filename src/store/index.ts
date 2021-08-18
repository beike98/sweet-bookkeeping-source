import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    valueList : []
  } as RootState,
  mutations:{
    createValue(state,values){
      state.valueList.push(values)
      store.commit('saveValue')
    },
    saveValue(state){
      localStorage.setItem('valueList',JSON.stringify(state.valueList))
    },
    fetchValue(state){
      state.valueList = JSON.parse(window.localStorage.getItem('valueList') || '[]')
    }
  }
})
