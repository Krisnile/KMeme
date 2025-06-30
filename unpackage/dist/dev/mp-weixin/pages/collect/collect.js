"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
const _sfc_main = {
  __name: "collect",
  setup(__props) {
    const linklist = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      api_api.collectList().then((res) => {
        common_vendor.index.__f__("log", "at pages/collect/collect.vue:29", res);
        linklist.value = res;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(linklist.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.title),
            c: index
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/collect/collect.js.map
