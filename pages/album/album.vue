<template>
	<view class="album-container">
		
		<!-- ================== 页面顶部内容 ================== -->
		
		<!-- 顶部状态栏：占位 -->
		<up-status-bar></up-status-bar>
		<!-- 顶部导航栏 -->
		<up-navbar
		  :border="false"
		  :bg-color="BarBg"
		  :title="title"
		  :title-style="titleStyle"
		  :left-icon-color="leftIconColor"
		  @leftClick="goBack"
		>
		</up-navbar>
		
		<!-- ================== 页面主体内容：支持纵向滚动 ================== -->
		
		<scroll-view
			class="content"
			scroll-y
			:scroll-top="scrollTop"
			@scroll="handleScroll"
			ref="contentRef"
		>
			<!-- 图片列表 -->
			<view class="list">
				<!-- 瀑布流 -->
				<up-waterfall v-model="flowList" ref="uWaterfallRef">
					<!-- 左列 -->
					<template v-slot:left="{ leftList }">
						<view class="demo-warter" v-for="(item,index) in leftList" :key="index">
							<view @tap="previewImage(leftList, index)">
								<up-lazy-load threshold="-450" border-radius="10" :image="item.imgUrl" :index="index"></up-lazy-load>
							</view>
							<view class="demo-title">{{ item.title }}</view>
							<view class="demo-tag">
								<view class="demo-tag-owner">{{ item.tag[0] }}</view>
								<view class="demo-tag-text">{{ item.tag[1] }}</view>
							</view>
							<view class="demo-actions">
								<view class="action-left" @tap="handleCollect(item)">
									<text :style="{ color: item.isCollected ? 'red' : '#888' }">
										{{ item.isCollected ? '取消收藏' : '收藏' }}
									</text>
								</view>
								<view class="action-right" @tap="handleDelete(item.albumId)">
									<text style="color:#999">删除</text>
								</view>
							</view>
						</view>
					</template>
					<!-- 右列 -->
					<template v-slot:right="{ rightList }">
						<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
							<view @tap="previewImage(rightList, index)">
								<up-lazy-load threshold="-450" border-radius="10" :image="item.imgUrl" :index="index"></up-lazy-load>
							</view>
							<view class="demo-title">{{ item.title }}</view>
							<view class="demo-tag">
								<view class="demo-tag-owner">{{ item.tag[0] }}</view>
								<view class="demo-tag-text">{{ item.tag[1] }}</view>
							</view>
							<view class="demo-actions">
								<view class="action-left" @tap="handleCollect(item)">
									<text :style="{ color: item.isCollected ? 'red' : '#888' }">
										{{ item.isCollected ? '取消收藏' : '收藏' }}
									</text>
								</view>
								<view class="action-right" @tap="handleDelete(item.albumId)">
									<text style="color:#999">删除</text>
								</view>
							</view>
						</view>
					</template>
				</up-waterfall>
			</view>
		</scroll-view>
		
		<!-- ================== 页面其他内容 ================== -->
		
		<!-- 置顶按钮，滚动超过阈值时显示 -->
		<view v-if="showTopBtn" @click="toTop" class="topClass">
			<up-icon name="arrow-upward" :color="topBtnIconColor" size="28"></up-icon>
		</view>
		
	</view>
</template>

<script setup>
/* ===================== 依赖导入 ===================== */
import { ref } from 'vue'
import { onLoad, onPageScroll } from '@dcloudio/uni-app'
import { getAlbumImages, deleteImage, toggleCollect, sortImages } from '@/api/api.js'

/* ===================== 响应式数据定义 ===================== */
// 相册Id数据
let albumId = ref(0)
// 相册名
const title = ref('相册')
// 瀑布流图像列表
const flowList = ref([])

// scroll-view 引用
const contentRef = ref(null);
// scroll-view 位置控制
const scrollTop = ref(0);

// 界面样式配置
// 状态栏背景色
const BarBg = '#5e2ec0'
// 标题样式
const titleStyle = { color: "#fff", fontWeight: "bold" };
const leftIconColor = "#fff";

// 是否显示置顶按钮（0不显示，1显示）
const showTopBtn = ref(0);
// 置顶按钮图标颜色
const topBtnIconColor = "#ffffff";

/* ===================== 生命周期 ===================== */
onLoad((options) => {
	// 接收页面传参
	albumId.value  = Number(options.id)
	title.value = decodeURIComponent(options.title || '相册')

    // 请求后端该相册的图像数据
	loadData(albumId)
})

/* ===================== 方法定义 ===================== */

/**
 * 加载相册的图像数据
 */
const loadData = async (albumId) => {
    // 请求后端该相册的图像数据
    uni.showLoading({ title: '加载中' })
    getAlbumImages(albumId)
        .then(res => {
            flowList.value = res || []  // 已在接口内部处理了 .data
            console.log('相册图片数据：', flowList.value)
        })
        .catch((err) => {
          console.error('Error loading album:', err)
          uni.showToast({ 
            title: `加载失败: ${err.message || '未知错误'}`,
            icon: 'none',
            duration: 3000
          })
        })
        .finally(() => {
            uni.hideLoading()
        })
};

/**
 * 图片预览函数
 */
const previewImage = (list, index) => {
	if (!list?.length) return
	const urls = list.filter(item => item.imgUrl).map(item => item.imgUrl)
	if (!urls.length) return
	uni.previewImage({
		urls,
		current: urls[index],
		fail: (err) => {
			console.error('预览失败:', err)
			uni.showToast({ title: '预览失败', icon: 'none' })
		}
	})
}

/**
 * 图片收藏函数
 */
const handleCollect = async (item) => {
	const prevStatus = item.isCollected
	item.isCollected = !prevStatus

	try {
		await toggleCollect(item.albumId, item.isCollected)
		uni.showToast({ title: prevStatus ? '已取消收藏' : '已收藏', icon: 'success' })
	} catch (err) {
		console.error('收藏失败:', err)
		item.isCollected = prevStatus
		uni.showToast({ title: '收藏操作失败', icon: 'none' })
	}
}

/**
 * 图片删除函数
 */
const handleDelete = (itemId) => {
	uni.showModal({
		title: '确认删除',
		content: '是否删除该图片？',
		success: async (res) => {
			if (res.confirm) {
				uni.showLoading({ title: '删除中...' });
				try {
					await deleteImage(itemId)
					uni.showToast({ title: '删除成功', icon: 'success' })
					loadData(albumId)
				} catch (err) {
					console.error('删除失败:', err);
					uni.showToast({ title: '删除失败', icon: 'none' });
				} finally {
					uni.hideLoading();
				}
			}
		}
	})
}

/**
 * 图片排序函数（按标题）
 */ 
const handleSort = async () => {
	try {
		const sorted = await sortImages('title')
		flowList.value = sorted || []
		uni.showToast({ title: '排序成功', icon: 'success' })
	} catch (err) {
		console.error('排序失败:', err)
		uni.showToast({ title: '排序失败', icon: 'none' })
	}
}

/**
 * 监听 scroll-view 滚动事件，控制置顶按钮显示与隐藏
 * @param {Object} e - 滚动事件对象
 */
const handleScroll = (e) => {
    const top = e.detail?.scrollTop ?? 0;
    showTopBtn.value = top > 600 ? 1 : 0;
};

/**
 * 置顶按钮点击事件，回到顶部
 */
const toTop = () => {
    scrollTop.value = 1; // 先赋非0值避免无效
    setTimeout(() => {
        scrollTop.value = 0; // 再回到顶部
    }, 150);
};

/**
 * 返回首页（底部标签页切换）
 */
const goBack = () => {
	uni.switchTab({ url: "/pages/index/index" })
}
</script>

<style lang="scss" scoped>
// 页面容器样式
.album-container {
	padding: 20rpx;
}

.content {
	position: absolute;
	top: 150rpx; 
	left: 0;
	right: 0;
	bottom: 0;
	padding-top: 20rpx;
}

// 图片列表
.list {
	margin: 30rpx 0;

	// 顶部搜索卡片
	.demo-warter {
		margin: 10rpx 10rpx 10rpx 0;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 16rpx;
		position: relative;

		//搜索卡片标题
		.demo-title {
			font-size: 30rpx;
			margin-top: 10rpx;
			color: #303133;
		}
		
		// 标签区域
		.demo-tag {
			display: flex;
			flex-wrap: wrap;
			margin-top: 10rpx;
			gap: 12rpx;

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

		// 操作按钮组
		.demo-actions {
			display: flex;
			gap: 100rpx;

			// 左右按钮通用样式
			.action-left,
			.action-right {
				font-size: 24rpx;
				color: #888;
				background-color: rgba(255, 255, 255, 0.9);
				padding: 6rpx 16rpx;
				border-radius: 20rpx;
				box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
				width: 150rpx; 
				text-align: center;
				white-space: nowrap;
			}

			// 右按钮额外样式
			.action-right {
				color: #999;
			}
		}
	}
}

// 动画效果
@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

