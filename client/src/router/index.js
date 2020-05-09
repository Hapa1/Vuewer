import Vue from 'vue'
import router from 'vue-router'
import Test from '@/components/Test'

Vue.use(router)

export default new router({
    routes: [
        {
            path: '/test',
            name: 'Test',
            component: Test
        }
    ]
})

