<template>
  <div class="match-info">
    <h2>比赛信息</h2>
    <div class="info-content" v-if="matchInfo">
      <div class="info-item">
        <span class="label">比赛名称：</span>
        <span>{{ matchInfo.match_name }}</span>
      </div>
      <div class="info-item">
        <span class="label">比赛时间：</span>
        <span>{{ matchInfo.match_time }}</span>
      </div>
      <div class="info-item">
        <span class="label">状态：</span>
        <span :class="['status', matchInfo.status]">
          {{ matchInfo.status_text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchInfo',
  props: {
    matchInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.match-info {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .info-content {
    margin-top: 10px;
  }

  .info-item {
    margin: 8px 0;
    
    .label {
      font-weight: bold;
      margin-right: 10px;
    }
  }

  .status {
    padding: 2px 8px;
    border-radius: 4px;
    &.active { background: #67C23A; color: #fff; }
    &.finished { background: #909399; color: #fff; }
    &.pending { background: #E6A23C; color: #fff; }
  }
}
</style> 