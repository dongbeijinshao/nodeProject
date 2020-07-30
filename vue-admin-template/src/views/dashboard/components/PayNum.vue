<!-- 总销售额 -->
<template>
  <div class="pay-num">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>总销售额</span>
        <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-question"></i></el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
  // import component from '@/component.vue'
  export default {
    name: 'payNum',
     props: {
      meta: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        
      }
    },
    // 组件
    components: {
      
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {
      
    },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted() {
      
    },
    // 添加属性方法
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>
  .total {
    &-sales {

    }
  }
    /* @import url(); 引入css类 */
    
</style>