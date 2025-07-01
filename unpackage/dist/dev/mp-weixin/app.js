"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./uni_modules/uview-plus/libs/function/index.js");
require("./uni_modules/uview-plus/libs/util/route.js");
require("./uni_modules/uview-plus/libs/config/config.js");
require("./uni_modules/uview-plus/libs/config/props.js");
require("./uni_modules/uview-plus/libs/function/http.js");
require("./api/mock.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/add/add.js";
  "./pages/collect/collect.js";
  "./pages/mine/mine.js";
  "./pages/album/album.js";
  "./pages/profile/profile.js";
  "./pages/search/search.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
