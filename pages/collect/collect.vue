<template>
  <view class="collect-container">
	  
    <!-- 顶部导航 -->
	<up-status-bar></up-status-bar>
    <up-navbar
      :border="false"
      :bg-color="BarBg"
      title="我的收藏"
      :title-style="titleStyle"
      :left-icon-color="leftIconColor"
      @leftClick="goBack"
    >
    </up-navbar>

    <view class="content">
      <!-- 统计信息 -->
      <view class="stats-section">
        <view class="stats-card">
          <view class="stats-number">{{ collectList.length }}</view>
          <view class="stats-label">收藏图片</view>
        </view>
        <view class="stats-card">
          <view class="stats-number">{{ getCollectedAlbums() }}</view>
          <view class="stats-label">相册数量</view>
        </view>
        <view class="stats-card">
          <view class="stats-number">{{ getTotalTags() }}</view>
          <view class="stats-label">标签种类</view>
        </view>
      </view>

      <!-- 筛选选项 -->
      <view class="filter-section">
        <view class="filter-title">
          <up-icon name="funnel" size="18" :color="iconColors.funnel"></up-icon>
          <text>筛选收藏</text>
        </view>
        <view class="filter-tags">
          <view
            class="filter-tag"
            :class="{ active: currentFilter === 'all' }"
            @tap="setFilter('all')"
          >
            全部
          </view>
          <view
            v-for="tag in availableFilters"
            :key="tag"
            class="filter-tag"
            :class="{ active: currentFilter === tag }"
            @tap="setFilter(tag)"
          >
            {{ tag }}
          </view>
        </view>
      </view>

      <!-- 收藏列表 -->
      <view class="collect-list" v-if="filteredList.length > 0">
        <up-waterfall v-model="filteredList" ref="waterfallRef">
          <template v-slot:left="{ leftList }">
            <view
              class="collect-item"
              v-for="(item, index) in leftList"
              :key="index"
              @tap="previewImage(item, leftList.concat(rightList))"
            >
              <view class="image-container">
                <up-lazy-load
                  threshold="-450"
                  border-radius="12"
                  :image="item.img"
                  :index="index"
                  :fade-show="true"
                >
                </up-lazy-load>
                <view class="image-overlay">
                  <up-icon
                    name="heart-fill"
                    size="20"
                    :color="iconColors.heartFill"
                  ></up-icon>
                </view>
              </view>
              <view class="item-info">
                <text class="item-title">{{ item.title }}</text>
                <view class="item-tags">
                  <view v-for="tag in item.tag" :key="tag" class="tag-badge">
                    {{ tag }}
                  </view>
                </view>
                <view class="item-actions">
                  <view
                    class="action-btn"
                    @tap.stop="uncollectImage(item, index)"
                  >
                    <up-icon
                      name="heart-fill"
                      size="16"
                      :color="iconColors.heartFill"
                    ></up-icon>
                    <text>取消收藏</text>
                  </view>
                  <view class="action-btn" @tap.stop="shareImage(item)">
                    <up-icon
                      name="share"
                      size="16"
                      :color="iconColors.share"
                    ></up-icon>
                    <text>分享</text>
                  </view>
                </view>
              </view>
            </view>
          </template>
          <template v-slot:right="{ rightList }">
            <view
              class="collect-item"
              v-for="(item, index) in rightList"
              :key="index"
              @tap="previewImage(item, leftList.concat(rightList))"
            >
              <view class="image-container">
                <up-lazy-load
                  threshold="-450"
                  border-radius="12"
                  :image="item.img"
                  :index="index"
                  :fade-show="true"
                >
                </up-lazy-load>
                <view class="image-overlay">
                  <up-icon
                    name="heart-fill"
                    size="20"
                    :color="iconColors.heartFill"
                  ></up-icon>
                </view>
              </view>
              <view class="item-info">
                <text class="item-title">{{ item.title }}</text>
                <view class="item-tags">
                  <view v-for="tag in item.tag" :key="tag" class="tag-badge">
                    {{ tag }}
                  </view>
                </view>
                <view class="item-actions">
                  <view
                    class="action-btn"
                    @tap.stop="uncollectImage(item, index)"
                  >
                    <up-icon
                      name="heart-fill"
                      size="16"
                      :color="iconColors.heartFill"
                    ></up-icon>
                    <text>取消收藏</text>
                  </view>
                  <view class="action-btn" @tap.stop="shareImage(item)">
                    <up-icon
                      name="share"
                      size="16"
                      :color="iconColors.share"
                    ></up-icon>
                    <text>分享</text>
                  </view>
                </view>
              </view>
            </view>
          </template>
        </up-waterfall>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-else>
        <up-empty
          mode="list"
          text="还没有收藏任何图片"
          :text-color="emptyTextColor"
          :icon-color="emptyIconColor"
        >
        </up-empty>
        <up-button
          type="primary"
          size="normal"
          @click="goToIndex"
          :custom-style="emptyBtnStyle"
        >
          去发现精彩内容
        </up-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";

// 响应式数据
const collectList = ref([]);
const currentFilter = ref("all");

// 样式配置
const BarBg = '#5e2ec0'
// const navBarBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
const titleStyle = { color: "#fff", fontWeight: "bold" };
const leftIconColor = "#fff";
const iconColors = {
  funnel: "#6366f1",
  heartFill: "#ef4444",
  share: "#6366f1",
};
const emptyTextColor = "#94a3b8";
const emptyIconColor = "#cbd5e1";
const emptyBtnStyle = {
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  border: "none",
  borderRadius: "12rpx",
  marginTop: "40rpx",
};

// 模拟收藏数据
const mockCollectData = [
  {
    img: "https://picsum.photos/id/1018/400/600",
    title: "清晨的森林",
    tag: ["自然", "旅行"],
    collectTime: "2024-01-15",
  },
  {
    img: "https://picsum.photos/id/1015/400/500",
    title: "城市夜景",
    tag: ["城市", "灯光"],
    collectTime: "2024-01-14",
  },
  {
    img: "https://picsum.photos/id/1084/400/700",
    title: "美食诱惑",
    tag: ["美食", "餐厅"],
    collectTime: "2024-01-13",
  },
  {
    img: "https://picsum.photos/id/1025/400/550",
    title: "现代艺术",
    tag: ["艺术", "设计"],
    collectTime: "2024-01-12",
  },
  {
    img: "https://picsum.photos/id/1024/400/650",
    title: "野生动物",
    tag: ["自然", "动物"],
    collectTime: "2024-01-11",
  },
];

onLoad(() => {
  loadCollectData();
});

// 加载收藏数据
const loadCollectData = () => {
  // 模拟从本地存储或API获取收藏数据
  collectList.value = mockCollectData;
};

// 获取可用的筛选标签
const availableFilters = computed(() => {
  const tags = new Set();
  collectList.value.forEach((item) => {
    item.tag.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
});

// 筛选后的列表
const filteredList = computed(() => {
  if (currentFilter.value === "all") {
    return collectList.value;
  }
  return collectList.value.filter((item) =>
    item.tag.includes(currentFilter.value)
  );
});

// 获取收藏的相册数量
const getCollectedAlbums = () => {
  const albums = new Set();
  collectList.value.forEach((item) => {
    item.tag.forEach((tag) => albums.add(tag));
  });
  return albums.size;
};

// 获取标签总数
const getTotalTags = () => {
  return availableFilters.value.length;
};

// 设置筛选器
const setFilter = (filter) => {
  currentFilter.value = filter;
};

// 预览图片
const previewImage = (currentItem, allItems) => {
  const urls = allItems.map((item) => item.img);
  const currentIndex = allItems.findIndex(
    (item) => item.img === currentItem.img
  );

  uni.previewImage({
    urls: urls,
    current: currentIndex,
  });
};

// 取消收藏
const uncollectImage = (item, index) => {
  uni.showModal({
    title: "确认取消收藏",
    content: `确定要取消收藏"${item.title}"吗？`,
    confirmColor: "#ef4444",
    success: (res) => {
      if (res.confirm) {
        // 从收藏列表中移除
        const originalIndex = collectList.value.findIndex(
          (collectItem) => collectItem.img === item.img
        );
        if (originalIndex > -1) {
          collectList.value.splice(originalIndex, 1);
        }

        uni.showToast({
          title: "已取消收藏",
          icon: "success",
        });
      }
    },
  });
};

// 分享图片
const shareImage = (item) => {
  uni.showShareMenu({
    title: item.title,
    imageUrl: item.img,
    success: () => {
      uni.showToast({
        title: "分享成功",
        icon: "success",
      });
    },
    fail: () => {
      uni.showToast({
        title: "分享失败",
        icon: "none",
      });
    },
  });
};

// 跳转到首页
const goToIndex = () => {
  uni.switchTab({
    url: "/pages/index/index",
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
.collect-container {
    min-height: 100vh;

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

// 统计信息
.stats-section {
	display: flex;
	gap: 20rpx;
	margin-bottom: 30rpx;

  .stats-card {
    flex: 1;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16rpx;
    padding: 30rpx 20rpx;
    text-align: center;
    backdrop-filter: blur(10px);
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

    .stats-number {
      font-size: 40rpx;
      font-weight: bold;
      color: #6366f1;
      margin-bottom: 8rpx;
    }

    .stats-label {
      font-size: 24rpx;
      color: #6b7280;
    }
  }
}

// 筛选区域
.filter-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  backdrop-filter: blur(10px);
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

  .filter-title {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #1f2937;
  }

  .filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;

    .filter-tag {
      padding: 12rpx 24rpx;
      background: #f1f5f9;
      border: 2rpx solid #e2e8f0;
      border-radius: 50rpx;
      font-size: 24rpx;
      color: #64748b;
      transition: all 0.2s ease;

      &.active {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        border-color: #6366f1;
        color: #fff;
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}

// 收藏列表
.collect-list {
  margin-bottom: 40rpx;
}

.collect-item {
  margin: 10rpx 10rpx 30rpx 0;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16rpx;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.98);
  }

  .image-container {
    position: relative;

    .image-overlay {
      position: absolute;
      top: 12rpx;
      right: 12rpx;
      width: 48rpx;
      height: 48rpx;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
    }
  }

  .item-info {
    padding: 20rpx;

    .item-title {
      font-size: 28rpx;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 12rpx;
      display: block;
    }

    .item-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8rpx;
      margin-bottom: 16rpx;

      .tag-badge {
        padding: 6rpx 16rpx;
        background: #f0f9ff;
        border: 1rpx solid #bae6fd;
        border-radius: 20rpx;
        font-size: 20rpx;
        color: #0284c7;
      }
    }

    .item-actions {
      display: flex;
      justify-content: space-between;

      .action-btn {
        display: flex;
        align-items: center;
        gap: 8rpx;
        padding: 12rpx 16rpx;
        background: #f8fafc;
        border-radius: 8rpx;
        font-size: 22rpx;
        color: #64748b;
        transition: all 0.2s ease;

        &:active {
          transform: scale(0.95);
          background: #f1f5f9;
        }
      }
    }
  }
}

// 空状态
.empty-state {
  text-align: center;
  padding: 100rpx 40rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  backdrop-filter: blur(10px);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}
</style>
