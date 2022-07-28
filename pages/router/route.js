import Index from '@/pages/tabbar/index/index.vue'
import Book from '@/pages/tabbar/book/index.vue'
import Order from '@/pages/tabbar/order/index.vue'
import My from '@/pages/tabbar/my/index.vue'
export default[
	{
		path:'/',
		component:Index
	},
	{
		path:'/index',
		component:Index
	},
	{
		path:'/book',
		component:Book
	},
	{
		path:'/order',
		component:Order
	},
	{
		path:'/my',
		component:My
	}
]