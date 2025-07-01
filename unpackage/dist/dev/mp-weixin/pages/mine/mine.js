"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_switch2 = common_vendor.resolveComponent("up-switch");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  (_easycom_up_avatar2 + _easycom_up_icon2 + _easycom_up_switch2 + _easycom_up_button2 + _easycom_up_popup2)();
}
const _easycom_up_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_switch = () => "../../uni_modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_up_avatar + _easycom_up_icon + _easycom_up_switch + _easycom_up_button + _easycom_up_popup)();
}
const switchActiveColor = "#6366f1";
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      nickName: "KMeme用户",
      description: "热爱摄影，记录美好生活",
      avatarUrl: "https://cdn.uviewui.com/uview/album/1.jpg",
      uploadCount: 23,
      collectCount: 47,
      likeCount: 156
    });
    const settings = common_vendor.reactive({
      notification: true,
      autoSave: true,
      highQuality: false
    });
    const monthStats = common_vendor.reactive({
      uploads: 8,
      views: 342,
      likes: 89,
      collects: 23
    });
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
      statsHeart: "#ef4444"
    };
    const logoutBtnStyle = {
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      border: "none",
      borderRadius: "12rpx",
      height: "88rpx",
      fontSize: "32rpx",
      fontWeight: "bold"
    };
    common_vendor.onLoad(async () => {
      loadUserData();
      if (common_vendor.index.getStorageSync("token") && !common_vendor.index.getStorageSync("userInfo")) {
        const { avatarUrl, nickName } = await getUserInfo();
        userInfo.avatarUrl = avatarUrl;
        userInfo.nickName = nickName;
      } else if (common_vendor.index.getStorageSync("token") && common_vendor.index.getStorageSync("userInfo")) {
        const { avatarUrl, nickName } = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
        userInfo.avatarUrl = avatarUrl;
        userInfo.nickName = nickName;
      }
    });
    common_vendor.onShow(() => {
      refreshStats();
    });
    const loadUserData = () => {
      common_vendor.index.__f__("log", "at pages/mine/mine.vue:264", "加载用户数据");
    };
    const refreshStats = () => {
      common_vendor.index.__f__("log", "at pages/mine/mine.vue:270", "刷新统计数据");
    };
    const editAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          userInfo.avatarUrl = res.tempFilePaths[0];
          common_vendor.index.showToast({
            title: "头像已更新",
            icon: "success"
          });
        }
      });
    };
    const editProfile = () => {
      common_vendor.index.showModal({
        title: "编辑昵称",
        editable: true,
        placeholderText: userInfo.nickName,
        success: (res) => {
          if (res.confirm && res.content) {
            userInfo.nickName = res.content;
            common_vendor.index.showToast({
              title: "昵称已更新",
              icon: "success"
            });
          }
        }
      });
    };
    const goToMyUploads = () => {
      common_vendor.index.showToast({
        title: "我的上传功能开发中",
        icon: "none"
      });
    };
    const goToMyCollections = () => {
      common_vendor.index.switchTab({
        url: "pages/collect/collect"
      });
    };
    const goToMyHistory = () => {
      common_vendor.index.showToast({
        title: "浏览历史功能开发中",
        icon: "none"
      });
    };
    const goToSettings = () => {
      common_vendor.index.showActionSheet({
        itemList: ["清除缓存", "检查更新", "隐私设置"],
        success: (res) => {
          const actions = ["清除缓存", "检查更新", "隐私设置"];
          common_vendor.index.showToast({
            title: `${actions[res.tapIndex]}功能开发中`,
            icon: "none"
          });
        }
      });
    };
    const toggleNotification = () => {
      common_vendor.index.showToast({
        title: settings.notification ? "已开启推送" : "已关闭推送",
        icon: "success"
      });
    };
    const shareApp = () => {
      common_vendor.index.share({
        title: "KMeme - 美图分享社区",
        content: "发现和分享美好瞬间",
        success: () => {
          common_vendor.index.showToast({
            title: "分享成功",
            icon: "success"
          });
        }
      });
    };
    const close = () => {
      show.value = false;
    };
    const userSubmit = () => {
      common_vendor.index.setStorageSync("userInfo", JSON.stringify(userInfo));
      show.value = false;
    };
    const onChooseavatar = (e) => {
      userInfo.avatarUrl = e.detail.avatarUrl;
    };
    const changeName = (e) => {
      userInfo.nickName = e.detail.value;
    };
    const goToFeedback = () => {
      common_vendor.index.showModal({
        title: "意见反馈",
        content: "您可以通过邮箱 feedback@kmeme.com 向我们反馈问题和建议",
        showCancel: false
      });
    };
    const goToAbout = () => {
      common_vendor.index.showModal({
        title: "KMeme v1.0.0",
        content: "KMeme是一个专注于图片分享的社区平台，致力于让每个人都能发现和分享生活中的美好瞬间。",
        showCancel: false
      });
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出登录吗？",
        confirmColor: "#ef4444",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/mine/mine.vue:416", "确认登录");
            common_vendor.index.login({
              success: async (data) => {
                common_vendor.index.__f__("log", "at pages/mine/mine.vue:419", data);
                const { token } = await login(data.code);
                common_vendor.index.__f__("log", "at pages/mine/mine.vue:422", token, "token");
                common_vendor.index.setStorageSync("token", token);
                const userData = await getUserInfo();
                userInfo.avatarUrl = userData.avatarUrl;
                userInfo.nickName = userData.nickName;
                show.value = true;
              },
              fail(err) {
                common_vendor.index.__f__("error", "at pages/mine/mine.vue:432", "uni.login调用失败:", err);
                common_vendor.index.showToast({ title: "登录失败，请重试", icon: "error" });
              }
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          src: userInfo.avatarUrl,
          size: "120",
          shape: "circle",
          random: true
        }),
        b: common_vendor.p({
          name: "camera",
          size: "16",
          color: iconColors.camera
        }),
        c: common_vendor.o(editAvatar),
        d: common_vendor.t(userInfo.nickName),
        e: common_vendor.t(userInfo.description),
        f: common_vendor.t(userInfo.uploadCount),
        g: common_vendor.t(userInfo.collectCount),
        h: common_vendor.t(userInfo.likeCount),
        i: common_vendor.p({
          name: "camera",
          size: "20",
          color: iconColors.menuCamera
        }),
        j: userInfo.uploadCount > 0
      }, userInfo.uploadCount > 0 ? {
        k: common_vendor.t(userInfo.uploadCount)
      } : {}, {
        l: common_vendor.p({
          name: "arrow-right",
          size: "16",
          color: iconColors.arrowRight
        }),
        m: common_vendor.o(goToMyUploads),
        n: common_vendor.p({
          name: "heart",
          size: "20",
          color: iconColors.heart
        }),
        o: userInfo.collectCount > 0
      }, userInfo.collectCount > 0 ? {
        p: common_vendor.t(userInfo.collectCount)
      } : {}, {
        q: common_vendor.p({
          name: "arrow-right",
          size: "16",
          color: iconColors.arrowRight
        }),
        r: common_vendor.o(goToMyCollections),
        s: common_vendor.p({
          name: "clock",
          size: "20",
          color: iconColors.clock
        }),
        t: common_vendor.p({
          name: "arrow-right",
          size: "16",
          color: iconColors.arrowRight
        }),
        v: common_vendor.o(goToMyHistory),
        w: common_vendor.p({
          name: "account",
          size: "20",
          color: iconColors.account
        }),
        x: common_vendor.p({
          name: "arrow-right",
          size: "16",
          color: iconColors.arrowRight
        }),
        y: common_vendor.o(editProfile),
        z: common_vendor.p({
          name: "setting",
          size: "20",
          color: iconColors.setting
        }),
        A: common_vendor.p({
          name: "arrow-right",
          size: "16",
          color: iconColors.arrowRight
        }),
        B: common_vendor.o(goToSettings),
        C: common_vendor.p({
          name: "bell",
          size: "20",
          color: iconColors.bell
        }),
        D: common_vendor.o(($event) => settings.notification = $event),
        E: common_vendor.p({
          size: "20",
          ["active-color"]: switchActiveColor,
          modelValue: settings.notification
        }),
        F: common_vendor.o(toggleNotification),
        G: common_vendor.p({
          name: "share",
          size: "20",
          color: iconColors.share
        }),
        H: common_vendor.p({
          name: "arrow-right",
          size: "16",
          color: iconColors.arrowRight
        }),
        I: common_vendor.o(shareApp),
        J: common_vendor.p({
          name: "chat",
          size: "20",
          color: iconColors.chat
        }),
        K: common_vendor.p({
          name: "arrow-right",
          size: "16",
          color: iconColors.arrowRight
        }),
        L: common_vendor.o(goToFeedback),
        M: common_vendor.p({
          name: "info-circle",
          size: "20",
          color: iconColors.infoCircle
        }),
        N: common_vendor.p({
          name: "arrow-right",
          size: "16",
          color: iconColors.arrowRight
        }),
        O: common_vendor.o(goToAbout),
        P: common_vendor.p({
          name: "camera",
          size: "24",
          color: iconColors.statsCamera
        }),
        Q: common_vendor.t(monthStats.uploads),
        R: common_vendor.p({
          name: "eye",
          size: "24",
          color: iconColors.eye
        }),
        S: common_vendor.t(monthStats.views),
        T: common_vendor.p({
          name: "thumb-up",
          size: "24",
          color: iconColors.thumbUp
        }),
        U: common_vendor.t(monthStats.likes),
        V: common_vendor.p({
          name: "heart",
          size: "24",
          color: iconColors.statsHeart
        }),
        W: common_vendor.t(monthStats.collects),
        X: common_vendor.o(logout),
        Y: common_vendor.p({
          type: "error",
          ["custom-style"]: logoutBtnStyle
        }),
        Z: userInfo.avatarUrl,
        aa: common_vendor.o(onChooseavatar),
        ab: common_vendor.o(changeName),
        ac: common_vendor.o(userSubmit),
        ad: common_vendor.o(close),
        ae: common_vendor.p({
          closeable: true,
          show: _ctx.show,
          round: "20"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
