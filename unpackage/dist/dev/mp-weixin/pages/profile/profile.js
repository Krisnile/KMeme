"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      nickName: "测试用户",
      avatarUrl: "/static/catcats.jpg"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(userInfo.nickName),
        b: userInfo.avatarUrl
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
