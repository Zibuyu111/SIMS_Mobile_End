<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="header-left">
				<text class="header-title">SIMS</text>
				<text class="header-subtitle">Student Information Management System</text>
			</view>
			<view class="header-right">
				<view class="admin-btn" @tap="handleAdminClick">
					<text class="admin-icon">👤</text>
				</view>
			</view>
		</view>

		<!-- 数据概览卡片 -->
		<scroll-view class="main-content" scroll-y>
			<view class="data-overview">
				<view v-for="(card, index) in overviewCards" :key="index" 
					class="data-card" :class="'card-' + index">
					<view class="card-header">
						<text class="card-icon">{{card.icon}}</text>
						<text class="card-title">{{card.title}}</text>
					</view>
					<text class="card-value">{{card.value}}</text>
					<view class="card-decoration"></view>
				</view>
			</view>

			<!-- 功能菜单 -->
			<view class="menu-grid">
				<view v-for="(item, index) in menuItems" :key="index"
					class="menu-item" :class="'menu-' + index"
					@tap="handleMenuClick(index)">
					<view class="menu-icon-wrapper">
						<text class="menu-icon">{{item.icon}}</text>
					</view>
					<text class="menu-text">{{item.name}}</text>
					<view class="menu-decoration"></view>
				</view>
			</view>

			<!-- 最近活动 -->
			<view class="recent-activities">
				<view class="section-header">
					<text class="section-title">最近活动</text>
					<view class="section-line"></view>
				</view>
				<view class="activity-list">
					<view v-for="(activity, index) in recentActivities" :key="index" 
						class="activity-item" :class="'activity-' + index">
						<text class="activity-icon">{{activity.icon}}</text>
						<view class="activity-content">
							<text class="activity-title">{{activity.title}}</text>
							<text class="activity-time">{{activity.time}}</text>
						</view>
						<view class="activity-decoration"></view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 底部导航栏 -->
		<view class="tab-bar">
			<view v-for="(tab, index) in tabs" :key="index"
				:class="['tab-item', currentTab === index ? 'active' : '']"
				@tap="handleTabClick(index)">
				<text class="tab-icon">{{tab.icon}}</text>
				<text class="tab-text">{{tab.name}}</text>
				<view class="tab-line" v-if="currentTab === index"></view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
	name: 'Index',
	setup() {
		const currentTab = ref(0)

		// 底部标签栏
		const tabs = reactive([
			{ name: '首页', icon: '🏠' },
			{ name: '课程', icon: '📚' },
			{ name: '成绩', icon: '📝' },
			{ name: '我的', icon: '👤' }
		])

		// 数据概览卡片配置
		const overviewCards = reactive([
			{ title: '总学生数', value: '2,458', icon: '👥' },
			{ title: '总课程数', value: '156', icon: '📚' },
			{ title: '优秀学生', value: '328', icon: '🏆' },
			{ title: '待处理', value: '12', icon: '🔔' }
		])

		// 功能菜单项
		const menuItems = reactive([
			{ name: '学生管理', icon: '👥' },
			{ name: '课程管理', icon: '📚' },
			{ name: '成绩录入', icon: '📝' },
			{ name: '考勤管理', icon: '📅' },
			{ name: '请假审批', icon: '📋' },
			{ name: '系统设置', icon: '⚙️' }
		])

		// 最近活动
		const recentActivities = reactive([
			{ title: '张三提交了请假申请', time: '10分钟前', icon: '📋' },
			{ title: '新增课程：高等数学', time: '30分钟前', icon: '📚' },
			{ title: '李四完成了成绩录入', time: '1小时前', icon: '📝' },
			{ title: '系统更新完成', time: '2小时前', icon: '🔄' }
		])

		// 方法
		const handleTabClick = (index: number) => {
			currentTab.value = index
			uni.showToast({
				title: `切换到${tabs[index].name}`,
				icon: 'none'
			})
		}

		const handleMenuClick = (index: number) => {
			uni.showToast({
				title: `进入${menuItems[index].name}`,
				icon: 'none'
			})
		}

		const handleAdminClick = () => {
			uni.showActionSheet({
				itemList: ['个人信息', '系统设置', '退出登录'],
				success: (res) => {
					switch (res.tapIndex) {
						case 0:
							uni.showToast({ title: '查看个人信息', icon: 'none' })
							break
						case 1:
							uni.showToast({ title: '进入系统设置', icon: 'none' })
							break
						case 2:
							uni.showModal({
								title: '提示',
								content: '确定要退出登录吗？',
								success: (res) => {
									if (res.confirm) {
										uni.showToast({ title: '已退出登录', icon: 'success' })
									}
								}
							})
							break
					}
				}
			})
		}

		return {
			currentTab,
			tabs,
			overviewCards,
			menuItems,
			recentActivities,
			handleTabClick,
			handleMenuClick,
			handleAdminClick
		}
	}
})
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

.admin-btn {
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

.admin-btn:active {
	transform: scale(0.95);
	background: rgba(255, 255, 255, 0.15);
}

.admin-icon {
	font-size: 40rpx;
}

.main-content {
	flex: 1;
	padding: 32rpx;
	box-sizing: border-box;
	width: 100%;
}

.data-overview {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 24rpx;
	margin-bottom: 40rpx;
	width: 100%;
	box-sizing: border-box;
}

.data-card {
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 20rpx;
	padding: 24rpx;
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease;
}

.data-card:active {
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

.card-header {
	display: flex;
	align-items: center;
	margin-bottom: 16rpx;
	position: relative;
	z-index: 1;
}

.card-icon {
	margin-right: 12rpx;
	font-size: 40rpx;
}

.card-title {
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.8);
}

.card-value {
	font-size: 48rpx;
	font-weight: bold;
	background: linear-gradient(45deg, #fff, #7f8c8d);
	-webkit-background-clip: text;
	color: transparent;
	position: relative;
	z-index: 1;
}

.menu-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 24rpx;
	margin-bottom: 40rpx;
	width: 100%;
	box-sizing: border-box;
}

.menu-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 20rpx;
	padding: 24rpx;
	gap: 12rpx;
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease;
}

.menu-item:active {
	transform: scale(0.95);
}

.menu-icon-wrapper {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 50%;
	position: relative;
	z-index: 1;
}

.menu-icon {
	font-size: 40rpx;
}

.menu-text {
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.8);
	position: relative;
	z-index: 1;
}

.menu-decoration {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 2rpx;
	background: linear-gradient(90deg, 
		transparent,
		rgba(255,255,255,0.2),
		transparent
	);
}

.section-header {
	display: flex;
	align-items: center;
	margin-bottom: 24rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-right: 16rpx;
	background: linear-gradient(45deg, #fff, #7f8c8d);
	-webkit-background-clip: text;
	color: transparent;
}

.section-line {
	flex: 1;
	height: 2rpx;
	background: linear-gradient(90deg,
		rgba(255,255,255,0.2),
		transparent
	);
}

.activity-list {
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 20rpx;
	padding: 8rpx;
	width: 100%;
	box-sizing: border-box;
}

.activity-item {
	display: flex;
	align-items: center;
	padding: 24rpx;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	position: relative;
	transition: all 0.3s ease;
}

.activity-item:last-child {
	border-bottom: none;
}

.activity-item:active {
	background: rgba(255, 255, 255, 0.1);
}

.activity-icon {
	font-size: 40rpx;
	margin-right: 16rpx;
	position: relative;
	z-index: 1;
}

.activity-content {
	flex: 1;
	position: relative;
	z-index: 1;
}

.activity-title {
	font-size: 28rpx;
	margin-bottom: 8rpx;
}

.activity-time {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.6);
}

.activity-decoration {
	position: absolute;
	top: 50%;
	right: 24rpx;
	width: 16rpx;
	height: 16rpx;
	border-top: 2rpx solid rgba(255,255,255,0.2);
	border-right: 2rpx solid rgba(255,255,255,0.2);
	transform: translateY(-50%) rotate(45deg);
}

.tab-bar {
	height: 120rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	position: relative;
	z-index: 1;
}

.tab-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	padding: 12rpx 24rpx;
	border-radius: 16rpx;
	transition: all 0.3s ease;
	position: relative;
}

.tab-item.active {
	background: rgba(255, 255, 255, 0.1);
}

.tab-icon {
	font-size: 44rpx;
}

.tab-text {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.8);
}

.tab-line {
	position: absolute;
	bottom: -12rpx;
	left: 50%;
	width: 32rpx;
	height: 4rpx;
	background: #fff;
	transform: translateX(-50%);
	border-radius: 2rpx;
}

@keyframes pulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.05);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateX(-40rpx);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
</style>
