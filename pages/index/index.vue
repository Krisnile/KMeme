<template>
  <!-- 页面主体内容 -->
  <view class="content">
    <!-- 顶部状态栏 -->
    <!-- 		<up-status-bar></up-status-bar> -->

    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-content">
        <view class="logo-section">
          <up-icon name="photo" size="32" :color="headerIconColor"></up-icon>
          <text class="app-title">KMeme</text>
        </view>
        <view class="header-actions">
          <up-icon
            name="plus-circle"
            size="28"
            :color="headerIconColor"
            @tap="goToAdd"
          ></up-icon>
        </view>
      </view>
    </view>

    <!-- 搜索栏：跳转搜索页 -->
    <view class="search-container" @tap="goToSearchPage">
      <up-search
        placeholder="搜索你喜欢的图片..."
        bg-color="rgba(255,255,255,0.9)"
        :show-action="false"
        :disabled="true"
      >
      </up-search>
    </view>

    <!-- 轮播图 -->
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

    <!-- 功能导航 -->
    <view class="nav-container">
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

    <!-- 相册列表 -->
    <view class="album-list">
      <view
        v-for="(album, index) in albumList"
        :key="album.id"
        class="album-item"
        @tap="goToAlbum(album)"
        :style="{ animationDelay: index * 0.1 + 's' }"
      >
        <view class="album-image-container">
          <up-lazy-load
            :image="album.img"
            :index="index"
            threshold="-450"
            border-radius="12"
            :fade-show="true"
          >
          </up-lazy-load>
          <view class="album-overlay">
            <up-icon
              name="eye"
              size="20"
              :color="albumIconColors.eye"
            ></up-icon>
          </view>
        </view>
        <view class="album-info">
          <text class="album-title">{{ album.title }}</text>
          <view class="album-meta">
            <view class="album-tag">
              <up-icon
                name="tag"
                size="12"
                :color="albumIconColors.tag"
              ></up-icon>
              <text>{{ album.tag }}</text>
            </view>
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

    <!-- 置顶按钮 -->
    <view v-if="showTopBtn" @click="toTop" class="topClass">
      <up-icon name="arrow-upward" :color="topBtnIconColor" size="28"></up-icon>
    </view>

    <!-- 上滑加载提示 -->
    <view class="load-more" v-if="albumList.length > 0">
      <up-line :color="lineColor" margin="20px 0"></up-line>
      <text class="load-more-text">上滑查看更多精彩内容</text>
    </view>

    <!-- footer信息 -->
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
  </view>
</template>

<script setup>
import { getBanner, getHomeList } from "../../api/api.js";
import { onLoad, onPageScroll } from "@dcloudio/uni-app";
import { ref, reactive } from "vue";

const keyword = ref("");
// 轮播数据
const bannerList = ref([]);
// 相册数据
const albumList = ref([]);
// 样式配置
const headerIconColor = "#fff";
const navIconColors = {
  camera: "#6366f1",
  heart: "#ef4444",
  account: "#10b981",
};
const albumIconColors = {
  eye: "#fff",
  tag: "#8b5cf6",
  thumbUp: "#6b7280",
};
const lineColor = "#e5e7eb";

// 滚动是否显示 0不显示 1显示
const showTopBtn = ref(0);
// 样式配置
const topBtnIconColor = "#ffffff";

onLoad(() => {
  loadData();
});

// 加载数据
const loadData = () => {
  // 加载banner
  getBanner().then((res) => {
    console.log(res, "res");
    bannerList.value = res.bannerList;
  });

  // 加载相册列表
  getHomeList().then((res) => {
    console.log(res, "getHomeList");
    albumList.value = res;
  });
};

// 搜索处理
const handleSearch = () => {
  if (keyword.value.trim()) {
    uni.showToast({
      title: `搜索: ${keyword.value}`,
      icon: "none",
    });
    // 这里可以添加实际的搜索逻辑
  }
};

// 点击相册跳转详情页
const goToAlbum = (album) => {
  uni.navigateTo({
    url: `/pages/album/album?id=${album.id}&title=${encodeURIComponent(
      album.title
    )}`,
  });
};

// 跳转到搜索页面
const goToSearchPage = () => {
  uni.navigateTo({
    url: "/pages/search/search",
  });
};

// 跳转到上传页面
const goToAdd = () => {
  uni.switchTab({
    url: "/pages/add/add",
  });
};

// 跳转到收藏页面
const goToCollect = () => {
  uni.switchTab({
    url: "/pages/collect/collect",
  });
};

// 跳转到个人中心
const goToMine = () => {
  uni.switchTab({
    url: "/pages/mine/mine",
  });
};

// 监听滚动
onPageScroll((e) => {
  if (e.scrollTop > 600) {
    showTopBtn.value = 1;
  } else {
    showTopBtn.value = 0;
  }
});
// 置顶效果
const toTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  });
};
</script>

<style>
page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

// 顶部导航栏
.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20rpx;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo-section {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .app-title {
        font-size: 36rpx;
        font-weight: bold;
        color: #fff;
        letter-spacing: 2rpx;
      }
    }

    .header-actions {
      padding: 12rpx;
      border-radius: 12rpx;
      background: rgba(255, 255, 255, 0.1);
    }
  }
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
  margin: 0 20rpx 30rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16rpx;
  padding: 30rpx 20rpx;
  backdrop-filter: blur(10px);
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12rpx;
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
  margin: 0 20rpx 30rpx;

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
  margin: 0 20rpx 40rpx;
  gap: 20rpx;
}

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

// 加载更多
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

// 动画
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
