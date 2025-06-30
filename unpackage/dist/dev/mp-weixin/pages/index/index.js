"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_up_search2 = common_vendor.resolveComponent("up-search");
  const _easycom_up_swiper2 = common_vendor.resolveComponent("up-swiper");
  const _easycom_up_notice_bar2 = common_vendor.resolveComponent("up-notice-bar");
  const _easycom_up_lazy_load2 = common_vendor.resolveComponent("up-lazy-load");
  (_easycom_up_search2 + _easycom_up_swiper2 + _easycom_up_notice_bar2 + _easycom_up_lazy_load2)();
}
const _easycom_up_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_up_swiper = () => "../../uni_modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_up_notice_bar = () => "../../uni_modules/uview-plus/components/u-notice-bar/u-notice-bar.js";
const _easycom_up_lazy_load = () => "../../uni_modules/uview-plus/components/u-lazy-load/u-lazy-load.js";
if (!Math) {
  (_easycom_up_search + _easycom_up_swiper + _easycom_up_notice_bar + _easycom_up_lazy_load)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const keyword = common_vendor.ref("");
    const bannerList = common_vendor.ref([]);
    const albumList = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      api_api.getBanner().then((res) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:44", res, "res");
        bannerList.value = res.bannerList;
      });
      api_api.getHomeList().then((res) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:48", res, "getHomeList");
        albumList.value = res;
      });
    });
    function goToAlbum(album) {
      common_vendor.index.navigateTo({
        url: `/pages/album/album?id=${album.id}&title=${encodeURIComponent(album.title)}`
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => keyword.value = $event),
        b: common_vendor.p({
          placeholder: "图片搜索",
          ["bg-color"]: "#e3e3e3",
          modelValue: keyword.value
        }),
        c: bannerList.value.length
      }, bannerList.value.length ? {
        d: common_vendor.p({
          list: bannerList.value,
          keyName: "image",
          showTitle: true,
          radius: "8",
          autoplay: true,
          height: "160"
        })
      } : {}, {
        e: common_vendor.p({
          text: "欢迎来到 KMeme 相册系统!",
          ["bg-color"]: "#ffffff"
        }),
        f: common_vendor.f(albumList.value, (album, k0, i0) => {
          return {
            a: "1cf27b2a-3-" + i0,
            b: common_vendor.p({
              image: album.img,
              index: _ctx.index,
              threshold: "-450",
              ["border-radius"]: "10"
            }),
            c: common_vendor.t(album.title),
            d: common_vendor.t(album.tag),
            e: album.id,
            f: common_vendor.o(($event) => goToAlbum(album), album.id)
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
