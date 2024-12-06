<template>
  <div class="today-record">
    <h2>今日记录</h2>
    <div class="record-content" v-if="record">
      <div class="record-item">
        <span class="label">总场次：</span>
        <span>{{ record.total_matches || 0 }}</span>
      </div>
      <div class="record-item">
        <span class="label">胜场：</span>
        <span class="win">{{ record.wins || 0 }}</span>
      </div>
      <div class="record-item">
        <span class="label">负场：</span>
        <span class="lose">{{ record.losses || 0 }}</span>
      </div>
      <div class="record-item">
        <span class="label">胜率：</span>
        <span>{{ calculateWinRate(record) }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodayRecord',
  props: {
    record: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    calculateWinRate(record) {
      if (!record.total_matches) return 0
      return ((record.wins / record.total_matches) * 100).toFixed(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.today-record {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .record-content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .record-item {
    flex: 1;
    min-width: 120px;
    margin: 8px 0;
    
    .label {
      font-weight: bold;
      margin-right: 10px;
    }

    .win { color: #67C23A; }
    .lose { color: #F56C6C; }
  }
}
</style> 