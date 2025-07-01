<template>
	<view class="mine-container">
		<!-- 顶部导航 -->
		<up-status-bar></up-status-bar>
		<up-navbar
		  :border="false"
		  :bg-color="BarBg"
		  title="个人中心"
		  :title-style="titleStyle"
		  :left-icon-color="leftIconColor"
		  @leftClick="goBack"
		>
		</up-navbar>
		<view class="content">
			<!-- 顶部用户信息 -->
			<view class="user-header">
				<view class="user-bg"></view>
				<view class="user-info">
					<view class="avatar-section">
						<up-avatar 
							:src="userInfo.avatarUrl" 
							size="120"
							shape="circle"
							:random="true">
						</up-avatar>
						<view class="avatar-edit" @tap="editAvatar">
							<up-icon name="camera" size="16" :color="iconColors.camera"></up-icon>
						</view>
					</view>
					<view class="user-details">
						<text class="user-name">{{ userInfo.nickName }}</text>
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
			
			<!-- 登录弹窗 -->
			<up-popup closeable @click="close" :show="show" round="20">
				<view class="popup">
					<view class="title">获取您的昵称、头像</view>
					<view class="flex">
						<view class="label">获取用户头像</view>
						<button class="avatar-warpper" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
							<image class="avatar" :src="userInfo.avatarUrl"></image>
						</button>
					</view>
					<view class="flex">
						<view class="label">获取用户昵称：</view>
						<input @input="changeName" type="nickname">
					</view>
					<button size="default" type="primary" @click="userSubmit">确定</button>
				</view>
			</up-popup>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

// 样式配置
const BarBg = '#5e2ec0'
// const navBarBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
const titleStyle = { color: "#fff", fontWeight: "bold" };
const leftIconColor = "#fff";
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

// 用户信息
const userInfo = reactive({
	nickName: 'KMeme用户',
	description: '热爱摄影，记录美好生活',
	avatarUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
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

onLoad(async () => {
  loadUserData()
	// 免登录
	if(uni.getStorageSync('token') && !uni.getStorageSync('userInfo')) {
		const { avatarUrl, nickName } = await getUserInfo()
		userInfo.avatarUrl = avatarUrl
		userInfo.nickName = nickName
	} else if(uni.getStorageSync('token') && uni.getStorageSync('userInfo')) {
		const { avatarUrl, nickName } = JSON.parse(uni.getStorageSync('userInfo'))
		userInfo.avatarUrl = avatarUrl
		userInfo.nickName = nickName
	}
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
			userInfo.avatarUrl = res.tempFilePaths[0]
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
		placeholderText: userInfo.nickName,
		success: (res) => {
			if (res.confirm && res.content) {
				userInfo.nickName = res.content
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
		url: '/pages/collect/collect'
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

const close = () => {
	show.value = false
}

const userSubmit = () => {
	uni.setStorageSync('userInfo', JSON.stringify(userInfo))
	show.value = false
	
}

const onChooseavatar = (e) => {
	userInfo.avatarUrl = e.detail.avatarUrl
}
const changeName = (e) => {
	userInfo.nickName = e.detail.value
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
				console.log("确认登录")
				uni.login({
					success: async (data) => {
						console.log(data)
						// 通过code传给后端，后端去换取sessionKey
						const{ token } = await login(data.code)
						console.log(token, 'token')
						uni.setStorageSync('token', token)
						// 通过token获取用户信息
						const userData = await getUserInfo()
						// 把用户信息显示到页面
						userInfo.avatarUrl = userData.avatarUrl
						userInfo.nickName = userData.nickName
						show.value = true 
					},
					fail(err) {
						console.error('uni.login调用失败:', err)
						uni.showToast({ title: '登录失败，请重试', icon: 'error' })
					}
				})
				// 这里可以跳转到登录页面
			}
		}
	})
}

// 返回上一页
const goBack = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};
</script>

<style lang="scss" scoped>

.mine-container {
	min-height: 100vh;
	background: #f8fafc;
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
.content {
	height: 100vh;
	background-color: #f5f5f5;
	.topBox {
		width: 100%;
		position: relative;
		z-index: 1;
		overflow: hidden;
		padding: 40rpx 20rpx 40rpx;
		box-sizing: border-box;
	}
	.topBox::after {
		content: "";
		width: 140%;
		height: 200px;
		position: absolute;
		z-index: -1;
		top: 0;
		left: -20%;
		background-color: #005588;
		border-radius: 0 0 50% 50%;
	}
	.setBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.set-left {
			width: 18%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.txt {
			color: #fff;
			font-size: 30rpx;
		}
	}
	.users {
		margin-top: 35rpx;
		padding: 30rpx;
		box-sizing: border-box;
		height: 280rpx;
		background-color: #fff;
		box-shadow: 1px 10rpx 20rpx #aceace;
		border-radius: 16rpx;
		.u-top {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-bottom: 30rpx;
			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.tit {
				font-size: 30rpx;
				font-weight: 700;
				color: #333;
			}
		}
		.u-bottom {
			display: flex;
			justify-content: space-around;
			align-items: center;
			.u-item {
				text-align: center;
				.u-tit {
					color: #757575;
					font-size: 26rpx;
					margin-top: 10rpx;
				}
				.num {
					color: #000;
					font-size: 33rpx;
					font-weight: 700;
				}
			}
		}
	}
	.listBox {
		padding: 20rpx;
		.section {
			background-color: #fff;
			border-radius: 16rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			.list {
				display: flex;
				flex-direction: column;
				.row {
					display: flex;
					align-items: center;
					padding: 20rpx 0;
					border-bottom: 1px solid #eee;
					&:last-child {
						border-bottom: none;
					}
					.left {
						display: flex;
						align-items: center;
					
						.text {
							margin-left: 20rpx;
							font-size: 30rpx;
							color: #333;
						}
					}
				}
			}
		}
	}
	.popup {
		padding: 20rpx;
		border-radius: 20rpx 20rpx 0 0;
		.title {
			margin-bottom: 20rpx;
			font-size: 40rpx;
			text-align: center;
		}
		.flex {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1px solid #f5f5f5;
			padding: 24rpx 0;
		}
		image {
			width: 70rpx;
			height: 70rpx;
		}
		.avatar-warpper {
			border: none;
			border-radius: 10rpx;
			width: 70rpx;
			height: 70rpx;
			margin-left: 20rpx;
			padding: 0;
		}
	}
}
</style>
