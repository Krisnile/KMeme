<template>
	<view class="album-box">
 		<view class="list">
			<up-waterfall v-model="flowList" ref="uWaterfallRef">
				<template v-slot:left="{ leftList }">
					<view class="demo-warter" v-for="(item,index) in leftList" :key="index">
						<up-lazy-load threshold="-450" border-radius="10" :image="item.img" :index="index"></up-lazy-load>
						<view class="demo-title">
							{{ item.title }}
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								{{ item.tag[0] }}
							</view>
							<view class="demo-tag-text">
								{{ item.tag[1] }}
							</view>
						</view>
						<view class="isCollected" v-if="item.isCollected">
							{{ item.isCollected }}
						</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view class="demo-warter" v-for="(item,index) in rightList" :key="index">
						<up-lazy-load threshold="-450" border-radius="10" :image="item.img" :index="index"></up-lazy-load>
						<view class="demo-title">
							{{ item.title }}
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								{{ item.tag[0] }}
							</view>
							<view class="demo-tag-text">
								{{ item.tag[1] }}
							</view>
						</view>
						<view class="isCollected" v-if="item.isCollected">
							{{ item.isCollected }}
						</view>
					</view>
				</template>
			</up-waterfall>
		</view>
		<view v-if="showTopBtn" @click="toTop" class="topClass">
			<up-icon name="arrow-upward" color="#ffffff" size="28"></up-icon>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onPageScroll } from '@dcloudio/uni-app'
import { getAlbumImages } from '../../api/api.js' // 替换为你具体的接口

const title = ref('相册')
const flowList = ref([]) // 瀑布流图像列表

onLoad((options) => {
	// 接收页面传参
	const albumId = Number(options.id)
	title.value = decodeURIComponent(options.title || '相册')
	// 滚动是否显示 0不显示 1显示
	const showTopBtn = ref(0)

	// 设置页面标题
	uni.setNavigationBarTitle({ title: title.value })

    // 请求后端该相册的图像数据
	getAlbumImages(albumId)
		.then(res => {
		  // 假设 res.data 是 [{ img, title, tag, isCollected }, ...]
		  flowList.value = res.data || []
		})
		.catch(() => {
		  uni.showToast({
			title: '加载图片失败',
			icon: 'none'
		  })
    })
	// 监听滚动
	onPageScroll((e) => {
		if (e.scrollTop > 600) {
			showTopBtn.value = 1
		} else {
			showTopBtn.value = 0
		}
	})
	// 置顶效果
	const toTop = () => {
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 300
		})
	}
})
</script>

<style>
	page {
		background-color: rgb(240, 240,, 240,);
	}
</style>

<style lang="scss" scoped>
	.album-box {
	  padding: 20rpx;
	}
	.list {
		margin: 30rpx 0;
		.demo-warter {
			margin: 10rpx 10rpx 10rpx 0;
			background-color: #fff;
			border-radius: 16rpx;
			padding: 16rpx;
			position: relative;
		}
		.demo-title {
			font-size: 30rpx;
			margin-top: 10rpx;
			color: #303133;
		}
		.demo-tag {
			display: flex;
			margin-top: 10rpx;
			.demo-tag-owner {
				border: 1px solid rgb(252, 163, 129);
				color: #ffaa00;
				font-size: 20rpx;
				display: flex;
				align-items: center;
				padding: 4rpx 14rpx;
				border-radius: 50rpx;
			}
			.demo-tag-text {
				border: 1px solid #00aaff;
				color: #00aaff;
				font-size: 20rpx;
				display: flex;
				align-items: center;
				padding: 4rpx 14rpx;
				border-radius: 50rpx;
			}
		}
		.isCollected{
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			font-size: 24rpx;
			color: #fff;
			line-height: 32rpx;
			background-color: #ff0000;
			text-align: center;
			border-radius: 10rpx;
			padding: 4rpx 10rpx;
		}
	}
	.topClass {
		position: flex;
		bottom: 120rpx;
		right: 30rpx;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 20rpx;
		width: 44rpx;
		height: 44rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>
