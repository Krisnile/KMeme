"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_navbar2 = common_vendor.resolveComponent("up-navbar");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_textarea2 = common_vendor.resolveComponent("up-textarea");
  const _easycom_up_select2 = common_vendor.resolveComponent("up-select");
  const _easycom_up_switch2 = common_vendor.resolveComponent("up-switch");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_line_progress2 = common_vendor.resolveComponent("up-line-progress");
  (_easycom_up_navbar2 + _easycom_up_icon2 + _easycom_up_input2 + _easycom_up_form_item2 + _easycom_up_textarea2 + _easycom_up_select2 + _easycom_up_switch2 + _easycom_up_form2 + _easycom_up_button2 + _easycom_up_line_progress2)();
}
const _easycom_up_navbar = () => "../../uni_modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_textarea = () => "../../uni_modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_up_select = () => "../../uni_modules/uview-plus/components/u-select/u-select.js";
const _easycom_up_switch = () => "../../uni_modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_line_progress = () => "../../uni_modules/uview-plus/components/u-line-progress/u-line-progress.js";
if (!Math) {
  (_easycom_up_navbar + _easycom_up_icon + _easycom_up_input + _easycom_up_form_item + _easycom_up_textarea + _easycom_up_select + _easycom_up_switch + _easycom_up_form + _easycom_up_button + _easycom_up_line_progress)();
}
const navBarBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
const leftIconColor = "#fff";
const switchActiveColor = "#6366f1";
const progressActiveColor = "#6366f1";
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const imageList = common_vendor.ref([]);
    const maxImages = common_vendor.ref(9);
    const uploading = common_vendor.ref(false);
    const progressPercentage = common_vendor.ref(0);
    const uploadProgress = common_vendor.ref("");
    const selectedTags = common_vendor.ref([]);
    const formData = common_vendor.reactive({
      title: "",
      description: "",
      tags: [],
      category: "",
      isPublic: true
    });
    const availableTags = common_vendor.ref([
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
      "生活"
    ]);
    const categoryList = common_vendor.ref([
      { label: "风景摄影", value: "landscape" },
      { label: "人像摄影", value: "portrait" },
      { label: "美食摄影", value: "food" },
      { label: "街拍摄影", value: "street" },
      { label: "动物摄影", value: "animal" },
      { label: "建筑摄影", value: "architecture" },
      { label: "其他", value: "other" }
    ]);
    const titleStyle = { color: "#fff", fontWeight: "bold" };
    const iconColors = {
      camera: "#6366f1",
      close: "#fff",
      plus: "#9ca3af",
      editPen: "#6366f1",
      infoCircle: "#10b981"
    };
    const inputStyle = {
      backgroundColor: "#f8fafc",
      borderRadius: "12rpx",
      border: "2rpx solid #e2e8f0"
    };
    const uploadBtnStyle = {
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      border: "none",
      borderRadius: "16rpx",
      height: "88rpx",
      fontSize: "32rpx",
      fontWeight: "bold"
    };
    const clearBtnStyle = {
      backgroundColor: "#f1f5f9",
      color: "#64748b",
      border: "2rpx solid #e2e8f0",
      borderRadius: "16rpx",
      height: "88rpx",
      fontSize: "28rpx"
    };
    common_vendor.onLoad(() => {
      common_vendor.index.__f__("log", "at pages/add/add.vue:225", "上传页面已加载");
    });
    const chooseImage = () => {
      const remainingCount = maxImages.value - imageList.value.length;
      common_vendor.index.chooseImage({
        count: remainingCount,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const validImages = res.tempFilePaths.filter((path) => {
            return validateImage();
          });
          imageList.value.push(...validImages);
          if (validImages.length < res.tempFilePaths.length) {
            common_vendor.index.showToast({
              title: "部分图片格式不支持",
              icon: "none"
            });
          }
          if (!formData.title && imageList.value.length === 1) {
            formData.title = `我的图片 ${(/* @__PURE__ */ new Date()).getMonth() + 1}-${(/* @__PURE__ */ new Date()).getDate()}`;
          }
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "图片选择失败",
            icon: "none"
          });
        }
      });
    };
    const validateImage = (imagePath) => {
      return true;
    };
    const previewImage = (index) => {
      common_vendor.index.previewImage({
        urls: imageList.value,
        current: index
      });
    };
    const deleteImage = (index) => {
      common_vendor.index.showModal({
        title: "确认删除",
        content: "确定要删除这张图片吗？",
        confirmColor: "#ef4444",
        success: (res) => {
          if (res.confirm) {
            imageList.value.splice(index, 1);
            if (imageList.value.length === 0) {
              clearForm();
            }
          }
        }
      });
    };
    const toggleTag = (tag) => {
      const index = selectedTags.value.indexOf(tag);
      if (index > -1) {
        selectedTags.value.splice(index, 1);
      } else if (selectedTags.value.length < 5) {
        selectedTags.value.push(tag);
      } else {
        common_vendor.index.showToast({
          title: "最多选择5个标签",
          icon: "none"
        });
      }
      formData.tags = selectedTags.value;
    };
    const uploadImages = async () => {
      if (!formData.title.trim()) {
        common_vendor.index.showToast({
          title: "请输入图片标题",
          icon: "none"
        });
        return;
      }
      if (selectedTags.value.length === 0) {
        common_vendor.index.showToast({
          title: "请至少选择一个标签",
          icon: "none"
        });
        return;
      }
      uploading.value = true;
      progressPercentage.value = 0;
      try {
        for (let i = 0; i < imageList.value.length; i++) {
          uploadProgress.value = `正在上传第 ${i + 1}/${imageList.value.length} 张图片...`;
          await uploadSingleImage(imageList.value[i], i);
          progressPercentage.value = Math.round((i + 1) / imageList.value.length * 100);
        }
        uploadProgress.value = "上传完成！";
        common_vendor.index.showModal({
          title: "上传成功",
          content: `成功上传了 ${imageList.value.length} 张图片！`,
          showCancel: false,
          confirmText: "返回首页",
          success: () => {
            common_vendor.index.switchTab({
              url: "pages/index/index"
            });
          }
        });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/add/add.vue:364", "上传失败：", error);
        common_vendor.index.showToast({
          title: "上传失败，请重试",
          icon: "none"
        });
      } finally {
        uploading.value = false;
      }
    };
    const uploadSingleImage = (imagePath, index) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          common_vendor.index.__f__("log", "at pages/add/add.vue:380", `上传图片 ${index + 1}:`, {
            image: imagePath,
            title: formData.title,
            description: formData.description,
            tags: formData.tags,
            category: formData.category,
            isPublic: formData.isPublic
          });
          resolve();
        }, 1e3 + Math.random() * 1e3);
      });
    };
    const clearAll = () => {
      common_vendor.index.showModal({
        title: "确认清空",
        content: "确定要清空所有内容重新开始吗？",
        confirmColor: "#ef4444",
        success: (res) => {
          if (res.confirm) {
            imageList.value = [];
            clearForm();
            common_vendor.index.showToast({
              title: "已清空",
              icon: "success"
            });
          }
        }
      });
    };
    const clearForm = () => {
      formData.title = "";
      formData.description = "";
      formData.tags = [];
      formData.category = "";
      formData.isPublic = true;
      selectedTags.value = [];
    };
    const goBack = () => {
      if (imageList.value.length > 0) {
        common_vendor.index.showModal({
          title: "确认离开",
          content: "离开页面将丢失已选择的图片，确定要离开吗？",
          confirmColor: "#ef4444",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.switchTab({
                url: "pages/index/index"
              });
            }
          }
        });
      } else {
        common_vendor.index.switchTab({
          url: "pages/index/index"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.p({
          border: false,
          ["bg-color"]: navBarBg,
          title: "上传图片",
          ["title-style"]: titleStyle,
          ["left-icon-color"]: leftIconColor
        }),
        c: common_vendor.p({
          name: "camera",
          size: "20",
          color: iconColors.camera
        }),
        d: common_vendor.f(imageList.value, (item, index, i0) => {
          return {
            a: item,
            b: "e8d2fd40-2-" + i0,
            c: common_vendor.o(($event) => deleteImage(index), index),
            d: index,
            e: common_vendor.o(($event) => previewImage(index), index)
          };
        }),
        e: common_vendor.p({
          name: "close",
          size: "16",
          color: iconColors.close
        }),
        f: imageList.value.length < maxImages.value
      }, imageList.value.length < maxImages.value ? {
        g: common_vendor.p({
          name: "plus",
          size: "32",
          color: iconColors.plus
        }),
        h: common_vendor.t(imageList.value.length),
        i: common_vendor.t(maxImages.value),
        j: common_vendor.o(chooseImage)
      } : {}, {
        k: imageList.value.length > 0
      }, imageList.value.length > 0 ? {
        l: common_vendor.p({
          name: "edit-pen",
          size: "20",
          color: iconColors.editPen
        }),
        m: common_vendor.o(($event) => formData.title = $event),
        n: common_vendor.p({
          placeholder: "给你的图片起个好听的名字",
          ["custom-style"]: inputStyle,
          modelValue: formData.title
        }),
        o: common_vendor.p({
          label: "图片标题",
          prop: "title",
          required: true
        }),
        p: common_vendor.o(($event) => formData.description = $event),
        q: common_vendor.p({
          placeholder: "描述一下这张图片的故事...",
          count: true,
          maxlength: 200,
          height: "120rpx",
          ["custom-style"]: inputStyle,
          modelValue: formData.description
        }),
        r: common_vendor.p({
          label: "图片描述",
          prop: "description"
        }),
        s: common_vendor.f(availableTags.value, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag,
            c: selectedTags.value.includes(tag) ? 1 : "",
            d: common_vendor.o(($event) => toggleTag(tag), tag)
          };
        }),
        t: common_vendor.p({
          label: "选择标签",
          prop: "tags"
        }),
        v: common_vendor.o(($event) => formData.category = $event),
        w: common_vendor.p({
          list: categoryList.value,
          placeholder: "选择相册分类",
          modelValue: formData.category
        }),
        x: common_vendor.p({
          label: "相册分类",
          prop: "category"
        }),
        y: common_vendor.o(($event) => formData.isPublic = $event),
        z: common_vendor.p({
          ["active-color"]: switchActiveColor,
          size: "25",
          modelValue: formData.isPublic
        }),
        A: common_vendor.p({
          label: "是否公开",
          prop: "isPublic"
        }),
        B: common_vendor.sr("formRef", "e8d2fd40-5"),
        C: common_vendor.p({
          model: formData,
          ["label-width"]: "120rpx"
        })
      } : {}, {
        D: imageList.value.length > 0
      }, imageList.value.length > 0 ? {
        E: common_vendor.t(uploading.value ? "上传中..." : "开始上传"),
        F: common_vendor.o(uploadImages),
        G: common_vendor.p({
          type: "primary",
          loading: uploading.value,
          ["loading-text"]: uploadProgress.value,
          ["custom-style"]: uploadBtnStyle
        }),
        H: common_vendor.o(clearAll),
        I: common_vendor.p({
          type: "default",
          ["custom-style"]: clearBtnStyle
        })
      } : {}, {
        J: uploading.value
      }, uploading.value ? {
        K: common_vendor.p({
          percentage: progressPercentage.value,
          ["show-text"]: true,
          ["active-color"]: progressActiveColor,
          height: "12rpx"
        }),
        L: common_vendor.t(uploadProgress.value)
      } : {}, {
        M: common_vendor.p({
          name: "info-circle",
          size: "18",
          color: iconColors.infoCircle
        }),
        N: common_vendor.t(maxImages.value)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e8d2fd40"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/add/add.js.map
