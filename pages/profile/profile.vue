<template>
  <view class="container">
    <view class="title">我的信息</view>

    <view class="info-row">
      <view class="label">昵称：</view>
      <view class="value">{{ userInfo.nickName }}</view>
    </view>

    <view class="info-row">
      <view class="label">头像：</view>
      <image :src="userInfo.avatarUrl" class="avatar"></image>
    </view>

    <view class="info-row">
      <view class="label">UID：</view>
      <view class="value">123456</view>
    </view>

    <view class="info-row">
      <view class="label">注册时间：</view>
      <view class="value">2025-06-30</view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'

const userInfo = reactive({
  nickName: '测试用户',
  avatarUrl: '/static/catcats.jpg'
})
</script>

<style scoped>
.container {
  padding: 40rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
  color: #333;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.label {
  width: 160rpx;
  font-size: 30rpx;
  color: #666;
}

.value {
  font-size: 30rpx;
  color: #333;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  border: 2rpx solid #ccc;
}
</style>
