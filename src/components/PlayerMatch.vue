<template>
  <div class="player-match">
    <div v-if="loading" class="loading"> 加载中... </div>
    <div v-else-if="error" class="error"> {{ error }} </div>
    <div v-else>
      <!-- 用户基本信息 -->
      <div class="user-info">
        <div class="info">
          <h2>顽主杯实盘赛  选手：{{ userinfo.nickname }}</h2>
          <span class="data">展示日期: {{ today_record.stock_date }}</span>
        </div>
      </div>
      
      <!-- 当日战绩 -->
      <div class="today-record">
        <div class="stats">
          <div class="stat-item">
            <div class="label">总收益</div> 
            <div class="value">{{ today_record.total_income }}</div>
          </div>
          <div class="stat-item">
            <div class="label">胜率</div>
            <div class="value">{{ today_record.win_rate }}</div>
          </div>
          <div class="stat-item">
            <div class="label">当日收益</div>
            <div :class="['value', parseFloat(today_record.today_income)>0 ? 'profit' : 'loss']">
              {{ today_record.today_income }}
            </div>
          </div>
          <!-- 仓位 today_record.cangwei -->
          <div class="stat-item">
            <div class="label">仓位</div>
            <div class="value">{{ today_record.cangwei }}</div>
          </div>
          <!-- 初始资产 init_fund -->
          <div class="stat-item">
            <div class="label">初始资产</div>
            <div class="value">{{ today_record.init_fund }}</div>
          </div>
        </div>
        <!-- 当前持仓图    -->
        <div class="current-position-chart pb5">
          <img :src="today_record.today_stock_img[0]?.replace(/\/watermark.*$/,'')" alt="当前持仓图" />
        </div>
        <!-- 当日持仓 -->
        <div class="positions">
          <h3>{{ today_record.stock_date }} 持仓</h3>
          <div class="position-list">
            <!-- 表头  -->  
            <div class="position-header">
              <span class="stock-name">名称</span>
              <span class="stock-code">代码</span>
              <span class="stock-fund">持仓额</span>
              <span class="stock-money">收益额</span>
            </div>
            <!-- Todo 点击弹出股票分时图 -->
            <div v-for="stock in today_record.today_stock" 
                 :key="stock.code" 
                 class="position-item">
              <span class="stock-name">{{ stock.name }}</span>
              <span class="stock-code">{{ stock.code }}</span>
              <span class="stock-fund">{{ Math.floor(stock.fund) }}万</span>
              <span :class="['stock-money', stock.money > 0 ? 'profit' : 'loss']">
                {{ Math.floor(stock.money * 100) / 100   }}万
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 历史记录 -->
      <div class="history">
        <h3>历史交易记录</h3>
        <!-- 表头 --> 
        <div class="record-header">
          <div class="record-date">日期</div>
          <div class="record-today-fund">当日资产</div>
          <div class="record-yesterday-fund">前日资产</div>
          <div class="record-income">收益率</div>
          <div class="record-operation">查看记录</div>
        </div>
        <div v-for="record in records" :key="record.id" class="record-item">
          <!-- 日期 -->
          <div class="record-date">{{ record.stock_date }}</div>
          <!-- 当日资产 today_fund -->
          <div class="record-today-fund"> 
            <span> {{ Math.floor(record.today_fund) }}万</span>
          </div>
          <!-- 前日资产 yesterday_fund -->
          <div class="record-yesterday-fund"> 
            <span> {{ Math.floor(record.yesterday_fund) }}万</span>
          </div>
          <!-- 收益率 -->
          <div class="record-income"> 
            <span :class="parseFloat(record.today_income) > 0 ? 'profit' : 'loss'">
              {{ record.today_income }}
            </span>
          </div>
          <!-- 操作 -->
          <div class="record-operation">
             <span @click="showTodayStock(record)">持仓记录</span>
             <!-- 分隔符 -->
             <span>|</span>
             <span @click="showDelivery(record)">交割图</span>
          </div>
        </div>
      </div>
 
      <!-- 悬浮窗口展示当日持仓详情 -->
    
      <!-- 交割单图 -->
      <div v-if="selectedRecord || deliveryImageUrl" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-button" @click="closeModal">关闭</button>
          <div v-if="deliveryImageUrl" style="width: 100%;transform: rotate(90deg);">
            <img :src="deliveryImageUrl?.replace(/\/watermark.*$/,'')" alt="交割单图" style="width: 255%; padding-left: 100px;" />
          </div>
          
          <h3 v-if="selectedRecord">当日持仓详情</h3>
          <!-- 表头 -->
          <div v-if="selectedRecord" class="stock-detail stock-detail-header">
            <span class="stock-name">名称</span>
            <span class="stock-code">代码</span>
            <span class="stock-fund">持仓额</span>
            <span class="stock-money">盈亏额</span>
          </div>
          <div v-if="selectedRecord"> 
            <div  v-for="stock in selectedRecord.today_stock" :key="stock.stock_id" class="stock-detail">
              <span class="stock-name">{{ stock.name }}</span>
            <span class="stock-code">{{ stock.code }}</span>
            <span class="stock-fund">{{ Math.floor(stock.fund) }}万</span>
            <span :class="['stock-money', stock.money > 0 ? 'profit' : 'loss']">
              {{ stock.money }}万
            </span>
          </div>
          </div>
        </div>
      </div>


  </div>
</div>
</template>

<script>
import api from '@/api'

export default {
  name: 'PlayerMatch',
  
  data() {
    return {
      loading: false,
      error: null,
      userinfo: {},
      today_record: {},
      records: [],
      selectedRecord: null, // 悬浮窗口展示当日持仓详情 
      deliveryImageUrl: null // 新增属性用于存储交割单图的 URL
   
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      this.loading = true
      this.error = null
      try {
        const data = await api.getPlayerMatch()
        if (data.code === 0) {
          this.userinfo = data.data.userinfo // 用户信息
          this.today_record = data.data.today_record // 当日战绩
          this.records = data.data.records // 历史记录
        } else {
          this.error = data.message || 'API返回错误'
          console.error('API返回错误:', data.message)
        }
      } catch (error) {
        this.error = '数据加载失败，请稍后重试'
        console.error('Error:', error)
      } finally {
        this.loading = false
      }
      },
    // 
    showTodayStock(record) {
      this.selectedRecord = record
    },
    showDelivery(record) {
      this.deliveryImageUrl = record.today_stock_img[0]; // 设置交割单图的 URL
    },
    // 关闭悬浮窗口
    closeModal() {
      this.selectedRecord = null;
      this.deliveryImageUrl = null; // 关闭时清空交割单图的 URL
    },
    showStockChart(stock) {
      // 在这里处理股票分时图的显示逻辑
      console.log(stock)
    }
  }
}
</script>

<style scoped>
.player-match {
  padding: 10px;
}
.pb5{
  padding-bottom: 5pt;
}
.current-position-chart {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 确保容器有足够的高度 */
  transform-origin: center; /* 设置旋转中心为div中心 */
}

.current-position-chart img {
  transform-origin: center; /* 设置旋转中心为图片中心 */
  position: relative; /* 确保图片在容器内定位 */
  width:100%;
}
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 5pt;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.position-item , .position-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.stock-code{
  text-align: left;
} 

.profit { color: #f56c6c; }
.loss { color: #67c23a; }
.loading, .error {
  text-align: center;
  padding: 20px;
}
.error { color: #f56c6c; }

/* 历史记录数据项 */
.record-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
/* 历史记录表头 */
.record-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
/* 当日持仓详情 */
.today-stock-details {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
}
.modal-overlay {
  position: fixed;    
  padding-left: 40px;
  top: 0;
  right: 0;
  width: 100%;
  height: 95%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  width: 80%;
    height: 98%;
  /* max-width: 500px; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.stock-detail {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
 
</style> 