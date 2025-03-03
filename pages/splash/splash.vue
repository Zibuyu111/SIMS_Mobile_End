<template>
	<view class="splash-container">
		<view class="content">
			<text class="title">SIMS</text>
			<text class="date">{{currentTime}}</text>
			<text class="message">{{welcomeMessage}}</text>
		</view>
	</view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import type { Ref } from 'vue'

export default defineComponent({
	name: 'Splash',
	setup() {
		const currentTime: Ref<string> = ref('')
		const welcomeMessage: Ref<string> = ref('')

		const formatDate = (date: Date): string => {
			const year = date.getFullYear()
			const month = String(date.getMonth() + 1).padStart(2, '0')
			const day = String(date.getDate()).padStart(2, '0')
			return `${year}-${month}-${day}`
		}

		const getWelcomeMessage = (hour: number): string => {
			if (hour >= 0 && hour < 6) return '早点睡吧！'
			if (hour >= 6 && hour < 11) return '美丽的早晨！'
			if (hour >= 11 && hour < 13) return '中午小睡，下午精神百倍！'
			if (hour >= 13 && hour < 18) return '记得忙里偷闲！'
			return '晚上好！'
		}

		onMounted(() => {
			try {
				const now = new Date()
				currentTime.value = formatDate(now)
				welcomeMessage.value = getWelcomeMessage(now.getHours())

				// 3秒后跳转到主页
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index/index',
						fail: (err) => {
							console.error('页面跳转失败:', err)
							// 如果reLaunch失败，尝试使用 navigateTo
							uni.navigateTo({
								url: '/pages/index/index'
							})
						}
					})
				}, 3000)
			} catch (error) {
				console.error('Splash页面初始化失败:', error)
			}
		})

		return {
			currentTime,
			welcomeMessage
		}
	}
})
</script>

<style>
page {
	background: linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%);
}

.splash-container {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	padding: 32rpx;
	background: linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%);
	position: relative;
	overflow: hidden;
}

.splash-container::after {
	content: '';
	position: absolute;
	width: 200%;
	height: 200%;
	background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%,
		transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%,
		transparent 75%, transparent);
	background-size: 20rpx 20rpx;
	animation: backgroundMove 30s linear infinite;
	opacity: 0.1;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40rpx;
	animation: fadeIn 1s ease-in-out;
	width: 100%;
	box-sizing: border-box;
	position: relative;
	z-index: 1;
}

.title {
	font-size: 128rpx;
	font-weight: 700;
	color: #ffffff;
	letter-spacing: 16rpx;
	text-transform: uppercase;
	animation: scaleIn 1.2s ease-out;
	text-shadow: 0 0 20rpx rgba(255,255,255,0.3);
	position: relative;
}

.title::after {
	content: 'SIMS';
	position: absolute;
	left: 4rpx;
	top: 4rpx;
	color: rgba(255,255,255,0.1);
	z-index: -1;
	filter: blur(8rpx);
}

.date {
	font-size: 48rpx;
	color: #a8a8a8;
	font-weight: 300;
	letter-spacing: 4rpx;
	animation: slideIn 1s ease-out 0.3s both;
}

.message {
	font-size: 36rpx;
	color: #ffffff;
	font-weight: 400;
	opacity: 0.8;
	margin-top: 20rpx;
	padding: 20rpx 40rpx;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 40rpx;
	backdrop-filter: blur(10px);
	background: rgba(255, 255, 255, 0.05);
	text-align: center;
	width: 80%;
	box-sizing: border-box;
	animation: pulseIn 1s ease-out 0.6s both;
	position: relative;
	overflow: hidden;
}

.message::before {
	content: '';
	position: absolute;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	background: linear-gradient(
		45deg,
		transparent,
		rgba(255,255,255,0.1),
		transparent
	);
	transform: rotate(45deg);
	animation: shine 3s infinite;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(40rpx);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes scaleIn {
	0% {
		opacity: 0;
		transform: scale(0.8);
	}
	100% {
		opacity: 1;
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

@keyframes pulseIn {
	0% {
		opacity: 0;
		transform: scale(0.9);
	}
	50% {
		opacity: 0.5;
		transform: scale(1.05);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes shine {
	0% {
		left: -50%;
	}
	100% {
		left: 100%;
	}
}

@keyframes backgroundMove {
	0% {
		transform: translate(0, 0);
	}
	100% {
		transform: translate(-20rpx, -20rpx);
	}
}
</style>
