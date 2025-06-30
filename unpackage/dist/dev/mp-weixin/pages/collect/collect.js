"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_navbar2 = common_vendor.resolveComponent("up-navbar");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_lazy_load2 = common_vendor.resolveComponent("up-lazy-load");
  const _easycom_up_waterfall2 = common_vendor.resolveComponent("up-waterfall");
  const _easycom_up_empty2 = common_vendor.resolveComponent("up-empty");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  (_easycom_up_navbar2 + _easycom_up_icon2 + _easycom_up_lazy_load2 + _easycom_up_waterfall2 + _easycom_up_empty2 + _easycom_up_button2)();
}
const _easycom_up_navbar = () => "../../uni_modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_lazy_load = () => "../../uni_modules/uview-plus/components/u-lazy-load/u-lazy-load.js";
const _easycom_up_waterfall = () => "../../uni_modules/uview-plus/components/u-waterfall/u-waterfall.js";
const _easycom_up_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_up_navbar + _easycom_up_icon + _easycom_up_lazy_load + _easycom_up_waterfall + _easycom_up_empty + _easycom_up_button)();
}
const navBarBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
const leftIconColor = "#fff";
const emptyTextColor = "#94a3b8";
const emptyIconColor = "#cbd5e1";
const _sfc_main = {
  __name: "collect",
  setup(__props) {
    const collectList = common_vendor.ref([]);
    const currentFilter = common_vendor.ref("all");
    const titleStyle = { color: "#fff", fontWeight: "bold" };
    const iconColors = {
      funnel: "#6366f1",
      heartFill: "#ef4444",
      share: "#6366f1"
    };
    const emptyBtnStyle = {
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      border: "none",
      borderRadius: "12rpx",
      marginTop: "40rpx"
    };
    const mockCollectData = [
      {
        img: "https://picsum.photos/id/1018/400/600",
        title: "清晨的森林",
        tag: ["自然", "旅行"],
        collectTime: "2024-01-15"
      },
      {
        img: "https://picsum.photos/id/1015/400/500",
        title: "城市夜景",
        tag: ["城市", "灯光"],
        collectTime: "2024-01-14"
      },
      {
        img: "https://picsum.photos/id/1084/400/700",
        title: "美食诱惑",
        tag: ["美食", "餐厅"],
        collectTime: "2024-01-13"
      },
      {
        img: "https://picsum.photos/id/1025/400/550",
        title: "现代艺术",
        tag: ["艺术", "设计"],
        collectTime: "2024-01-12"
      },
      {
        img: "https://picsum.photos/id/1024/400/650",
        title: "野生动物",
        tag: ["自然", "动物"],
        collectTime: "2024-01-11"
      }
    ];
    common_vendor.onLoad(() => {
      loadCollectData();
    });
    const loadCollectData = () => {
      collectList.value = mockCollectData;
    };
    const availableFilters = common_vendor.computed(() => {
      const tags = /* @__PURE__ */ new Set();
      collectList.value.forEach((item) => {
        item.tag.forEach((tag) => tags.add(tag));
      });
      return Array.from(tags);
    });
    const filteredList = common_vendor.computed(() => {
      if (currentFilter.value === "all") {
        return collectList.value;
      }
      return collectList.value.filter(
        (item) => item.tag.includes(currentFilter.value)
      );
    });
    const getCollectedAlbums = () => {
      const albums = /* @__PURE__ */ new Set();
      collectList.value.forEach((item) => {
        item.tag.forEach((tag) => albums.add(tag));
      });
      return albums.size;
    };
    const getTotalTags = () => {
      return availableFilters.value.length;
    };
    const setFilter = (filter) => {
      currentFilter.value = filter;
    };
    const previewImage = (currentItem, allItems) => {
      const urls = allItems.map((item) => item.img);
      const currentIndex = allItems.findIndex((item) => item.img === currentItem.img);
      common_vendor.index.previewImage({
        urls,
        current: currentIndex
      });
    };
    const uncollectImage = (item, index) => {
      common_vendor.index.showModal({
        title: "确认取消收藏",
        content: `确定要取消收藏"${item.title}"吗？`,
        confirmColor: "#ef4444",
        success: (res) => {
          if (res.confirm) {
            const originalIndex = collectList.value.findIndex(
              (collectItem) => collectItem.img === item.img
            );
            if (originalIndex > -1) {
              collectList.value.splice(originalIndex, 1);
            }
            common_vendor.index.showToast({
              title: "已取消收藏",
              icon: "success"
            });
          }
        }
      });
    };
    const shareImage = (item) => {
      common_vendor.index.showShareMenu({
        title: item.title,
        imageUrl: item.img,
        success: () => {
          common_vendor.index.showToast({
            title: "分享成功",
            icon: "success"
          });
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "分享失败",
            icon: "none"
          });
        }
      });
    };
    const goToIndex = () => {
      common_vendor.index.switchTab({
        url: "pages/index/index"
      });
    };
    const goBack = () => {
      common_vendor.index.switchTab({
        url: "pages/index/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.p({
          border: false,
          ["bg-color"]: navBarBg,
          title: "我的收藏",
          ["title-style"]: titleStyle,
          ["left-icon-color"]: leftIconColor
        }),
        c: common_vendor.t(collectList.value.length),
        d: common_vendor.t(getCollectedAlbums()),
        e: common_vendor.t(getTotalTags()),
        f: common_vendor.p({
          name: "funnel",
          size: "18",
          color: iconColors.funnel
        }),
        g: currentFilter.value === "all" ? 1 : "",
        h: common_vendor.o(($event) => setFilter("all")),
        i: common_vendor.f(availableFilters.value, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag,
            c: currentFilter.value === tag ? 1 : "",
            d: common_vendor.o(($event) => setFilter(tag), tag)
          };
        }),
        j: filteredList.value.length > 0
      }, filteredList.value.length > 0 ? {
        k: common_vendor.w(({
          leftList
        }, s0, i0) => {
          return {
            a: common_vendor.f(leftList, (item, index, i1) => {
              return {
                a: "b24c290b-3-" + i0 + "-" + i1 + ",b24c290b-2",
                b: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "12",
                  image: item.img,
                  index,
                  ["fade-show"]: true
                }),
                c: "b24c290b-4-" + i0 + "-" + i1 + ",b24c290b-2",
                d: common_vendor.t(item.title),
                e: common_vendor.f(item.tag, (tag, k2, i2) => {
                  return {
                    a: common_vendor.t(tag),
                    b: tag
                  };
                }),
                f: "b24c290b-5-" + i0 + "-" + i1 + ",b24c290b-2",
                g: common_vendor.o(($event) => uncollectImage(item), index),
                h: "b24c290b-6-" + i0 + "-" + i1 + ",b24c290b-2",
                i: common_vendor.o(($event) => shareImage(item), index),
                j: index,
                k: common_vendor.o(($event) => previewImage(item, leftList.concat(_ctx.rightList)), index)
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "left",
          path: "k",
          vueId: "b24c290b-2"
        }),
        l: common_vendor.p({
          name: "heart-fill",
          size: "20",
          color: iconColors.heartFill
        }),
        m: common_vendor.p({
          name: "heart-fill",
          size: "16",
          color: iconColors.heartFill
        }),
        n: common_vendor.p({
          name: "share",
          size: "16",
          color: iconColors.share
        }),
        o: common_vendor.w(({
          rightList
        }, s0, i0) => {
          return {
            a: common_vendor.f(rightList, (item, index, i1) => {
              return {
                a: "b24c290b-7-" + i0 + "-" + i1 + ",b24c290b-2",
                b: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "12",
                  image: item.img,
                  index,
                  ["fade-show"]: true
                }),
                c: "b24c290b-8-" + i0 + "-" + i1 + ",b24c290b-2",
                d: common_vendor.t(item.title),
                e: common_vendor.f(item.tag, (tag, k2, i2) => {
                  return {
                    a: common_vendor.t(tag),
                    b: tag
                  };
                }),
                f: "b24c290b-9-" + i0 + "-" + i1 + ",b24c290b-2",
                g: common_vendor.o(($event) => uncollectImage(item), index),
                h: "b24c290b-10-" + i0 + "-" + i1 + ",b24c290b-2",
                i: common_vendor.o(($event) => shareImage(item), index),
                j: index,
                k: common_vendor.o(($event) => previewImage(item, _ctx.leftList.concat(rightList)), index)
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "right",
          path: "o",
          vueId: "b24c290b-2"
        }),
        p: common_vendor.p({
          name: "heart-fill",
          size: "20",
          color: iconColors.heartFill
        }),
        q: common_vendor.p({
          name: "heart-fill",
          size: "16",
          color: iconColors.heartFill
        }),
        r: common_vendor.p({
          name: "share",
          size: "16",
          color: iconColors.share
        }),
        s: common_vendor.sr("waterfallRef", "b24c290b-2"),
        t: common_vendor.o(($event) => filteredList.value = $event),
        v: common_vendor.p({
          modelValue: filteredList.value
        })
      } : {
        w: common_vendor.p({
          mode: "list",
          text: "还没有收藏任何图片",
          ["text-color"]: emptyTextColor,
          ["icon-color"]: emptyIconColor
        }),
        x: common_vendor.o(goToIndex),
        y: common_vendor.p({
          type: "primary",
          size: "normal",
          ["custom-style"]: emptyBtnStyle
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b24c290b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/collect/collect.js.map
