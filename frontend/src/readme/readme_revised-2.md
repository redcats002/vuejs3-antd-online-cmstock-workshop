# Revised 15/6/2023
=========================
- Q1.Stock is not initialize
=> 
=========================
- Q2.Fix responsive a-table
=> Fix on App.vue (layout)
- on a-layout add tw-overflow-auto to it making responsive
- Add hasSider attribute to root a-layout to make responsive whether contain Sider in children 
Fix on Stock.vue (a-table)
- add tribute scroll like :scroll={x:200} //by 200 is nunber of pixel in x that table will overflow
=========================
- Q3.defineProps, defineEmits by <script setup> and setup function defineComponents
=>  <script setup> is top-level binding it will execute every time an instance of the component is created.
- using Composition API inside Single-File Components (SFCs)

references:
https://youtu.be/9whgkjxoCME?t=818 
https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits 
=========================
- Q4.Binding Icon of ant-design
=> use <Icon :componet="props.icon"></Icon> instead of v-for and v-if v-else check condition
=========================