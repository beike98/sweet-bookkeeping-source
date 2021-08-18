import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

type RootState = {
  valueList: valueItem[],
  tagList: string[],
}
type valueItem = {
  myType:string,
  myDate:string,
  myMoney:string,
  myClass:string,
  myRemark:string
}

export const store = new Vuex.Store({
  state: {
    valueList : [],
    tagList:['餐饮','购物','医疗','交通','房租','还款','工资'],
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
      state.valueList = JSON.parse(localStorage.getItem('valueList') || '[]')
    },
    createTag(state,tag){
      state.tagList.push(tag)
      store.commit('saveTag')
    },
    saveTag(state){
      localStorage.setItem('tagList',JSON.stringify(state.tagList))
    },
    fetchTag(state){
      store.commit('saveTag')
      state.tagList = JSON.parse(localStorage.getItem('tagList') || '[]')
    },
    removeTag(state,index){
      state.tagList.splice(index,1)
      store.commit('saveTag')
    }
  }
})
