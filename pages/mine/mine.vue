<template>
	<view class="content">
		<view class="topBox">
			<view class="setBox">
				<view class="set-left">
					<uni-icons type="caledar" size="30" color="#ffffff"></uni-icons>
					<view class="txt">签到</view>
				</view>
				<view class="set-right">
					<uni-icons type="gear" size="30" color="#ffffff"></uni-icons>
					<uni-icons type="chat" size="30" color="#ffffff"></uni-icons>
				</view>
			</view>
			<view class="users">
				<view class="u-top" @click="setFun">
					<template v-if="!userInfo.nickName">
						<image 
							src="/static/catcats.jpg"
							mode="aspectFill"
						>
						</image>
						<view class="tit">
							 注册 / 登录
						</view>
					</template>
					<template v-else>
						<image
							:src="userInfo.avatarUrl"
							mode="aspectFill"
						>
						</image>
						<view class="tit">
							 {{ userInfo.nickName }}
						</view>
					</template>
				</view>
				<view class="u-bottom">
					<view class="u-item">
						<view class="num">12</view>
						<view class="u-tit">点赞</view>
					</view>
					<view class="u-item">
						<view class="num">12</view>
						<view class="u-tit">喜欢</view>
					</view>
					<view class="u-item">
						<view class="num">12</view>
						<view class="u-tit">浏览</view>
					</view>
					<view class="u-item">
						<view class="num">12</view>
						<view class="u-tit">收藏</view>
					</view>
				</view>
			</view>
		</view>
		<view class="listBox"></view>
		<up-popup :show="show" @click="close">
			<view class="popup">
				<view class="title">获取您的昵称、头像</view>
				<view class="flex">
					<view class="label">
						获取用户头像
					</view>
				</view>
				
			</view>
		</up-popup>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { login, getUserInfo} from '../../api/api.js'

onLoad(() => {
	
})

const userInfo = reactive({
	nickName: '',
	avatarUrl: ''
})

// 弹出层显示
const show = ref(false)



const setFun = () => {
	// 给用户确认提醒
	uni.showModal({
		title: 'Ciallo～ (∠・ω< )⌒★',
		content: ' 授权微信登录后才能正常使用小程序喵',
		success(res) {
			if (res.confirm) {
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
					}
				})
			}
		}
	})
}
</script>

<style lang="scss" scoped>
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
	}

</style>
