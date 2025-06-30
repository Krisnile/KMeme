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
    common_vendor.onLoad(() => {
    });
    const userInfo = common_vendor.reactive({
      nickName: "",
      avatarUrl: ""
    });
    const show = common_vendor.ref(false);
    const setFun = () => {
      common_vendor.index.showModal({
        title: "Ciallo～ (∠・ω< )⌒★",
        content: " 授权微信登录后才能正常使用小程序喵",
        success(res) {
          if (res.confirm) {
            common_vendor.index.login({
              success: async (data) => {
                common_vendor.index.__f__("log", "at pages/mine/mine.vue:100", data);
                const { token } = await api_api.login(data.code);
                common_vendor.index.__f__("log", "at pages/mine/mine.vue:103", token, "token");
                common_vendor.index.setStorageSync("token", token);
                const userData = await api_api.getUserInfo();
                userInfo.avatarUrl = userData.avatarUrl;
                userInfo.nickName = userData.nickName;
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
        i: common_vendor.o(_ctx.close),
        j: common_vendor.p({
          show: show.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
