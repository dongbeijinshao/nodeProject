<template>
  <div class="dashboard-container">
    <!-- 头部展示的四小块 -->
    <div class="dashboard-header">
      <el-row :gutter="20">
        <el-col
        :sm="24" 
        :md="6" 
        v-for="item of headerList" 
        :key="item.name"
        >
          <component 
           :is="item.name"
           :meta="item.meta" 
          />
      </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// 运营活动效果
import operationalActivity from './components/OperationalActivity'

// 订单总量
import orders from './components/Orders'

// 支付数量
import payNum from './components/PayNum'

// 总销售额
import totalSales from './components/TotalSales'

export default {
  name: 'Dashboard',
  components: { 
    totalSales,
    orders, 
    payNum,
    operationalActivity
  },
  data() {
    return {
      headerList: [
        { 
          name: 'totalSales',
          meta: { 
            title: '总销售额',
            hoverTip: '总销售额',
            show: '¥126,560',
            data: [],
             footLabel: [
              {
                label: '日均销售额',
                value: '¥23456'
              }
            ]
          }
        }, 
        { 
          name: 'orders',
          meta: { 
            title: '订单量',
            hoverTip: '订单量',
            show: '8846',
            data: [],
            footLabel: [
              {
                label: '日订单量',
                value: '1,234'
              }
            ]
          }
        },
        { 
          name: 'payNum',
          meta: { 
            title: '支付笔数',
            hoverTip: '支付笔数',
            show: '6560',
            data: [],
             footLabel: [
              {
                label: '转化率',
                value: '60%'
              }
            ]
          }
        },
        { 
          name: 'operationalActivity',
          meta: { 
            title: '运营活动效果',
            hoverTip: '运营活动效果',
            show: '78%',
            data: [],
             footLabel: [
              {
                label: '同周比',
                value: '12%'
              },
               {
                label: '日环比',
                value: '80%'
              }
            ]
          }
        }
      ]
    }

  },
  created() {
      this._initData();
  },
  methods: {
    // 初始化数据
    _initData() {
      console.log(1111)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
