<template>
	<view class="link">
		<view class="tk cc-list">
			<view class="item" v-for="(item, index) in linklist" :key="index">
				<image
					:src="item.img"
					mode="aspectFill"
				></image>
				<view class="topFixed">收藏</view>
				<view class="infos">
					<view class="tit">{{ item.title }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		re
	} from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { collectList } from '../../api/api';
	
	const linklist = ref([])
	onLoad(() => {
		collectList().then(res => {
			console.log(res)
			linklist.value = res
		})
	})
</script>

<style lang="scss">
.collect {
	padding: 20rpx;
	box-sizing: border-box;
	.cc-list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.item {
			position: relative;
			width: 48%;
			margin-bottom: 20rpx;
			box-shadow: 1px 2px 3px #e5e5e5;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			overflow: hidden;
			.topFixed {
				position: absolute;
				top: 0rpx;
				right: 0;
				border-bottom-right-radius: 20rpx;
				border-bottom-left-radius: 20rpx;
				background-color: #ff5500;
				color: #fff;
				text-align: center;
				font-size: 22rpx;
				padding: 5rpx 20rpx;
				box-sizing: border-box;
			}
			image {
				width: 100%;
				height: 200rpx;
			}
			.infos {
				padding: 10rpx 15rpx;
				.tit {
					font-size: 28rpx;
					font-weight: 700;
					color: #111;
					margin-bottom: 15rpx;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
				}
			}
		}
	}
}
</style>
