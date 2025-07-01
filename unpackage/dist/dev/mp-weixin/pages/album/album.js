"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_up_lazy_load2 = common_vendor.resolveComponent("up-lazy-load");
  const _easycom_up_waterfall2 = common_vendor.resolveComponent("up-waterfall");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  (_easycom_up_lazy_load2 + _easycom_up_waterfall2 + _easycom_up_icon2)();
}
const _easycom_up_lazy_load = () => "../../uni_modules/uview-plus/components/u-lazy-load/u-lazy-load.js";
const _easycom_up_waterfall = () => "../../uni_modules/uview-plus/components/u-waterfall/u-waterfall.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_up_lazy_load + _easycom_up_waterfall + _easycom_up_icon)();
}
const topBtnIconColor = "#ffffff";
const _sfc_main = {
  __name: "album",
  setup(__props) {
    const title = common_vendor.ref("相册");
    const flowList = common_vendor.ref([]);
    const showTopBtn = common_vendor.ref(0);
    common_vendor.onLoad((options) => {
      Number(options.id);
      title.value = decodeURIComponent(options.title || "相册");
      common_vendor.index.setNavigationBarTitle({ title: title.value });
      api_api.getAlbumImages().then((res) => {
        flowList.value = res.data || [];
      }).catch(() => {
        common_vendor.index.showToast({
          title: "加载图片失败",
          icon: "none"
        });
      });
    });
    common_vendor.onPageScroll((e) => {
      if (e.scrollTop > 600) {
        showTopBtn.value = 1;
      } else {
        showTopBtn.value = 0;
      }
    });
    const toTop = () => {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.w(({
          leftList
        }, s0, i0) => {
          return {
            a: common_vendor.f(leftList, (item, index, i1) => {
              return common_vendor.e({
                a: "7c8b231e-1-" + i0 + "-" + i1 + ",7c8b231e-0",
                b: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "10",
                  image: item.img,
                  index
                }),
                c: common_vendor.t(item.title),
                d: common_vendor.t(item.tag[0]),
                e: common_vendor.t(item.tag[1]),
                f: item.isCollected
              }, item.isCollected ? {
                g: common_vendor.t(item.isCollected)
              } : {}, {
                h: index
              });
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "left",
          path: "a",
          vueId: "7c8b231e-0"
        }),
        b: common_vendor.w(({
          rightList
        }, s0, i0) => {
          return {
            a: common_vendor.f(rightList, (item, index, i1) => {
              return common_vendor.e({
                a: "7c8b231e-2-" + i0 + "-" + i1 + ",7c8b231e-0",
                b: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "10",
                  image: item.img,
                  index
                }),
                c: common_vendor.t(item.title),
                d: common_vendor.t(item.tag[0]),
                e: common_vendor.t(item.tag[1]),
                f: item.isCollected
              }, item.isCollected ? {
                g: common_vendor.t(item.isCollected)
              } : {}, {
                h: index
              });
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "right",
          path: "b",
          vueId: "7c8b231e-0"
        }),
        c: common_vendor.sr("uWaterfallRef", "7c8b231e-0"),
        d: common_vendor.o(($event) => flowList.value = $event),
        e: common_vendor.p({
          modelValue: flowList.value
        }),
        f: showTopBtn.value
      }, showTopBtn.value ? {
        g: common_vendor.p({
          name: "arrow-upward",
          color: topBtnIconColor,
          size: "28"
        }),
        h: common_vendor.o(toTop)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c8b231e"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/album/album.js.map
