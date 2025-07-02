<template>
	<view class="index-container">
		
		<!-- ================== 页面顶部内容 ================== -->
		
		<!-- 顶部状态栏：占位 -->
	    <up-status-bar></up-status-bar>
		<!-- 顶部导航栏 -->
		<up-navbar
			:border="false"
			:bg-color="BarBg"
			title="KMeme"
			:left-icon-color="leftIconColor"
			:title-style="titleStyle"
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
			<!-- 搜索栏，点击跳转到搜索页面 -->
			<view class="search-container" @tap="goToSearchPage">
				<up-search
					placeholder="搜索你喜欢的图片..."
					bg-color="rgba(255,255,255,0.9)"
					:show-action="false"
					:disabled="true"
				>
				</up-search>
			</view>

			<!-- 轮播图，只有当bannerList有内容时才显示 -->
			<view class="swiper-container" v-if="bannerList.length">
				<up-swiper
					:list="bannerList"
					keyName="image"
					showTitle
					radius="16"
					:autoplay="true"
					height="200"
					:circular="true"
					:duration="500"
				>
				</up-swiper>
			</view>

			<!-- 功能导航区域 -->
			<view class="nav-container">
				<!-- 上传图片导航按钮 -->
				<view class="nav-item" @tap="goToAdd">
					<view class="nav-icon">
						<up-icon
							name="camera"
							size="24"
							:color="navIconColors.camera"
						></up-icon>
					</view>
					<text class="nav-text">上传图片</text>
				</view>
				<!-- 我的收藏导航按钮 -->
				 <view class="nav-item" @tap="goToCollect">
					<view class="nav-icon">
						<up-icon
							name="heart"
							size="24"
							:color="navIconColors.heart"
						></up-icon>
					</view>
					<text class="nav-text">我的收藏</text>
				</view>
				<!-- 个人中心导航按钮 -->
				<view class="nav-item" @tap="goToMine">
					<view class="nav-icon">
						<up-icon
							name="account"
							size="24"
							:color="navIconColors.account"
						></up-icon>
					</view>
					<text class="nav-text">个人中心</text>
				</view>
			</view>

			<!-- 相册列表标题 -->
			<view class="section-title">
			    <text class="title-text">我的相册</text>
			    <view class="title-line"></view>
			</view>

		    <!-- 相册列表展示 -->
			<view class="album-list">
				<view
					v-for="(album, index) in albumList"
					:key="album.albumId"
					class="album-item"
					@tap="goToAlbum(album)"
					:style="{ animationDelay: index * 0.1 + 's' }"
				>
					<!-- 相册封面图 -->
					<view class="album-image-container">
						<!-- 图片懒加载 -->
						<up-lazy-load
							:image="album.imgUrl"
							:index="index"
							threshold="-450"
							border-radius="12"
							:fade-show="true"
						>
						</up-lazy-load>
						<!-- 图片悬浮图标 -->
						<view class="album-overlay">
							<up-icon
								name="eye"
								size="20"
								:color="albumIconColors.eye"
							></up-icon>
						</view>
					</view>
					<!-- 相册标题和标签 -->
					<view class="album-info">
						<text class="album-title">{{ album.title }}</text>
						<view class="album-meta">
							<!-- 标签 -->
							<view class="album-tag">
								<up-icon
									name="tag"
									size="12"
									:color="albumIconColors.tag"
								></up-icon>
								<text>{{ album.tag }}</text>
							</view>
							<!-- 点赞数 -->
							<view class="album-stats">
								<up-icon
									name="thumb-up"
									size="12"
									:color="albumIconColors.thumbUp"
								></up-icon>
								<text>{{ Math.floor(Math.random() * 100) + 10 }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 上滑加载提示 -->
			<view class="load-more" v-if="albumList.length > 0">
				<up-line :color="lineColor" margin="20px 0"></up-line>
				<text class="load-more-text">上滑查看更多精彩内容</text>
			</view>

			<!-- 页脚信息 -->
			<view class="footer">
				<view class="footer-content">
					<text class="footer-copyright">© 2025 KMeme 版权所有</text>
					<text class="footer-version">版本号：v1.0.0</text>
					<view class="footer-links">
						<text class="footer-link">隐私政策</text>
						<text class="footer-divider">|</text>
						<text class="footer-link">服务条款</text>
					</view>
				</view>
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
import { getBanner, getHomeList } from "../../api/api.js";
import { onLoad, onPageScroll } from "@dcloudio/uni-app";
import { ref, reactive } from "vue";

/* ===================== 响应式数据定义 ===================== */
// scroll-view 引用
const contentRef = ref(null);
// scroll-view 位置控制
const scrollTop = ref(0);

// 轮播图数据
const bannerList = ref([]);
// 相册列表数据
const albumList = ref([]);

// 界面样式配置
// 状态栏背景色
const BarBg = '#5e2ec0';
// 标题样式
const titleStyle = { color: "#fff", fontWeight: "bold" };
const leftIconColor = "transparent";

// 功能导航图标颜色
const navIconColors = {
  camera: "#6366f1",
  heart: "#ef4444",
  account: "#10b981",
};

// 相册图标颜色
const albumIconColors = {
  eye: "#fff",
  tag: "#8b5cf6",
  thumbUp: "#6b7280",
};

// 加载提示线条颜色
const lineColor = "#e5e7eb";

// 是否显示置顶按钮（0不显示，1显示）
const showTopBtn = ref(0);
// 置顶按钮图标颜色
const topBtnIconColor = "#ffffff";

/* ===================== 生命周期 ===================== */
// 页面加载时初始化数据
onLoad(() => {
	loadData();
});

/* ===================== 方法定义 ===================== */

/**
 * 加载轮播图和相册列表数据
 */
const loadData = async () => {
	try {
		// 请求轮播图数据
		const bannerRes = await getBanner();
		console.log("轮播图数据", bannerRes);
		bannerList.value = bannerRes || [];

		// 请求相册列表数据
		const albumRes = await getHomeList();
		console.log("相册列表数据", albumRes);
		albumList.value = albumRes || [];

	} catch (error) {
		console.error("数据加载失败：", error);
		uni.showToast({
			title: "加载失败",
			icon: "none"
		});
	}
};


/**
 * 点击相册跳转详情页
 * @param {Object} album - 相册对象
 */
const goToAlbum = (album) => {
    uni.navigateTo({
        url: `/pages/album/album?id=${album.id}&title=${encodeURIComponent(album.title)}`,
    });
};

/**
 * 跳转到搜索页面
 */
const goToSearchPage = () => {
    uni.navigateTo({
        url: "/pages/collect/collect",
    });
};

/**
 * 跳转到上传页面（tab切换）
 */
const goToAdd = () => {
    uni.switchTab({
        url: "/pages/add/add",
    });
};

/**
 * 跳转到收藏页面（tab切换）
 */
const goToCollect = () => {
    uni.switchTab({
        url: "/pages/image/image",
    });
};

/**
 * 跳转到个人中心页面（tab切换）
 */
const goToMine = () => {
    uni.switchTab({
        url: "/pages/mine/mine",
    });
};

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
 * 说明：
 * - scroll-view 使用 scrollTop 属性控制滚动
 * - 设置 scrollTop 为当前值无效，故先赋值为 1 再归零，模拟滚动
 * - 该方案无滚动动画效果，原生小程序 pageScrollTo 可平滑滚动，但不可用于非全页面滚动
 */
const toTop = () => {
    scrollTop.value = 1; // 先赋非0值避免无效
    setTimeout(() => {
        scrollTop.value = 0; // 再回到顶部
    }, 150);
};
</script>

<style lang="scss" scoped>
// 页面容器样式
.index-container {
    min-height: 100vh;
	width: 100%;
}

.content {
	position: absolute;
	top: 150rpx; 
	left: 0;
	right: 0;
	bottom: 0;
	padding-top: 20rpx;
}

// 搜索容器
.search-container {
	padding: 20rpx;
	margin-bottom: 20rpx;
}

// 轮播图容器
.swiper-container {
	margin: 0 20rpx 30rpx;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

// 功能导航
.nav-container {
	display: flex;
	justify-content: space-around;
	margin: 10rpx 20rpx;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 16rpx;
	padding: 20rpx 20rpx;
	backdrop-filter: blur(10px);
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20rpx;
		transition: transform 0.2s ease;

		&:active {
			transform: scale(0.95);
		}

		.nav-icon {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background: #f8fafc;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		}

		.nav-text {
			font-size: 24rpx;
			color: #374151;
			font-weight: 500;
		}
	}
}

// 标题区域
.section-title {
	display: flex;
	align-items: center;
	margin: 10rpx 20rpx;

	.title-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #fff;
		margin-right: 20rpx;
	}

	.title-line {
		flex: 1;
		height: 2rpx;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.5) 0%,
			transparent 100%
		);
	}
}

// 相册列表
.album-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 10rpx 20rpx;
	gap: 10rpx;

	.album-item {
		width: calc(50% - 10rpx);
		background: rgba(255, 255, 255, 0.95);
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		animation: fadeInUp 0.6s ease forwards;
		opacity: 0;
		transform: translateY(30rpx);

		&:active {
			transform: scale(0.98) translateY(30rpx);
		}

		.album-image-container {
			position: relative;
			height: 240rpx;
			overflow: hidden;

			.album-overlay {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
				opacity: 0;
				transition: opacity 0.3s ease;
			}

			&:hover .album-overlay {
				opacity: 1;
			}
		}

		.album-info {
			padding: 24rpx;

			.album-title {
				font-size: 28rpx;
				font-weight: 600;
				color: #1f2937;
				margin-bottom: 12rpx;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.album-meta {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.album-tag {
					display: flex;
					align-items: center;
					gap: 8rpx;
					font-size: 22rpx;
					color: #8b5cf6;
				}

				.album-stats {
					display: flex;
					align-items: center;
					gap: 6rpx;
					font-size: 22rpx;
					color: #6b7280;
				}
			}
		}
	}
}

// 加载更多提示
.load-more {
	margin: 0 40rpx 40rpx;
	text-align: center;

	.load-more-text {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.7);
		margin-top: 20rpx;
	}
}

// 页脚
.footer {
	background: rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(10px);

	.footer-content {
		text-align: center;
		padding: 40rpx 20rpx;

		.footer-copyright {
			display: block;
			font-size: 24rpx;
			color: rgba(255, 255, 255, 0.8);
			margin-bottom: 8rpx;
		}

		.footer-version {
			display: block;
			font-size: 22rpx;
			color: rgba(255, 255, 255, 0.6);
			margin-bottom: 20rpx;
		}

		.footer-links {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 16rpx;

			.footer-link {
				font-size: 22rpx;
				color: rgba(255, 255, 255, 0.7);
			}

			.footer-divider {
				font-size: 22rpx;
				color: rgba(255, 255, 255, 0.5);
			}
		}
	}
}

// 置顶按钮
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


// 动画效果
@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
