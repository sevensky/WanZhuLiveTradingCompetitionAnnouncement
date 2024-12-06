<template>
  <div class="match-record">
    <h2>比赛记录</h2>
    <div class="record-list" v-if="records.length">
      <div class="record-item" v-for="(record, index) in records" :key="index">
        <div class="record-header">
          <span class="time">{{ record.match_time }}</span>
          <span :class="['result', record.result]">
            {{ record.result === 'win' ? '胜' : '负' }}
          </span>
        </div>
        <div class="record-detail">
          <div class="detail-item">
            <span class="label">对手：</span>
            <span>{{ record.opponent_name }}</span>
          </div>
          <div class="detail-item">
            <span class="label">分数：</span>
            <span>{{ record.score }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      暂无比赛记录
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchRecord',
  props: {
    records: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.match-record {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .record-list {
    margin-top: 10px;
  }

  .record-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
  }

  .record-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .time {
      color: #909399;
      font-size: 14px;
    }
    
    .result {
      padding: 2px 12px;
      border-radius: 4px;
      &.win { background: #67C23A; color: #fff; }
      &.lose { background: #F56C6C; color: #fff; }
    }
  }

  .record-detail {
    margin-top: 8px;
    
    .detail-item {
      margin: 4px 0;
      
      .label {
        font-weight: bold;
        margin-right: 10px;
      }
    }
  }

  .empty {
    text-align: center;
    color: #909399;
    padding: 20px 0;
  }
}
</style> 