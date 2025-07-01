"use strict";
const api_mockData_pageApi = require("./mockData/pageApi.js");
require("../common/vendor.js");
const getBanner = () => {
  {
    return Promise.resolve(api_mockData_pageApi.pageApi.getBanner().data);
  }
};
const getHomeList = () => {
  {
    return Promise.resolve(api_mockData_pageApi.pageApi.getHomeList().data);
  }
};
const getAlbumImages = (albumId) => {
  {
    return Promise.resolve(api_mockData_pageApi.pageApi.getAlbumImages().data);
  }
};
exports.getAlbumImages = getAlbumImages;
exports.getBanner = getBanner;
exports.getHomeList = getHomeList;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/api.js.map
