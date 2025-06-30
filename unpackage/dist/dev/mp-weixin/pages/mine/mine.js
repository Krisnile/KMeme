"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  (_easycom_uni_icons2 + _easycom_up_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_up_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_up_popup)();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    common_vendor.onLoad(async () => {
      if (common_vendor.index.getStorageSync("token") && !common_vendor.index.getStorageSync("userInfo")) {
        const { avatarUrl, nickName } = await api_api.getUserInfo();
        userInfo.avatarUrl = avatarUrl;
        userInfo.nickName = nickName;
      } else if (common_vendor.index.getStorageSync("token") && common_vendor.index.getStorageSync("userInfo")) {
        const { avatarUrl, nickName } = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
        userInfo.avatarUrl = avatarUrl;
        userInfo.nickName = nickName;
      }
    });
    const userInfo = common_vendor.reactive({
      nickName: "",
      avatarUrl: ""
    });
    const show = common_vendor.ref(false);
    const close = () => {
      show.value = false;
    };
    const userSubmit = () => {
      common_vendor.index.setStorageSync("userInfo", JSON.stringify(userInfo));
      show.value = false;
    };
    const goToProfile = () => {
      common_vendor.index.navigateTo({
        url: "/pages/profile/profile"
      });
    };
    const onChooseavatar = (e) => {
      userInfo.avatarUrl = e.detail.avatarUrl;
    };
    const changeName = (e) => {
      userInfo.nickName = e.detail.value;
    };
    const setFun = () => {
      common_vendor.index.showModal({
        title: "Ciallo～ (∠・ω< )⌒★",
        content: " 授权微信登录后才能正常使用小程序喵",
        success(res) {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/mine/mine.vue:162", "确认登录");
            common_vendor.index.login({
              success: async (data) => {
                common_vendor.index.__f__("log", "at pages/mine/mine.vue:165", data);
                const { token } = await api_api.login(data.code);
                common_vendor.index.__f__("log", "at pages/mine/mine.vue:168", token, "token");
                common_vendor.index.setStorageSync("token", token);
                const userData = await api_api.getUserInfo();
                userInfo.avatarUrl = userData.avatarUrl;
                userInfo.nickName = userData.nickName;
                show.value = true;
              },
              fail(err) {
                common_vendor.index.__f__("error", "at pages/mine/mine.vue:178", "uni.login调用失败:", err);
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
          type: "caledar",
          size: "30",
          color: "#ffffff"
        }),
        b: common_vendor.p({
          type: "gear",
          size: "30",
          color: "#ffffff"
        }),
        c: common_vendor.p({
          type: "chat",
          size: "30",
          color: "#ffffff"
        }),
        d: !userInfo.nickName
      }, !userInfo.nickName ? {
        e: common_assets._imports_0
      } : {
        f: userInfo.avatarUrl,
        g: common_vendor.t(userInfo.nickName)
      }, {
        h: common_vendor.o(setFun),
        i: common_vendor.p({
          type: "person-filled",
          size: "20"
        }),
        j: common_vendor.o(goToProfile),
        k: common_vendor.p({
          type: "chatboxes-filled",
          size: "20"
        }),
        l: common_vendor.p({
          type: "link",
          size: "20"
        }),
        m: common_vendor.p({
          type: "info",
          size: "20"
        }),
        n: userInfo.avatarUrl,
        o: common_vendor.o(onChooseavatar),
        p: common_vendor.o(changeName),
        q: common_vendor.o(userSubmit),
        r: common_vendor.o(close),
        s: common_vendor.p({
          closeable: true,
          show: show.value,
          round: "20"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
