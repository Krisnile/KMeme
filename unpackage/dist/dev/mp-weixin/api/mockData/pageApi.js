"use strict";
const pageApi = {
  getBanner: () => {
    return {
      code: 1,
      data: {
        bannerList: [
          {
            image: "https://www.helloimg.com/i/2025/06/29/6860c8cee7b59.png",
            title: "精选图片1"
          },
          {
            image: "https://www.helloimg.com/i/2025/06/29/6860c8ca665d2.png",
            title: "精选图片2"
          },
          {
            image: "https://www.helloimg.com/i/2025/06/29/6860c8c88734d.jpg",
            title: "精选图片3"
          }
        ]
      },
      msg: "Banner获取成功"
    };
  },
  getHomeList: () => {
    return {
      code: 1,
      data: [
        {
          id: 101,
          title: "探索自然风光",
          img: "https://picsum.photos/id/1018/400/300",
          tag: "旅行",
          description: "沉浸在令人惊叹的自然美景中"
        },
        {
          id: 102,
          title: "城市探索指南",
          img: "https://picsum.photos/id/1015/400/300",
          tag: "城市",
          description: "发现城市中不为人知的角落"
        },
        {
          id: 103,
          title: "美食之旅",
          img: "https://picsum.photos/id/1084/400/300",
          tag: "美食",
          description: "品尝世界各地的美味"
        },
        {
          id: 104,
          title: "科技前沿洞察",
          img: "https://picsum.photos/id/1069/400/300",
          tag: "科技",
          description: "追踪未来科技的脚步"
        },
        {
          id: 105,
          title: "艺术与设计",
          img: "https://picsum.photos/id/1025/400/300",
          tag: "艺术",
          description: "感受视觉艺术的魅力"
        },
        {
          id: 106,
          title: "野生动物探秘",
          img: "https://picsum.photos/id/1024/400/300",
          tag: "自然",
          description: "近距离观察野生动物的生活"
        },
        {
          id: 107,
          title: "历史遗迹之旅",
          img: "https://picsum.photos/id/1031/400/300",
          tag: "历史",
          description: "走访古老文明的遗迹"
        },
        {
          id: 108,
          title: "极限运动挑战",
          img: "https://picsum.photos/id/1050/400/300",
          tag: "运动",
          description: "感受极限运动带来的激情"
        }
      ],
      msg: "首页列表获取成功"
    };
  },
  flowList: (albumId) => {
    const allData = [
      {
        img: "https://picsum.photos/id/1018/400/300",
        title: "清晨的森林",
        tag: ["自然", "旅行"],
        isCollected: "已收藏"
      },
      {
        img: "https://picsum.photos/id/1015/400/300",
        title: "城市夜景",
        tag: ["城市", "灯光"],
        isCollected: ""
      },
      {
        img: "https://picsum.photos/id/1084/400/300",
        title: "美食诱惑",
        tag: ["美食", "餐厅"],
        isCollected: "已收藏"
      },
      {
        img: "https://picsum.photos/id/1069/400/300",
        title: "科技创新",
        tag: ["科技", "未来"],
        isCollected: ""
      },
      {
        img: "https://picsum.photos/id/1025/400/300",
        title: "现代艺术",
        tag: ["艺术", "设计"],
        isCollected: "已收藏"
      },
      {
        img: "https://picsum.photos/id/1024/400/300",
        title: "野生动物",
        tag: ["自然", "动物"],
        isCollected: ""
      },
      {
        img: "https://picsum.photos/id/1031/400/300",
        title: "古老遗迹",
        tag: ["历史", "探险"],
        isCollected: ""
      },
      {
        img: "https://picsum.photos/id/1050/400/300",
        title: "极限运动",
        tag: ["运动", "挑战"],
        isCollected: "已收藏"
      }
    ];
    const filtered = allData.filter((item) => {
      switch (albumId) {
        case 101:
          return item.tag.includes("自然");
        case 102:
          return item.tag.includes("城市");
        case 103:
          return item.tag.includes("美食");
        case 104:
          return item.tag.includes("科技");
        case 105:
          return item.tag.includes("艺术");
        case 106:
          return item.tag.includes("历史");
        case 107:
          return item.tag.includes("运动");
        default:
          return true;
      }
    });
    return {
      code: 1,
      data: filtered,
      msg: "相册列表获取成功"
    };
  }
};
exports.pageApi = pageApi;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/api/mockData/pageApi.js.map
