<template>
	<view class="album-container">
		<!-- 顶部导航 -->
		<up-status-bar></up-status-bar>
		<up-navbar
		  :border="false"
		  :bg-color="BarBg"
		  :title="title"
		  :title-style="titleStyle"
		  :left-icon-color="leftIconColor"
		  @leftClick="goBack"
		>
		</up-navbar>
		
		<view class="content">
 		<view class="list">
			<up-waterfall v-model="flowList" ref="uWaterfallRef">
				<!-- 左列 -->
				<template v-slot:left="{ leftList }">
					<view class="demo-warter" v-for="(item,index) in leftList" :key="index">
						<view @tap="previewImage(leftList, index)">
							<up-lazy-load threshold="-450" border-radius="10" :image="item.img" :index="index"></up-lazy-load>
						</view>
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
				
				<!-- 右列 -->
				<template v-slot:right="{ rightList }">
					<view class="demo-warter" v-for="(item,index) in rightList" :key="index">
						<view @tap="previewImage(rightList, index)">
							<up-lazy-load threshold="-450" border-radius="10" :image="item.img" :index="index"></up-lazy-load>
						</view>
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
		<!-- 置顶按钮 -->
		<view v-if="showTopBtn" @click="toTop" class="topClass">
			<up-icon name="arrow-upward" :color="topBtnIconColor" size="28"></up-icon>
		</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onPageScroll } from '@dcloudio/uni-app'
import { getAlbumImages } from '../../api/api.js'

const title = ref('相册')
const flowList = ref([]) // 瀑布流图像列表

// 滚动是否显示 0不显示 1显示
const showTopBtn = ref(0)

// 样式配置
const BarBg = '#5e2ec0'
// const navBarBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
const titleStyle = { color: "#fff", fontWeight: "bold" };
const leftIconColor = "#fff";
const topBtnIconColor = '#ffffff'

onLoad((options) => {
	// 接收页面传参
	const albumId = Number(options.id)
	const decodedTitle = decodeURIComponent(options.title || '相册')
	title.value = decodedTitle

	// 设置页面标题
	// uni.setNavigationBarTitle({ title: title.value })

    // 请求后端该相册的图像数据
	getAlbumImages(albumId)
		.then(res => {
		  // 假设 res.data 是 [{ img, title, tag, isCollected }, ...]
		  flowList.value = res.data || []
		  console.log('flowList.value:', flowList.value)
		})
		.catch(() => {
		  uni.showToast({
			title: '加载图片失败',
			icon: 'none'
		  })
    })
})

// 预览函数
  const previewImage = (list, index) => {
    const urls = list.map(item => item.img)
    uni.previewImage({
      urls,
      current: urls[index],
	  fail: (err) => {
	  	console.error('预览失败:', err)
	  	uni.showToast({ title: '预览失败', icon: 'none' })
	  }
    })
  }

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

// 返回上一页
const goBack = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};
</script>

<style>
	page {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}
</style>

<style lang="scss" scoped>
.album-container {
  padding: 20rpx;
  .content {
  	position: absolute;
  	top: 150rpx; 
  	left: 0;
  	right: 0;
  	bottom: 0;
      padding: 20rpx;
      padding-top: 50rpx; // 给顶部导航栏留出空间
      padding-bottom: 100rpx;
  	overflow-y: scroll;
  	box-sizing: border-box;
  }
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
	position: fixed;
	bottom: 120rpx;
	right: 30rpx;
	background-color: rgba(0, 0, 0, 0.7);
	padding: 20rpx;
	width: 44rpx;
	height: 44rpx;
	border-radius: 40rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	backdrop-filter: blur(10px);
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.3);
	transition: all 0.3s ease;
	z-index: 999;
	
	&:active {
		transform: scale(0.9);
	}
}

</style>
