<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="header-left">
				<text class="header-title">学生详情</text>
				<text class="header-subtitle">Student Details</text>
			</view>
			<view class="header-right">
				<view class="back-btn" @tap="handleBack">
					<text class="back-icon">←</text>
				</view>
			</view>
		</view>

		<!-- 主要内容区域 -->
		<scroll-view class="main-content" scroll-y>
			<view v-if="loading" class="loading-container">
				<view class="loading-spinner"></view>
				<text class="loading-text">加载中...</text>
			</view>
			<view v-else class="student-list">
				<view v-for="item in dataList" :key="item.id" class="student-card">
					<view class="student-info">
						<view class="student-header">
							<text class="student-name">{{item.name}}</text>
							<text class="student-id">ID: {{item.id}}</text>
						</view>
						<view class="student-details">
							<view class="detail-item">
								<text class="detail-label">电话</text>
								<text class="detail-value">{{item.phone}}</text>
							</view>
							<view class="detail-item">
								<text class="detail-label">位置</text>
								<text class="detail-value">{{item.address || '未设置'}}</text>
							</view>
							<view class="detail-item">
								<text class="detail-label">状态</text>
								<text class="detail-value">{{item.status || '在读'}}</text>
							</view>
						</view>
					</view>
					<view class="card-decoration"></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { fail } from 'assert';
import { url } from 'inspector';

export default {
	data() {
		return {
			loading: true,
			dataList: []
		}
	},
	mounted(){
		//数据请求
		this.fetchData();
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		fetchData(){
			uni.request({
				url:'http://192.168.45.67:1234/student/all',
				method:'GET',
				success:(res)=>{
					if (res.statusCode === 200){
						this.dataList = res.data;
						this.loading = false;
					}else{
						// 请求失败，提示错误信息
						uni.showToast({
						title: '获取数据失败',
						icon: 'none',
						});
						this.loading = false;
					}
				},
				fail:(err)=>{
					uni.showToast({
						title:'网络请求失败',
						icon:'none',
					})
					this.loading = false
				}
			});
		}
	},
}
</script>

<style>
page {
	background: linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%);
}

.container {
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	color: #fff;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
}

/* 科技感网格背景 */
.container::before {
	content: '';
	position: fixed;
	top: 0;
	left: 0;
	width: 200%;
	height: 200%;
	background: 
		linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
		linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
	background-size: 20rpx 20rpx;
	transform: scale(0.5);
	transform-origin: 0 0;
	pointer-events: none;
}

.header {
	padding: 88rpx 32rpx 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	position: relative;
	z-index: 1;
}

.header-left {
	display: flex;
	flex-direction: column;
}

.header-title {
	font-size: 48rpx;
	font-weight: bold;
	letter-spacing: 4rpx;
	background: linear-gradient(45deg, #fff, #7f8c8d);
	-webkit-background-clip: text;
	color: transparent;
}

.header-subtitle {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.6);
	margin-top: 4rpx;
}

.back-btn {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 50%;
	border: 1px solid rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	transition: all 0.3s ease;
}

.back-btn:active {
	transform: scale(0.95);
	background: rgba(255, 255, 255, 0.15);
}

.back-icon {
	font-size: 40rpx;
}

.main-content {
	flex: 1;
	padding: 32rpx;
	box-sizing: border-box;
	width: 100%;
}

.loading-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 400rpx;
}

.loading-spinner {
	width: 60rpx;
	height: 60rpx;
	border: 4rpx solid rgba(255, 255, 255, 0.1);
	border-top-color: #fff;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

.loading-text {
	margin-top: 20rpx;
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.6);
}

.student-list {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.student-card {
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 20rpx;
	padding: 24rpx;
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease;
}

.student-card:active {
	transform: scale(0.98);
}

.card-decoration {
	position: absolute;
	top: 0;
	right: 0;
	width: 100rpx;
	height: 100rpx;
	background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1));
	transform: rotate(45deg) translate(50%, -50%);
}

.student-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16rpx;
}

.student-name {
	font-size: 32rpx;
	font-weight: bold;
	background: linear-gradient(45deg, #fff, #7f8c8d);
	-webkit-background-clip: text;
	color: transparent;
}

.student-id {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.6);
}

.student-details {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.detail-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.detail-label {
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.6);
}

.detail-value {
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.8);
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
