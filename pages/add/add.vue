<template>
  <view class="upload-container">
    <!-- 顶部导航 -->
    <up-status-bar></up-status-bar>
    <up-navbar
      :border="false"
      :bg-color="BarBg"
      title="上传图片&新建相册"
      :title-style="titleStyle"
      :left-icon-color="leftIconColor"
      @leftClick="goBack"
    >
    </up-navbar>

    <view class="content">
      <!-- 功能模式切换 -->
      <view class="mode-switch">
        <view
          class="mode-item"
          :class="{ active: currentMode === 'upload' }"
          @tap="switchMode('upload')"
        >
          <up-icon
            name="camera"
            size="20"
            :color="currentMode === 'upload' ? '#fff' : '#6366f1'"
          ></up-icon>
          <text>上传图片</text>
        </view>
        <view
          class="mode-item"
          :class="{ active: currentMode === 'album' }"
          @tap="switchMode('album')"
        >
          <up-icon
            name="grid"
            size="20"
            :color="currentMode === 'album' ? '#fff' : '#6366f1'"
          ></up-icon>
          <text>新建相册</text>
        </view>
      </view>

      <!-- 上传图片模式 -->
      <view v-if="currentMode === 'upload'">
        <!-- 上传区域 -->
        <view class="upload-section">
          <view class="section-title">
            <up-icon
              name="camera"
              size="20"
              :color="iconColors.camera"
            ></up-icon>
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
              <text class="add-tip"
                >{{ imageList.length }}/{{ maxImages }}</text
              >
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

      <!-- 新建相册模式 -->
      <view v-if="currentMode === 'album'">
        <!-- 相册封面选择 -->
        <view class="album-cover-section">
          <view class="section-title">
            <up-icon
              name="image"
              size="20"
              :color="iconColors.camera"
            ></up-icon>
            <text>选择封面</text>
          </view>

          <view class="cover-container">
            <view
              v-if="albumData.imgUrl"
              class="cover-preview"
              @tap="previewAlbumCover"
            >
              <image
                :src="albumData.imgUrl"
                mode="aspectFill"
                class="cover-image"
              ></image>
              <view class="change-cover-btn" @tap.stop="chooseAlbumCover">
                <up-icon
                  name="camera"
                  size="16"
                  :color="iconColors.close"
                ></up-icon>
              </view>
            </view>
            <view v-else class="cover-placeholder" @tap="chooseAlbumCover">
              <up-icon
                name="image"
                size="40"
                :color="iconColors.plus"
              ></up-icon>
              <text class="placeholder-text">选择相册封面</text>
              <text class="placeholder-tip">建议尺寸: 400x300</text>
            </view>
          </view>
        </view>

        <!-- 相册信息表单 -->
        <view class="form-section">
          <view class="section-title">
            <up-icon
              name="edit-pen"
              size="20"
              :color="iconColors.editPen"
            ></up-icon>
            <text>相册信息</text>
          </view>

          <up-form :model="albumData" ref="albumFormRef" label-width="120rpx">
            <up-form-item label="相册名称" prop="title" required>
              <up-input
                v-model="albumData.title"
                placeholder="给你的相册起个好听的名字"
                :custom-style="inputStyle"
              >
              </up-input>
            </up-form-item>

            <up-form-item label="相册描述" prop="description">
              <up-textarea
                v-model="albumData.description"
                placeholder="描述一下这个相册的内容..."
                :count="true"
                :maxlength="200"
                height="120rpx"
                :custom-style="inputStyle"
              >
              </up-textarea>
            </up-form-item>

            <up-form-item label="相册标签" prop="tag">
              <view class="tags-container">
                <view
                  v-for="tag in availableTags"
                  :key="tag"
                  class="tag-item"
                  :class="{ active: albumData.tag === tag }"
                  @tap="selectAlbumTag(tag)"
                >
                  {{ tag }}
                </view>
              </view>
            </up-form-item>
          </up-form>
        </view>

        <!-- 创建相册按钮 -->
        <view class="create-actions">
          <up-button
            type="primary"
            :loading="creating"
            @click="createAlbum"
            :custom-style="uploadBtnStyle"
          >
            {{ creating ? "创建中..." : "创建相册" }}
          </up-button>

          <up-button
            type="default"
            @click="clearAlbumData"
            :custom-style="clearBtnStyle"
          >
            重置表单
          </up-button>
        </view>

        <!-- 相册创建说明 -->
        <view class="tips-section">
          <view class="tips-title">
            <up-icon
              name="info-circle"
              size="18"
              :color="iconColors.infoCircle"
            ></up-icon>
            <text>创建说明</text>
          </view>
          <view class="tips-content">
            <text class="tip-item">• 相册名称为必填项</text>
            <text class="tip-item">• 封面图片建议尺寸为400x300像素</text>
            <text class="tip-item">• 每个相册需要选择一个主要标签</text>
            <text class="tip-item">• 创建后可以继续添加图片到相册中</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";

// 响应式数据
const currentMode = ref("upload"); // 当前模式：'upload' 上传图片, 'album' 新建相册
const imageList = ref([]); // 存储待上传的图片文件路径
const maxImages = ref(9);
const uploading = ref(false);
const creating = ref(false);
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

// 相册数据
const albumData = reactive({
  title: "",
  description: "",
  tag: "",
  imgUrl: "",
  userId: -1,
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
const BarBg = "#5e2ec0";
// const navBarBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
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

// ===================== 图片上传模式相关函数=====================

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

// ===================== 新建相册模式相关函数 =====================

// 切换模式 (通用函数)
const switchMode = (mode) => {
  currentMode.value = mode;

  // 切换模式时清空提示
  uni.showToast({
    title: mode === "upload" ? "切换到上传图片模式" : "切换到新建相册模式",
    icon: "none",
    duration: 1500,
  });
};

// 选择相册封面
const chooseAlbumCover = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success: (res) => {
      if (res.tempFilePaths && res.tempFilePaths.length > 0) {
        albumData.imgUrl = res.tempFilePaths[0];
        uni.showToast({
          title: "封面选择成功",
          icon: "success",
        });
      }
    },
    fail: () => {
      uni.showToast({
        title: "封面选择失败",
        icon: "none",
      });
    },
  });
};

// 预览相册封面
const previewAlbumCover = () => {
  if (albumData.imgUrl) {
    uni.previewImage({
      urls: [albumData.imgUrl],
      current: albumData.imgUrl,
    });
  }
};

// 选择相册标签（单选）
const selectAlbumTag = (tag) => {
  albumData.tag = albumData.tag === tag ? "" : tag;
};

// 创建相册
const createAlbum = async () => {
  // 表单验证
  if (!albumData.title.trim()) {
    uni.showToast({
      title: "请输入相册名称",
      icon: "none",
    });
    return;
  }

  if (!albumData.tag) {
    uni.showToast({
      title: "请选择相册标签",
      icon: "none",
    });
    return;
  }

  if (!albumData.imgUrl) {
    uni.showToast({
      title: "请选择相册封面",
      icon: "none",
    });
    return;
  }

  // 从 userInfo 中获取 ID
  const storedUserInfo = JSON.parse(uni.getStorageSync('userInfo') || '{}');
  const userId = storedUserInfo.userId;
  // userId 存在性检查
  if (!userId || userId === -1) {
    uni.showToast({ title: "用户ID缺失，请先登录", icon: "none" });
    creating.value = false;
    return;
  }
  // 将获取到的 userId 赋值给 albumData
  albumData.userId = storedUserInfo.userId;

  // 确保 albumData.imgUrl 是一个本地临时文件路径
  if (!albumData.imgUrl.startsWith('wxfile://') && !albumData.imgUrl.startsWith('http://tmp/')) {
    uni.showToast({ title: '封面图片必须从本地选择', icon: 'error' });
    creating.value = false;
    return;
  }

  creating.value = true; // 显示加载状态

  try {
    uni.showLoading({ title: '创建相册中...' }); // 显示上传和创建的统一加载提示

    // 模拟创建相册API调用
    // await createAlbumApi(albumData);

    // 使用 uni.uploadFile 同时上传图片和 formData
    const uploadRes = await uni.uploadFile({
      // multipart/form-data 类型请求
      url: 'http://192.168.31.246:8080/api/user/album/create',
      filePath: albumData.imgUrl, // 要上传的本地文件路径 (wxfile:// 或 http://tmp/)
      name: 'file', // 后端接收图片文件的字段名，例如：<input type="file" name="file">
      header: {
        'token': uni.getStorageSync('token') || '' // 如果上传接口需要 Token，请携带
      },
      formData: { // 将相册的其他文字信息放入 formData
        title: albumData.title,
        description: albumData.description,
        tag: albumData.tag,
        userId: albumData.userId.toString(), // userId 可能是数字，formData 最好是字符串
        isPublic: albumData.isPublic ? 'true' : 'false', // 布尔值转字符串
      },
    });
    uni.hideLoading();

    // 解析后端返回的响应数据
    const responseData = JSON.parse(uploadRes.data);
    // {
    //     "code": 1,
    //     "msg": "相册创建成功",
    //     "data": {
    //         "albumId": "generated_unique_album_id_string_or_number",
    //         "imgUrl": "https://your-public-cdn.com/new_cover.jpg",
    //         "title": "新相册标题"
    //     }
    // }
    console.log("responseData", responseData)
    // 根据后端响应判断是否创建成功
    if (responseData.code === 1 || responseData.msg === "success") { // 这里的判断要和 http.js 保持一致
        // 创建成功
        uni.showModal({
            title: "创建成功",
            content: `相册"${albumData.title}"创建成功！`,
            showCancel: false,
            confirmText: "返回首页",
            success: () => {
                clearAlbumData(); // 清空表单数据
                uni.switchTab({
                    url: "/pages/index/index", // 返回首页
                });
            },
        });
    } else {
        // 后端业务失败
        uni.showToast({ title: responseData.msg || '创建失败，请重试', icon: 'error' });
        console.error("创建相册后端响应业务失败:", responseData);
    }

  } catch (error) {
    // 请求失败或解析错误
    uni.hideLoading();
    console.error("创建相册失败：", error);
    uni.showToast({
      title: "创建失败，请重试",
      icon: "none",
    });
  } finally {
    creating.value = false; // 无论成功或失败都关闭加载状态
  }
};

// 模拟创建相册API
const createAlbumApi = (albumInfo) => {
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      console.log("创建相册:", {
        title: albumInfo.title,
        description: albumInfo.description,
        tag: albumInfo.tag,
        imgUrl: albumInfo.imgUrl,
        userId: 1, // 假设当前用户ID为1
        albumId: Date.now(), // 使用时间戳作为ID
      });
      resolve();
    }, 1000 + Math.random() * 1000); // 1-2秒随机延迟
  });
};

// 清空相册数据 (通用函数)
const clearAlbumData = () => {
  albumData.title = "";
  albumData.description = "";
  albumData.tag = "";
  albumData.imgUrl = "";

  uni.showToast({
    title: "表单已重置",
    icon: "success",
  });
};
</script>

<style lang="scss" scoped>
.upload-container {
  min-height: 100vh;
}

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

// 功能模式切换
.mode-switch {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.mode-item {
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

// 相册封面选择
.album-cover-section {
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

.cover-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
  border: 2rpx dashed #e2e8f0;
  border-radius: 16rpx;
  margin-bottom: 20rpx;

  .cover-preview {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 16rpx;
    overflow: hidden;

    .cover-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .change-cover-btn {
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

  .cover-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8rpx;
    padding: 20rpx;
    border: 2rpx dashed #e2e8f0;
    border-radius: 16rpx;
    width: 100%;
    height: 100%;

    .placeholder-text {
      font-size: 24rpx;
      color: #6b7280;
    }

    .placeholder-tip {
      font-size: 20rpx;
      color: #9ca3af;
    }
  }
}

// 创建相册按钮区域
.create-actions {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}
</style>
