# Revised 14/6/2023
=========================
- Q1.paginator position
=> pagination object attributes with position key = ['topRight']
    :pagination={
        position:['topRight'],
    }
=========================  
- Q2.autocomplte (loading)
=> remove loading attributes - this attribute does not exist on a-auto-complete component  
=========================   
- Q3.debounce loading...
=> setTimeout(() => {
    setLoading(FetchingStatus.success)
  }, 1000)
=> remove a-skeleton and add loading attribute to a-table
=========================
- Q4.span -> flex
=> Fixed by flex-rows, flex-1
=========================
- Q5.fix overflow sidebar
=> Fixed by a-layout-sider (on collapsed event) with add default breakpoint attribute to that component too
after that trigger the event to emit the collapsed


here preset six dimensions: xs sm md lg xl xxl.
References:https://next.antdv.com/components/grid#components-grid-demo-responsive
=========================
- Q6.restore auth session
=> Fixed by call on mounted restoreSession in App.vue 
const authStore = useAuthStore()
onMounted(() => {
    authStore.restoreSession()
})
=========================
- Q7.a-table on define columns key vs dataIndex
=> 
dataIndex > key
So, key usually use when refer to template slot for changing component
but if dataIndex is unique just use dataIndex instead and no need define key

dataIndex : Display field of the data record
key : you can ignore this prop if you've set a unique dataIndex
references:
https://next.antdv.com/components/table/#column
=========================