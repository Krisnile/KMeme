<template>
  <view class="upload-container">
    <!-- 顶部导航 -->
    <up-navbar
      :border="false"
      :bg-color="navBarBg"
      title="上传图片"
      :title-style="titleStyle"
      :left-icon-color="leftIconColor"
      @leftClick="goBack"
    >
    </up-navbar>

    <view class="content">
      <!-- 上传区域 -->
      <view class="upload-section">
        <view class="section-title">
          <up-icon name="camera" size="20" :color="iconColors.camera"></up-icon>
          <text>选择图片</text>
        </view>

        <!-- 图片选择网格 -->
        <view class="image-grid">
          <view
            v-for="(item, index) in imageList"
            :key="index"
            class="image-item"
            @tap="previewImage(index)"
          >
            <image :src="item" mode="aspectFill" class="image"></image>
            <view class="delete-btn" @tap.stop="deleteImage(index)">
              <up-icon
                name="close"
                size="16"
                :color="iconColors.close"
              ></up-icon>
            </view>
          </view>

          <!-- 添加图片按钮 -->
          <view
            v-if="imageList.length < maxImages"
            class="add-image-btn"
            @tap="chooseImage"
          >
            <up-icon name="plus" size="32" :color="iconColors.plus"></up-icon>
            <text class="add-text">添加图片</text>
            <text class="add-tip">{{ imageList.length }}/{{ maxImages }}</text>
          </view>
        </view>
      </view>

      <!-- 图片信息表单 -->
      <view class="form-section" v-if="imageList.length > 0">
        <view class="section-title">
          <up-icon
            name="edit-pen"
            size="20"
            :color="iconColors.editPen"
          ></up-icon>
          <text>图片信息</text>
        </view>

        <up-form :model="formData" ref="formRef" label-width="120rpx">
          <up-form-item label="图片标题" prop="title" required>
            <up-input
              v-model="formData.title"
              placeholder="给你的图片起个好听的名字"
              :custom-style="inputStyle"
            >
            </up-input>
          </up-form-item>

          <up-form-item label="图片描述" prop="description">
            <up-textarea
              v-model="formData.description"
              placeholder="描述一下这张图片的故事..."
              :count="true"
              :maxlength="200"
              height="120rpx"
              :custom-style="inputStyle"
            >
            </up-textarea>
          </up-form-item>

          <up-form-item label="选择标签" prop="tags">
            <view class="tags-container">
              <view
                v-for="tag in availableTags"
                :key="tag"
                class="tag-item"
                :class="{ active: selectedTags.includes(tag) }"
                @tap="toggleTag(tag)"
              >
                {{ tag }}
              </view>
            </view>
          </up-form-item>

          <up-form-item label="相册分类" prop="category">
            <up-select
              v-model="formData.category"
              :list="categoryList"
              placeholder="选择相册分类"
            >
            </up-select>
          </up-form-item>

          <up-form-item label="是否公开" prop="isPublic">
            <up-switch
              v-model="formData.isPublic"
              :active-color="switchActiveColor"
              size="25"
            >
            </up-switch>
          </up-form-item>
        </up-form>
      </view>

      <!-- 上传按钮区域 -->
      <view class="upload-actions" v-if="imageList.length > 0">
        <up-button
          type="primary"
          :loading="uploading"
          :loading-text="uploadProgress"
          @click="uploadImages"
          :custom-style="uploadBtnStyle"
        >
          {{ uploading ? "上传中..." : "开始上传" }}
        </up-button>

        <up-button
          type="default"
          @click="clearAll"
          :custom-style="clearBtnStyle"
        >
          清空重选
        </up-button>
      </view>

      <!-- 上传进度条 -->
      <view class="progress-section" v-if="uploading">
        <up-line-progress
          :percentage="progressPercentage"
          :show-text="true"
          :active-color="progressActiveColor"
          height="12rpx"
        >
        </up-line-progress>
        <text class="progress-text">{{ uploadProgress }}</text>
      </view>

      <!-- 使用说明 -->
      <view class="tips-section">
        <view class="tips-title">
          <up-icon
            name="info-circle"
            size="18"
            :color="iconColors.infoCircle"
          ></up-icon>
          <text>使用说明</text>
        </view>
        <view class="tips-content">
          <text class="tip-item">• 支持JPG、PNG、GIF格式图片</text>
          <text class="tip-item">• 单张图片大小不超过10MB</text>
          <text class="tip-item">• 最多可同时上传{{ maxImages }}张图片</text>
          <text class="tip-item">• 建议图片尺寸：1080x1080像素</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";

// 响应式数据
const imageList = ref([]);
const maxImages = ref(9);
const uploading = ref(false);
const progressPercentage = ref(0);
const uploadProgress = ref("");
const selectedTags = ref([]);

// 表单数据
const formData = reactive({
  title: "",
  description: "",
  tags: [],
  category: "",
  isPublic: true,
});

// 可选标签
const availableTags = ref([
  "旅行",
  "美食",
  "自然",
  "城市",
  "艺术",
  "运动",
  "动物",
  "建筑",
  "人物",
  "风景",
  "科技",
  "生活",
]);

// 分类列表
const categoryList = ref([
  { label: "风景摄影", value: "landscape" },
  { label: "人像摄影", value: "portrait" },
  { label: "美食摄影", value: "food" },
  { label: "街拍摄影", value: "street" },
  { label: "动物摄影", value: "animal" },
  { label: "建筑摄影", value: "architecture" },
  { label: "其他", value: "other" },
]);

// 样式配置
const navBarBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
const titleStyle = { color: "#fff", fontWeight: "bold" };
const leftIconColor = "#fff";
const iconColors = {
  camera: "#6366f1",
  close: "#fff",
  plus: "#9ca3af",
  editPen: "#6366f1",
  infoCircle: "#10b981",
};
const switchActiveColor = "#6366f1";
const progressActiveColor = "#6366f1";
const inputStyle = {
  backgroundColor: "#f8fafc",
  borderRadius: "12rpx",
  border: "2rpx solid #e2e8f0",
};
const uploadBtnStyle = {
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  border: "none",
  borderRadius: "16rpx",
  height: "88rpx",
  fontSize: "32rpx",
  fontWeight: "bold",
};
const clearBtnStyle = {
  backgroundColor: "#f1f5f9",
  color: "#64748b",
  border: "2rpx solid #e2e8f0",
  borderRadius: "16rpx",
  height: "88rpx",
  fontSize: "28rpx",
};

onLoad(() => {
  console.log("上传页面已加载");
});

// 选择图片
const chooseImage = () => {
  const remainingCount = maxImages.value - imageList.value.length;

  uni.chooseImage({
    count: remainingCount,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success: (res) => {
      // 验证图片
      const validImages = res.tempFilePaths.filter((path) => {
        return validateImage(path);
      });

      imageList.value.push(...validImages);

      if (validImages.length < res.tempFilePaths.length) {
        uni.showToast({
          title: "部分图片格式不支持",
          icon: "none",
        });
      }

      // 自动设置标题
      if (!formData.title && imageList.value.length === 1) {
        formData.title = `我的图片 ${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`;
      }
    },
    fail: () => {
      uni.showToast({
        title: "图片选择失败",
        icon: "none",
      });
    },
  });
};

// 验证图片
const validateImage = (imagePath) => {
  // 这里可以添加图片验证逻辑
  // 例如检查文件大小、格式等
  return true;
};

// 预览图片
const previewImage = (index) => {
  uni.previewImage({
    urls: imageList.value,
    current: index,
  });
};

// 删除图片
const deleteImage = (index) => {
  uni.showModal({
    title: "确认删除",
    content: "确定要删除这张图片吗？",
    confirmColor: "#ef4444",
    success: (res) => {
      if (res.confirm) {
        imageList.value.splice(index, 1);

        // 如果没有图片了，清空表单
        if (imageList.value.length === 0) {
          clearForm();
        }
      }
    },
  });
};

// 切换标签选择
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else if (selectedTags.value.length < 5) {
    selectedTags.value.push(tag);
  } else {
    uni.showToast({
      title: "最多选择5个标签",
      icon: "none",
    });
  }
  formData.tags = selectedTags.value;
};

// 上传图片
const uploadImages = async () => {
  // 表单验证
  if (!formData.title.trim()) {
    uni.showToast({
      title: "请输入图片标题",
      icon: "none",
    });
    return;
  }

  if (selectedTags.value.length === 0) {
    uni.showToast({
      title: "请至少选择一个标签",
      icon: "none",
    });
    return;
  }

  uploading.value = true;
  progressPercentage.value = 0;

  try {
    // 模拟上传过程
    for (let i = 0; i < imageList.value.length; i++) {
      uploadProgress.value = `正在上传第 ${i + 1}/${
        imageList.value.length
      } 张图片...`;

      // 模拟上传API调用
      await uploadSingleImage(imageList.value[i], i);

      progressPercentage.value = Math.round(
        ((i + 1) / imageList.value.length) * 100
      );
    }

    uploadProgress.value = "上传完成！";

    // 上传成功
    uni.showModal({
      title: "上传成功",
      content: `成功上传了 ${imageList.value.length} 张图片！`,
      showCancel: false,
      confirmText: "返回首页",
      success: () => {
        // 清空表单和图片列表
        imageList.value = [];
        clearForm();

        uni.switchTab({
          url: "/pages/index/index",
        });
      },
    });
  } catch (error) {
    console.error("上传失败：", error);
    uni.showToast({
      title: "上传失败，请重试",
      icon: "none",
    });
  } finally {
    uploading.value = false;
  }
};

// 模拟单张图片上传
const uploadSingleImage = (imagePath, index) => {
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      // 这里应该是实际的上传API调用
      console.log(`上传图片 ${index + 1}:`, {
        image: imagePath,
        title: formData.title,
        description: formData.description,
        tags: formData.tags,
        category: formData.category,
        isPublic: formData.isPublic,
      });
      resolve();
    }, 1000 + Math.random() * 1000); // 1-2秒随机延迟
  });
};

// 清空所有内容
const clearAll = () => {
  uni.showModal({
    title: "确认清空",
    content: "确定要清空所有内容重新开始吗？",
    confirmColor: "#ef4444",
    success: (res) => {
      if (res.confirm) {
        imageList.value = [];
        clearForm();
        uni.showToast({
          title: "已清空",
          icon: "success",
        });
      }
    },
  });
};

// 清空表单
const clearForm = () => {
  formData.title = "";
  formData.description = "";
  formData.tags = [];
  formData.category = "";
  formData.isPublic = true;
  selectedTags.value = [];
};

// 返回上一页
const goBack = () => {
  if (imageList.value.length > 0) {
    uni.showModal({
      title: "确认离开",
      content: "离开页面将丢失已选择的图片，确定要离开吗？",
      confirmColor: "#ef4444",
      success: (res) => {
        if (res.confirm) {
          uni.switchTab({
            url: "/pages/index/index",
          });
        }
      },
    });
  } else {
    uni.switchTab({
      url: "/pages/index/index",
    });
  }
};
</script>

<style lang="scss" scoped>
.upload-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.content {
  padding: 20rpx;
  padding-top: 100rpx; // 给顶部导航栏留出空间
  padding-bottom: 100rpx;
}

// 章节标题样式
.section-title {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 24rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
}

// 上传区域
.upload-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  backdrop-filter: blur(10px);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

  .section-title {
    color: #1f2937;
  }
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.image-item {
  position: relative;
  width: 200rpx;
  height: 200rpx;
  border-radius: 16rpx;
  overflow: hidden;

  .image {
    width: 100%;
    height: 100%;
    border-radius: 16rpx;
  }

  .delete-btn {
    position: absolute;
    top: 8rpx;
    right: 8rpx;
    width: 40rpx;
    height: 40rpx;
    background: rgba(239, 68, 68, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }
}

.add-image-btn {
  width: 200rpx;
  height: 200rpx;
  border: 3rpx dashed #d1d5db;
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  background: #f9fafb;
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
    background: #f3f4f6;
  }

  .add-text {
    font-size: 24rpx;
    color: #6b7280;
    font-weight: 500;
  }

  .add-tip {
    font-size: 20rpx;
    color: #9ca3af;
  }
}

// 表单区域
.form-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  backdrop-filter: blur(10px);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

  .section-title {
    color: #1f2937;
  }
}

// 标签容器
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag-item {
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

// 上传按钮区域
.upload-actions {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

// 进度区域
.progress-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  backdrop-filter: blur(10px);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

  .progress-text {
    display: block;
    text-align: center;
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #6366f1;
    font-weight: 500;
  }
}

// 使用说明
.tips-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  padding: 30rpx;
  backdrop-filter: blur(10px);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

  .tips-title {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #10b981;
  }

  .tips-content {
    .tip-item {
      display: block;
      margin-bottom: 12rpx;
      font-size: 26rpx;
      color: #6b7280;
      line-height: 1.5;
    }
  }
}
</style>
