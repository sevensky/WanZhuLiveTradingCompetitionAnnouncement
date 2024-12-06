<template>
  <div class="player-info">
    <h2>玩家信息</h2>
    <div class="info-content" v-if="userInfo">
      <div class="info-item">
        <span class="label">昵称：</span>
        <span>{{ userInfo.nickname }}</span>
      </div>
      <div class="info-item">
        <span class="label">ID：</span>
        <span>{{ userInfo.user_id }}</span>
      </div>
      <div class="info-item">
        <img :src="userInfo.avatar" class="avatar" v-if="userInfo.avatar">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerInfo',
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.player-info {
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
  
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
</style> 