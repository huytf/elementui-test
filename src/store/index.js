import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    worktab: {
      list: [
        {
          title: "首页",
          name: "hello",
          closable: false
        },
        /* {
          title: "Tab1",
          name: "table1",
          closable: true
        },
        {
          title: "Tab2",
          name: "table2",
          closable: true
        } */
      ],
      current: {
        title: "首页",
        name: "hello",
        closable: false
      }
    }
  },
  getters: {
    openTabs: state => {
      return state.worktab.list.map(item => item.name)
    }
  },
  mutations: {
    worktabRemove(state, name) {
      // 关闭标签
      let ind = state.worktab.list.findIndex(s => s.name === name)
      // if (ind > -1) {
        state.worktab.list.splice(ind, 1)
      // }
      if (name === state.worktab.current.name) {
        router.push({name:state.worktab.list[ind-1].name})
      }
    },
    worktabRoute(state, p) {
      let ind = state.worktab.list.findIndex(s => s.name === p.to.name)
      if (ind > -1) {
        // 标签已存在
        state.worktab.current = state.worktab.list[ind]
      } else {
        // 标签不存在，现在新建
        state.worktab.list.push(p.to)
      }
      state.worktab.current = p.to
    }
  },
  actions: {
    worktabRemove({ commit }, p) {
      commit('worktabRemove', p)
    },
    worktabRoute({ commit }, p) {
      commit('worktabRoute', p)
    }
  },
  modules: {
  }
})
