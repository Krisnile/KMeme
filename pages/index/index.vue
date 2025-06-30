<template>
	<!-- 页面主体内容 -->
	<view class="content">
		<up-search placeholder="图片搜索" bg-color="#e3e3e3" v-model="keyword"></up-search>
		<up-swiper style="margin-top: 10px;" v-if="bannerList.length" :list="bannerList" keyName="image" showTitle radius="8" :autoplay="true" height="160"></up-swiper>
		<up-notice-bar text="欢迎来到 KMeme 相册系统!" bg-color="#ffffff"></up-notice-bar>
		
		<!-- 相册列表 -->
		<view class="album-list">
		    <view v-for="album in albumList" :key="album.id" class="album-item" @tap="goToAlbum(album)">
		        <up-lazy-load :image="album.img" :index="index" threshold="-450" border-radius="10"></up-lazy-load>
		        <view class="album-info">
					<text class="album-title">{{ album.title }}</text>
					<text class="album-tag">{{ album.tag }}</text>
		        </view>
		    </view>
		</view>
		
		<!-- footer信息 -->
		<view class="footer">
		  <text style="display: block;">© 2025 KMeme 版权所有</text>
		  <text style="display: block;">版本号：v1.0.0</text>
		</view>
		
	</view>
</template>

<script setup>
	import { getBanner, getHomeList } from '../../api/api.js'
	import { onLoad } from '@dcloudio/uni-app'
	import{
		ref,
		reactive	
	} from 'vue'
	
	const keyword = ref('')
	// 轮播数据
	const bannerList = ref([])
	// 相册数据
	const albumList = ref([])
	
	onLoad(() => {
		getBanner().then(res => {
			console.log(res, 'res')
			bannerList.value = res.bannerList
		})
		getHomeList().then(res => {
			console.log(res, 'getHomeList')
			albumList.value = res
		})
	})
	// 点击相册跳转详情页
	function goToAlbum(album) {
		uni.navigateTo({
			url: `/pages/album/album?id=${album.id}&title=${encodeURIComponent(album.title)}`
		})
	}

</script>

<style>
	page {
		background-color: rgb(240, 240,, 240,);
	}
</style>

<style lang="scss" scoped>
	.content {
	  padding: 20rpx;
	}
	.album-list {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  margin-top: 20rpx;
	}
	
	.album-item {
	  width: 48%;
	  margin-bottom: 20rpx;
	  cursor: pointer;
	}
	
	.album-info {
	  margin-top: 10rpx;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	
	.album-title {
	  font-size: 28rpx;
	  font-weight: bold;
	  color: #333;
	}
	
	.album-tag {
	  font-size: 24rpx;
	  color: #888;
	}
	.footer {
	  text-align: center;
	  font-size: 24rpx;
	  color: #999;
	  padding: 20rpx 0;
	}

</style>
