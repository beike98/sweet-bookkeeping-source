import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    valueList : []
  } as RootState,
  mutations:{
    createValue(state,values){
      state.valueList.push(values)
    }
  }
})
