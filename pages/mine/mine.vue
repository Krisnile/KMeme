<template>
	<view class="mine-container">
		<!-- 顶部用户信息 -->
		<view class="user-header">
			<view class="user-bg"></view>
			<view class="user-info">
				<view class="avatar-section">
					<up-avatar 
						:src="userInfo.avatar" 
						size="120"
						shape="circle"
						:random="true">
					</up-avatar>
					<view class="avatar-edit" @tap="editAvatar">
						<up-icon name="camera" size="16" :color="iconColors.camera"></up-icon>
					</view>
				</view>
				<view class="user-details">
					<text class="user-name">{{ userInfo.nickname }}</text>
					<text class="user-desc">{{ userInfo.description }}</text>
					<view class="user-stats">
						<view class="stat-item">
							<text class="stat-number">{{ userInfo.uploadCount }}</text>
							<text class="stat-label">上传</text>
						</view>
						<view class="stat-item">
							<text class="stat-number">{{ userInfo.collectCount }}</text>
							<text class="stat-label">收藏</text>
						</view>
						<view class="stat-item">
							<text class="stat-number">{{ userInfo.likeCount }}</text>
							<text class="stat-label">获赞</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 功能菜单 -->
		<view class="menu-section">
			<!-- 我的创作 -->
			<view class="menu-group">
				<view class="group-title">我的创作</view>
				<view class="menu-item" @tap="goToMyUploads">
					<view class="menu-icon">
						<up-icon name="camera" size="20" :color="iconColors.menuCamera"></up-icon>
					</view>
					<text class="menu-text">我的上传</text>
					<view class="menu-badge" v-if="userInfo.uploadCount > 0">
						{{ userInfo.uploadCount }}
					</view>
					<up-icon name="arrow-right" size="16" :color="iconColors.arrowRight"></up-icon>
				</view>
				<view class="menu-item" @tap="goToMyCollections">
					<view class="menu-icon">
						<up-icon name="heart" size="20" :color="iconColors.heart"></up-icon>
					</view>
					<text class="menu-text">我的收藏</text>
					<view class="menu-badge" v-if="userInfo.collectCount > 0">
						{{ userInfo.collectCount }}
					</view>
					<up-icon name="arrow-right" size="16" :color="iconColors.arrowRight"></up-icon>
				</view>
				<view class="menu-item" @tap="goToMyHistory">
					<view class="menu-icon">
						<up-icon name="clock" size="20" :color="iconColors.clock"></up-icon>
					</view>
					<text class="menu-text">浏览历史</text>
					<up-icon name="arrow-right" size="16" :color="iconColors.arrowRight"></up-icon>
				</view>
			</view>
			
			<!-- 设置选项 -->
			<view class="menu-group">
				<view class="group-title">设置</view>
				<view class="menu-item" @tap="editProfile">
					<view class="menu-icon">
						<up-icon name="account" size="20" :color="iconColors.account"></up-icon>
					</view>
					<text class="menu-text">编辑资料</text>
					<up-icon name="arrow-right" size="16" :color="iconColors.arrowRight"></up-icon>
				</view>
				<view class="menu-item" @tap="goToSettings">
					<view class="menu-icon">
						<up-icon name="setting" size="20" :color="iconColors.setting"></up-icon>
					</view>
					<text class="menu-text">应用设置</text>
					<up-icon name="arrow-right" size="16" :color="iconColors.arrowRight"></up-icon>
				</view>
				<view class="menu-item" @tap="toggleNotification">
					<view class="menu-icon">
						<up-icon name="bell" size="20" :color="iconColors.bell"></up-icon>
					</view>
					<text class="menu-text">消息推送</text>
					<up-switch 
						v-model="settings.notification" 
						size="20"
						:active-color="switchActiveColor">
					</up-switch>
				</view>
			</view>
			
			<!-- 其他选项 -->
			<view class="menu-group">
				<view class="group-title">其他</view>
				<view class="menu-item" @tap="shareApp">
					<view class="menu-icon">
						<up-icon name="share" size="20" :color="iconColors.share"></up-icon>
					</view>
					<text class="menu-text">分享应用</text>
					<up-icon name="arrow-right" size="16" :color="iconColors.arrowRight"></up-icon>
				</view>
				<view class="menu-item" @tap="goToFeedback">
					<view class="menu-icon">
						<up-icon name="chat" size="20" :color="iconColors.chat"></up-icon>
					</view>
					<text class="menu-text">意见反馈</text>
					<up-icon name="arrow-right" size="16" :color="iconColors.arrowRight"></up-icon>
				</view>
				<view class="menu-item" @tap="goToAbout">
					<view class="menu-icon">
						<up-icon name="info-circle" size="20" :color="iconColors.infoCircle"></up-icon>
					</view>
					<text class="menu-text">关于我们</text>
					<up-icon name="arrow-right" size="16" :color="iconColors.arrowRight"></up-icon>
				</view>
			</view>
			
			<!-- 数据统计 -->
			<view class="stats-section">
				<view class="stats-title">本月数据</view>
				<view class="stats-grid">
					<view class="stats-card">
						<up-icon name="camera" size="24" :color="iconColors.statsCamera"></up-icon>
						<text class="stats-number">{{ monthStats.uploads }}</text>
						<text class="stats-label">上传图片</text>
					</view>
					<view class="stats-card">
						<up-icon name="eye" size="24" :color="iconColors.eye"></up-icon>
						<text class="stats-number">{{ monthStats.views }}</text>
						<text class="stats-label">获得浏览</text>
					</view>
					<view class="stats-card">
						<up-icon name="thumb-up" size="24" :color="iconColors.thumbUp"></up-icon>
						<text class="stats-number">{{ monthStats.likes }}</text>
						<text class="stats-label">获得点赞</text>
					</view>
					<view class="stats-card">
						<up-icon name="heart" size="24" :color="iconColors.statsHeart"></up-icon>
						<text class="stats-number">{{ monthStats.collects }}</text>
						<text class="stats-label">被收藏</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 退出登录 -->
		<view class="logout-section">
			<up-button 
				type="error" 
				@click="logout"
				:custom-style="logoutBtnStyle">
				退出登录
			</up-button>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

// 用户信息
const userInfo = reactive({
	nickname: 'KMeme用户',
	description: '热爱摄影，记录美好生活',
	avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
	uploadCount: 23,
	collectCount: 47,
	likeCount: 156
})

// 应用设置
const settings = reactive({
	notification: true,
	autoSave: true,
	highQuality: false
})

// 月度统计
const monthStats = reactive({
	uploads: 8,
	views: 342,
	likes: 89,
	collects: 23
})

// 样式配置
const iconColors = {
	camera: '#fff',
	menuCamera: '#6366f1',
	heart: '#ef4444',
	clock: '#10b981',
	account: '#8b5cf6',
	setting: '#64748b',
	bell: '#f59e0b',
	share: '#06b6d4',
	chat: '#84cc16',
	infoCircle: '#6b7280',
	arrowRight: '#9ca3af',
	statsCamera: '#6366f1',
	eye: '#10b981',
	thumbUp: '#f59e0b',
	statsHeart: '#ef4444'
}
const switchActiveColor = '#6366f1'
const logoutBtnStyle = {
	background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
	border: 'none',
	borderRadius: '12rpx',
	height: '88rpx',
	fontSize: '32rpx',
	fontWeight: 'bold'
}

onLoad(() => {
	loadUserData()
})

onShow(() => {
	refreshStats()
})

// 加载用户数据
const loadUserData = () => {
	// 模拟从本地存储或API获取用户数据
	console.log('加载用户数据')
}

// 刷新统计数据
const refreshStats = () => {
	// 模拟刷新统计数据
	console.log('刷新统计数据')
}

// 编辑头像
const editAvatar = () => {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			userInfo.avatar = res.tempFilePaths[0]
			uni.showToast({
				title: '头像已更新',
				icon: 'success'
			})
		}
	})
}

// 编辑资料
const editProfile = () => {
	uni.showModal({
		title: '编辑昵称',
		editable: true,
		placeholderText: userInfo.nickname,
		success: (res) => {
			if (res.confirm && res.content) {
				userInfo.nickname = res.content
				uni.showToast({
					title: '昵称已更新',
					icon: 'success'
				})
			}
		}
	})
}

// 跳转到我的上传
const goToMyUploads = () => {
	uni.showToast({
		title: '我的上传功能开发中',
		icon: 'none'
	})
}

// 跳转到我的收藏
const goToMyCollections = () => {
	uni.switchTab({
		url: 'pages/collect/collect'
	})
}

// 跳转到浏览历史
const goToMyHistory = () => {
	uni.showToast({
		title: '浏览历史功能开发中',
		icon: 'none'
	})
}

// 应用设置
const goToSettings = () => {
	uni.showActionSheet({
		itemList: ['清除缓存', '检查更新', '隐私设置'],
		success: (res) => {
			const actions = ['清除缓存', '检查更新', '隐私设置']
			uni.showToast({
				title: `${actions[res.tapIndex]}功能开发中`,
				icon: 'none'
			})
		}
	})
}

// 切换通知设置
const toggleNotification = () => {
	uni.showToast({
		title: settings.notification ? '已开启推送' : '已关闭推送',
		icon: 'success'
	})
}

// 分享应用
const shareApp = () => {
	uni.share({
		title: 'KMeme - 美图分享社区',
		content: '发现和分享美好瞬间',
		success: () => {
			uni.showToast({
				title: '分享成功',
				icon: 'success'
			})
		}
	})
}

// 意见反馈
const goToFeedback = () => {
	uni.showModal({
		title: '意见反馈',
		content: '您可以通过邮箱 feedback@kmeme.com 向我们反馈问题和建议',
		showCancel: false
	})
}

// 关于我们
const goToAbout = () => {
	uni.showModal({
		title: 'KMeme v1.0.0',
		content: 'KMeme是一个专注于图片分享的社区平台，致力于让每个人都能发现和分享生活中的美好瞬间。',
		showCancel: false
	})
}

// 退出登录
const logout = () => {
	uni.showModal({
		title: '确认退出',
		content: '确定要退出登录吗？',
		confirmColor: '#ef4444',
		success: (res) => {
			if (res.confirm) {
				// 清除用户数据
				uni.clearStorageSync()
				uni.showToast({
					title: '已退出登录',
					icon: 'success'
				})
				// 这里可以跳转到登录页面
			}
		}
	})
}

</script>

<style lang="scss" scoped>
.mine-container {
	min-height: 100vh;
	background: #f8fafc;
}

// 用户头部
.user-header {
	position: relative;
	height: 400rpx;
	overflow: hidden;
	
	.user-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}
	
	.user-info {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 60rpx 40rpx 40rpx;
		
		.avatar-section {
			position: relative;
			margin-bottom: 24rpx;
			
			.avatar-edit {
				position: absolute;
				bottom: 8rpx;
				right: 8rpx;
				width: 48rpx;
				height: 48rpx;
				background: rgba(0, 0, 0, 0.6);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				backdrop-filter: blur(4px);
			}
		}
		
		.user-details {
			text-align: center;
			color: #fff;
			
			.user-name {
				display: block;
				font-size: 36rpx;
				font-weight: bold;
				margin-bottom: 8rpx;
			}
			
			.user-desc {
				display: block;
				font-size: 26rpx;
				opacity: 0.9;
				margin-bottom: 30rpx;
			}
			
			.user-stats {
				display: flex;
				gap: 60rpx;
				
				.stat-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 8rpx;
					
					.stat-number {
						font-size: 32rpx;
						font-weight: bold;
					}
					
					.stat-label {
						font-size: 24rpx;
						opacity: 0.9;
					}
				}
			}
		}
	}
}

// 菜单区域
.menu-section {
	padding: 20rpx;
	
	.menu-group {
		background: #fff;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
		
		.group-title {
			padding: 30rpx 30rpx 20rpx;
			font-size: 28rpx;
			font-weight: 600;
			color: #374151;
			border-bottom: 1rpx solid #f1f5f9;
		}
		
		.menu-item {
			display: flex;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1rpx solid #f8fafc;
			transition: background-color 0.2s ease;
			
			&:last-child {
				border-bottom: none;
			}
			
			&:active {
				background-color: #f8fafc;
			}
			
			.menu-icon {
				width: 60rpx;
				height: 60rpx;
				border-radius: 12rpx;
				background: #f1f5f9;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 24rpx;
			}
			
			.menu-text {
				flex: 1;
				font-size: 30rpx;
				color: #374151;
			}
			
			.menu-badge {
				background: #ef4444;
				color: #fff;
				font-size: 20rpx;
				padding: 4rpx 12rpx;
				border-radius: 20rpx;
				margin-right: 16rpx;
				min-width: 32rpx;
				text-align: center;
			}
		}
	}
}

// 统计区域
.stats-section {
	background: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
	
	.stats-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #374151;
		margin-bottom: 30rpx;
	}
	
	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20rpx;
		
		.stats-card {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 30rpx 20rpx;
			background: #f8fafc;
			border-radius: 12rpx;
			gap: 12rpx;
			
			.stats-number {
				font-size: 32rpx;
				font-weight: bold;
				color: #1f2937;
			}
			
			.stats-label {
				font-size: 24rpx;
				color: #6b7280;
			}
		}
	}
}

// 退出登录区域
.logout-section {
	padding: 20rpx;
	margin-bottom: 100rpx;
}
</style>
