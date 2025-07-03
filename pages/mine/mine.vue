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
              :random="true"
            >
            </up-avatar>
            <view class="avatar-edit" @tap="editAvatar">
              <up-icon
                name="camera"
                size="16"
                :color="iconColors.camera"
              ></up-icon>
            </view>
          </view>
          <view class="user-details">
            <text class="user-name">{{ userInfo.nickName }}</text>
            <text class="user-desc">{{ userInfo.description }}</text>
            <!-- <view class="user-stats">
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
						</view> -->
          </view>
        </view>
      </view>

      <!-- 登录模块 -->
      <view class="login-card" v-if="isGuest">
        <view class="login-card-content">
          <text>游客模式无法保存数据，是否上传同步到云端？</text>
          <button class="login-button" @tap="askLogin">立刻登录</button>
        </view>
      </view>

      <!-- 功能菜单 -->
      <view class="menu-section">
        <!-- 我的创作 -->
        <!-- <view class="menu-group">
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
				</view> -->

        <!-- 数据统计 -->
        <view class="stats-section">
          <view class="stats-title">本月数据</view>
          <view class="stats-grid">
            <view class="stats-card">
              <up-icon
                name="camera"
                size="24"
                :color="iconColors.statsCamera"
              ></up-icon>
              <text class="stats-number">{{ monthStats.uploads }}</text>
              <text class="stats-label">上传图片</text>
            </view>
            <view class="stats-card">
              <up-icon name="eye" size="24" :color="iconColors.eye"></up-icon>
              <text class="stats-number">{{ monthStats.views }}</text>
              <text class="stats-label">获得浏览</text>
            </view>
            <view class="stats-card">
              <up-icon
                name="thumb-up"
                size="24"
                :color="iconColors.thumbUp"
              ></up-icon>
              <text class="stats-number">{{ monthStats.likes }}</text>
              <text class="stats-label">获得点赞</text>
            </view>
            <view class="stats-card">
              <up-icon
                name="heart"
                size="24"
                :color="iconColors.statsHeart"
              ></up-icon>
              <text class="stats-number">{{ monthStats.collects }}</text>
              <text class="stats-label">被收藏</text>
            </view>
          </view>
        </view>

        <!-- 设置选项 -->
        <view class="menu-group">
          <view class="group-title">设置</view>
          <view class="menu-item" @tap="editProfile">
            <view class="menu-icon">
              <up-icon
                name="account"
                size="20"
                :color="iconColors.account"
              ></up-icon>
            </view>
            <text class="menu-text">编辑资料</text>
            <up-icon
              name="arrow-right"
              size="16"
              :color="iconColors.arrowRight"
            ></up-icon>
          </view>
          <view class="menu-item" @tap="goToSettings">
            <view class="menu-icon">
              <up-icon
                name="setting"
                size="20"
                :color="iconColors.setting"
              ></up-icon>
            </view>
            <text class="menu-text">应用设置</text>
            <up-icon
              name="arrow-right"
              size="16"
              :color="iconColors.arrowRight"
            ></up-icon>
          </view>
          <view class="menu-item" @tap="toggleNotification">
            <view class="menu-icon">
              <up-icon name="bell" size="20" :color="iconColors.bell"></up-icon>
            </view>
            <text class="menu-text">消息推送</text>
            <up-switch
              v-model="settings.notification"
              size="20"
              :active-color="switchActiveColor"
            >
            </up-switch>
          </view>
        </view>

        <!-- 其他选项 -->
        <view class="menu-group">
          <view class="group-title">其他</view>
          <view class="menu-item" @tap="shareApp">
            <view class="menu-icon">
              <up-icon
                name="share"
                size="20"
                :color="iconColors.share"
              ></up-icon>
            </view>
            <text class="menu-text">分享应用</text>
            <up-icon
              name="arrow-right"
              size="16"
              :color="iconColors.arrowRight"
            ></up-icon>
          </view>
          <view class="menu-item" @tap="goToFeedback">
            <view class="menu-icon">
              <up-icon name="chat" size="20" :color="iconColors.chat"></up-icon>
            </view>
            <text class="menu-text">意见反馈</text>
            <up-icon
              name="arrow-right"
              size="16"
              :color="iconColors.arrowRight"
            ></up-icon>
          </view>
          <view class="menu-item" @tap="goToAbout">
            <view class="menu-icon">
              <up-icon
                name="info-circle"
                size="20"
                :color="iconColors.infoCircle"
              ></up-icon>
            </view>
            <text class="menu-text">关于我们</text>
            <up-icon
              name="arrow-right"
              size="16"
              :color="iconColors.arrowRight"
            ></up-icon>
          </view>
        </view>
      </view>

      <!-- 退出登录 - 仅在已登录状态下显示 -->
      <view class="logout-section" v-if="!isGuest">
        <up-button type="error" @click="logout" :custom-style="logoutBtnStyle">
          退出登录
        </up-button>
      </view>

      <!-- 登录弹窗 -->
      <up-popup closeable @close="close" :show="show" round="20">
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
            <input @input="changeName" type="nickname" />
          </view>
          <button size="default" type="primary" @click="userSubmit">
            确定
          </button>
        </view>
      </up-popup>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { login, saveUserInfo } from "../../api/api.js";

// 样式配置
const BarBg = "#5e2ec0";
const titleStyle = { color: "#fff", fontWeight: "bold" };
const leftIconColor = "#fff";
const iconColors = {
  camera: "#fff",
  menuCamera: "#6366f1",
  heart: "#ef4444",
  clock: "#10b981",
  account: "#8b5cf6",
  setting: "#64748b",
  bell: "#f59e0b",
  share: "#06b6d4",
  chat: "#84cc16",
  infoCircle: "#6b7280",
  arrowRight: "#9ca3af",
  statsCamera: "#6366f1",
  eye: "#10b981",
  thumbUp: "#f59e0b",
  statsHeart: "#ef4444",
};
const switchActiveColor = "#6366f1";
const logoutBtnStyle = {
  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  border: "none",
  borderRadius: "12rpx",
  height: "88rpx",
  fontSize: "32rpx",
  fontWeight: "bold",
};

// 用户信息
const userInfo = reactive({
	userId: -1,
	nickName: 'KMeme用户',
	description: '热爱摄影，记录美好生活',
	avatarUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
	uploadCount: 23,
	collectCount: 47,
	likeCount: 156,
});

// 游客模式
const isGuest = ref(!uni.getStorageSync("token"));
// 控制 up-popup
const show = ref(false);

// 应用设置
const settings = reactive({
  notification: true,
  autoSave: true,
  highQuality: false,
});

// 月度统计
const monthStats = reactive({
  uploads: 8,
  views: 342,
  likes: 89,
  collects: 23,
});

onLoad(async () => {
  loadUserData();
});

onShow(() => {
  refreshStats();
});

/**
 * 安全加载本地缓存的 userInfo
 * @returns {object} 解析后的 userInfo 对象，或默认值
 */
function loadUserInfoFromStorage() {
  const defaultUserInfo = {
    avatarUrl: "https://cdn.uviewui.com/uview/album/1.jpg",
    nickName: "KMeme用户",
  };

  const userInfoStr = uni.getStorageSync("userInfo");
  if (!userInfoStr) {
    return defaultUserInfo;
  }

  try {
    const parsed = JSON.parse(userInfoStr);
    if (
      parsed &&
      typeof parsed === "object" &&
      parsed.avatarUrl &&
      parsed.nickName
    ) {
      isGuest.value = false;
      return parsed;
    } else {
      uni.removeStorageSync("userInfo");
      return defaultUserInfo;
    }
  } catch (error) {
    console.error("解析 userInfo 失败:", error);
    uni.removeStorageSync("userInfo");
    return defaultUserInfo;
  }
}

// 加载用户数据
const loadUserData = () => {
  // 模拟从本地存储获取用户数据
  console.log("加载用户数据");
  const storedUserInfo = loadUserInfoFromStorage();
  userInfo.avatarUrl = storedUserInfo.avatarUrl;
  userInfo.nickName = storedUserInfo.nickName;
};

// 弹出是否登录的确认框
const askLogin = () => {
  uni.showModal({
    title: "Ciallo～ (∠・ω< )⌒★",
    content: "微信授权登录--我们将获取你的昵称与头像信息，用于账户识别",
    confirmText: "继续",
    success: async (res) => {
      if (res.confirm) {
        try {
          const loginResult = await wechatLogin();

          if (loginResult.isSuccess) {
            // 登录（Token 交换）成功后，更新本地 reactive 的 userInfo
            // 注意：此时 userInfo 里的头像和昵称还是默认值或旧值，
            // 真实的头像昵称需要用户在弹窗里选择和输入

            // 合并后端返回的 userVO 到 reactive 的 userInfo 中
            userInfo.userId = loginResult.userVO.userId;

            show.value = true;
          } else {
            uni.showToast({ title: '登录失败', icon: 'error' });
          }

        } catch (error) {
          console.error("askLogin 流程中断或失败:", error);
          uni.showToast({ title: '登录中断', icon: 'none' });
          // 如果登录失败，保持弹窗关闭或根据需求处理
          // show.value = false; // 如果你想失败就关闭弹窗
        }
      }
    }
  });
};

// 提交登录
const userSubmit = async () => {
  if (!userInfo.nickName || !userInfo.avatarUrl) {
    return uni.showToast({ title: '请填写完整信息', icon: 'none' });
  }

  try {
      // 上传用户资料到后端，此时 userInfo 包含了从鉴权获取的 userId 和用户在前端选择的头像昵称
      await saveUserInfo({
        "userId": userInfo.userId, // userId
        "nickName": userInfo.nickName,
        "avatarUrl": userInfo.avatarUrl,
        "description": userInfo.description, // 默认值
        "uploadCount": userInfo.uploadCount,
        "collectCount": userInfo.collectCount,
        "likeCount": userInfo.likeCount,
        // 包含 saveUserInfo 接口所需的所有字段
      });

      // 保存用户信息到本地缓存
      uni.setStorageSync('userInfo', JSON.stringify({
        userId: userInfo.userId,
        nickName: userInfo.nickName,
        description: userInfo.description,
        avatarUrl: userInfo.avatarUrl,
        uploadCount: userInfo.uploadCount,
        collectCount: userInfo.collectCount,
        likeCount: userInfo.likeCount,
        // ... 所有持久化的 userInfo 字段
      }));

      // 更新登录状态
      isGuest.value = false;
      // 关闭弹窗
      show.value = false;

      uni.showToast({ title: '登录成功喵~', icon: 'success' });

  } catch (error) {
    console.error("登录保存用户资料失败:", error);
    show.value = false;
    uni.showToast({ title: '呜哇,登录失败了！', icon: 'error' });
  }
};

// 处理用户输入
const close = () => {
  show.value = false;
};

const onChooseavatar = (e) => {
  // 用户选择头像后更新
  userInfo.avatarUrl = e.detail.avatarUrl;
};
const changeName = (e) => {
  // 用户输入昵称后更新
  userInfo.nickName = e.detail.value;
};

const wechatLogin = async () => {
  return new Promise((resolve, reject) => {
    uni.login({
      success: async (loginRes) => {
        try {
            // 通过 code 换 token
            console.log("js_code", loginRes.code);
            const loginResponseData  = await login(loginRes.code);

            // 存储 accessToken 字符串
            console.log("token:", loginResponseData.token);
            uni.setStorageSync('token', loginResponseData.accessToken);

            // 存储 refreshToken 字符串，以备后续刷新使用
            uni.setStorageSync('refreshToken', loginResponseData.refreshToken);

            // 存储用户VO信息
            console.log("userVO:", loginResponseData.userVO);
            uni.setStorageSync('userVO', loginResponseData.userVO);

            const userVO = loginResponseData.userVO || {};

            // console.log("登录用户Id:", userVO.userId)
            resolve({
              isSuccess: true, // 表示登录成功
              userVO: userVO // 返回供后续处理
            });
          } catch (error) {
            console.error("登录流程失败:", error); // 打印详细错误信息
            uni.showToast({ title: "登录失败，请重试", icon: "error" }); // 给用户提示
            reject(error);
          }
        },
        fail: (err) => {
          uni.showToast({ title: "登录失败，请重试", icon: "error" });
        reject(err);
      },
    });
  });
};

// 刷新统计数据
const refreshStats = () => {
  // 模拟刷新统计数据
  console.log("刷新统计数据");
};

// 编辑头像
const editAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success: (res) => {
      userInfo.avatarUrl = res.tempFilePaths[0];
      uni.showToast({
        title: "头像已更新",
        icon: "success",
      });
    },
  });
};

// 编辑资料
const editProfile = () => {
  uni.showModal({
    title: "编辑昵称",
    editable: true,
    placeholderText: userInfo.nickName,
    success: (res) => {
      if (res.confirm && res.content) {
        userInfo.nickName = res.content;
        uni.showToast({
          title: "昵称已更新",
          icon: "success",
        });
      }
    },
  });
};

// 跳转到我的上传
const goToMyUploads = () => {
  uni.showToast({
    title: "我的上传功能开发中",
    icon: "none",
  });
};

// 跳转到我的收藏
const goToMyCollections = () => {
  uni.switchTab({
    url: "/pages/collect/collect",
  });
};

// 跳转到浏览历史
const goToMyHistory = () => {
  uni.showToast({
    title: "浏览历史功能开发中",
    icon: "none",
  });
};

// 应用设置
const goToSettings = () => {
  uni.showActionSheet({
    itemList: ["清除缓存", "检查更新", "隐私设置"],
    success: (res) => {
      const actions = ["清除缓存", "检查更新", "隐私设置"];
      uni.showToast({
        title: `${actions[res.tapIndex]}功能开发中`,
        icon: "none",
      });
    },
  });
};

// 切换通知设置
const toggleNotification = () => {
  uni.showToast({
    title: settings.notification ? "已开启推送" : "已关闭推送",
    icon: "success",
  });
};

// 分享应用
const shareApp = () => {
  uni.share({
    title: "KMeme - 美图分享社区",
    content: "发现和分享美好瞬间",
    success: () => {
      uni.showToast({
        title: "分享成功",
        icon: "success",
      });
    },
  });
};

// 意见反馈
const goToFeedback = () => {
  uni.showModal({
		title: '意见反馈',
		content: '您可以通过以下链接向我们反馈：\n\nGitHub Issues：https://github.com/Krisnile/KMeme/issues',
		showCancel: false,
	});
};

// 关于我们
const goToAbout = () => {
	uni.showModal({
		title: 'KMeme v1.0.0',
		content: '特别鸣谢：Krisnile Areufm',
		showCancel: false,
	});
};


// 退出登录
const logout = () => {
  uni.showModal({
    title: "退出登录",
    content: "确认退出当前登录吗？",
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('token');
        uni.removeStorageSync('refreshToken');
        uni.removeStorageSync('userInfo');
        uni.removeStorageSync('userVO');
        userInfo.avatarUrl = 'https://cdn.uviewui.com/uview/album/1.jpg';
        userInfo.nickName = 'KMeme用户';

        isGuest.value = true;
        uni.showToast({ title: "已退出登录", icon: "none" });
      }
    },
  });
};

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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
}

// 用户头部
.user-header {
  position: relative;
  justify-content: center;
  overflow: hidden;

  .user-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 600rpx;
    height: 100%;
    margin: 0 auto;
    border-radius: 16rpx;
    z-index: 1;
  }

  .user-info {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40rpx 40rpx 20rpx;
    max-width: 600rpx;
    margin: 0 auto;
    border-radius: 16rpx;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12rpx);
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);

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

      // .user-stats {
      // 	display: flex;
      // 	gap: 60rpx;

      // 	.stat-item {
      // 		display: flex;
      // 		flex-direction: column;
      // 		align-items: center;
      // 		gap: 8rpx;

      // 		.stat-number {
      // 			font-size: 32rpx;
      // 			font-weight: bold;
      // 		}

      // 		.stat-label {
      // 			font-size: 24rpx;
      // 			opacity: 0.9;
      // 		}
      // 	}
      // }
    }
  }
}

// 登录模块
.login-card {
  margin: 20rpx;
  padding: 30rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);

  .login-card-content {
    display: flex;
    flex-direction: column;
    font-size: 28rpx;
    align-items: center;
    text-align: center;
    gap: 20rpx;

    text {
      color: #333;
    }

    .login-button {
      background-color: #5e2ec0;
      color: #fff;
      width: 100%;
      border-radius: 8rpx;
      padding: 10rpx 30rpx;
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

// 登录弹窗区域
.popup {
  padding: 40rpx 30rpx;
  background-color: #fff;
  border-radius: 24rpx;
  box-sizing: border-box;
  width: 100%;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 30rpx;

  .title {
    font-size: 34rpx;
    font-weight: 700;
    color: #222;
    text-align: center;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20rpx;

    .label {
      font-size: 28rpx;
      color: #555;
      min-width: 200rpx;
      white-space: nowrap;
    }

    .avatar-warpper {
      width: 130rpx;
      height: 130rpx;
      border-radius: 50%;
      border: 2rpx solid #ddd;
      overflow: hidden;
      background-color: #f0f0f0;
      display: flex;
      padding: 0;
      align-items: center;
      justify-content: center;

      .avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    input[type="nickname"] {
      flex: 1;
      height: 64rpx;
      padding: 0 20rpx;
      font-size: 28rpx;
      border: 1rpx solid #ccc;
      border-radius: 12rpx;
      outline: none;
      background-color: #fafafa;
    }
  }

  button[size="default"][type="primary"] {
    width: 100%;
    padding: 20rpx 0;
    font-size: 30rpx;
    border-radius: 16rpx;
    font-weight: 600;
    background-color: #5e2ec0;
    color: #fff;
  }
}
</style>
