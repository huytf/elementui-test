import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'
import Hello from '../components/HelloWorld.vue'
import Table1 from '../components/Table1.vue'
import Table2 from '../components/Table2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'hello',
        component: Hello,
        meta:{
          name:'首页'
        }
      },
      {
        path: 'table1',
        name: 'table1',
        component: Table1,
        meta:{
          name:'表格1'
        }
      },
      {
        path: 'table2',
        name: 'table2',
        component: Table2,
        meta:{
          name:'表格2'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to,from)
  next()
  store.dispatch('worktabRoute', {
    to: {
      title: to.meta.name,
      name: to.name,
      closable: true
    }
  })
})

export default router
