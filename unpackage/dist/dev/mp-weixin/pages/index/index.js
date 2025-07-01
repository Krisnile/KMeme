"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_up_status_bar2 = common_vendor.resolveComponent("up-status-bar");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_search2 = common_vendor.resolveComponent("up-search");
  const _easycom_up_swiper2 = common_vendor.resolveComponent("up-swiper");
  const _easycom_up_lazy_load2 = common_vendor.resolveComponent("up-lazy-load");
  const _easycom_up_line2 = common_vendor.resolveComponent("up-line");
  (_easycom_up_status_bar2 + _easycom_up_icon2 + _easycom_up_search2 + _easycom_up_swiper2 + _easycom_up_lazy_load2 + _easycom_up_line2)();
}
const _easycom_up_status_bar = () => "../../uni_modules/uview-plus/components/u-status-bar/u-status-bar.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_up_swiper = () => "../../uni_modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_up_lazy_load = () => "../../uni_modules/uview-plus/components/u-lazy-load/u-lazy-load.js";
const _easycom_up_line = () => "../../uni_modules/uview-plus/components/u-line/u-line.js";
if (!Math) {
  (_easycom_up_status_bar + _easycom_up_icon + _easycom_up_search + _easycom_up_swiper + _easycom_up_lazy_load + _easycom_up_line)();
}
const headerIconColor = "#fff";
const lineColor = "#e5e7eb";
const topBtnIconColor = "#ffffff";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const keyword = common_vendor.ref("");
    const bannerList = common_vendor.ref([]);
    const albumList = common_vendor.ref([]);
    const navIconColors = {
      camera: "#6366f1",
      heart: "#ef4444",
      account: "#10b981"
    };
    const albumIconColors = {
      eye: "#fff",
      tag: "#8b5cf6",
      thumbUp: "#6b7280"
    };
    const showTopBtn = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      loadData();
    });
    const loadData = () => {
      api_api.getBanner().then((res) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:178", res, "res");
        bannerList.value = res.bannerList;
      });
      api_api.getHomeList().then((res) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:184", res, "getHomeList");
        albumList.value = res;
      });
    };
    const handleSearch = () => {
      if (keyword.value.trim()) {
        common_vendor.index.showToast({
          title: `搜索: ${keyword.value}`,
          icon: "none"
        });
      }
    };
    const goToAlbum = (album) => {
      common_vendor.index.navigateTo({
        url: `/pages/album/album?id=${album.id}&title=${encodeURIComponent(album.title)}`
      });
    };
    const goToAdd = () => {
      common_vendor.index.switchTab({
        url: "/pages/add/add"
      });
    };
    const goToCollect = () => {
      common_vendor.index.switchTab({
        url: "/pages/collect/collect"
      });
    };
    const goToMine = () => {
      common_vendor.index.switchTab({
        url: "/pages/mine/mine"
      });
    };
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
        a: common_vendor.p({
          name: "photo",
          size: "32",
          color: headerIconColor
        }),
        b: common_vendor.o(goToAdd),
        c: common_vendor.p({
          name: "plus-circle",
          size: "28",
          color: headerIconColor
        }),
        d: common_vendor.o(handleSearch),
        e: common_vendor.o(handleSearch),
        f: common_vendor.o(($event) => keyword.value = $event),
        g: common_vendor.p({
          placeholder: "搜索你喜欢的图片...",
          ["bg-color"]: "rgba(255,255,255,0.9)",
          shape: "round",
          ["show-action"]: false,
          modelValue: keyword.value
        }),
        h: bannerList.value.length
      }, bannerList.value.length ? {
        i: common_vendor.p({
          list: bannerList.value,
          keyName: "image",
          showTitle: true,
          radius: "16",
          autoplay: true,
          height: "200",
          circular: true,
          duration: 500
        })
      } : {}, {
        j: common_vendor.p({
          name: "camera",
          size: "24",
          color: navIconColors.camera
        }),
        k: common_vendor.o(goToAdd),
        l: common_vendor.p({
          name: "heart",
          size: "24",
          color: navIconColors.heart
        }),
        m: common_vendor.o(goToCollect),
        n: common_vendor.p({
          name: "account",
          size: "24",
          color: navIconColors.account
        }),
        o: common_vendor.o(goToMine),
        p: common_vendor.f(albumList.value, (album, index, i0) => {
          return {
            a: "1cf27b2a-8-" + i0,
            b: common_vendor.p({
              image: album.img,
              index,
              threshold: "-450",
              ["border-radius"]: "12",
              ["fade-show"]: true
            }),
            c: "1cf27b2a-9-" + i0,
            d: common_vendor.t(album.title),
            e: "1cf27b2a-10-" + i0,
            f: common_vendor.t(album.tag),
            g: "1cf27b2a-11-" + i0,
            h: album.id,
            i: common_vendor.o(($event) => goToAlbum(album), album.id),
            j: index * 0.1 + "s"
          };
        }),
        q: common_vendor.p({
          name: "eye",
          size: "20",
          color: albumIconColors.eye
        }),
        r: common_vendor.p({
          name: "tag",
          size: "12",
          color: albumIconColors.tag
        }),
        s: common_vendor.p({
          name: "thumb-up",
          size: "12",
          color: albumIconColors.thumbUp
        }),
        t: common_vendor.t(Math.floor(Math.random() * 100) + 10),
        v: showTopBtn.value
      }, showTopBtn.value ? {
        w: common_vendor.p({
          name: "arrow-upward",
          color: topBtnIconColor,
          size: "28"
        }),
        x: common_vendor.o(toTop)
      } : {}, {
        y: albumList.value.length > 0
      }, albumList.value.length > 0 ? {
        z: common_vendor.p({
          color: lineColor,
          margin: "20px 0"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
