"use strict";
const api_mockData_pageApi = require("./mockData/pageApi.js");
const api_http = require("./http.js");
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
    return Promise.resolve(api_mockData_pageApi.pageApi.flowList(albumId));
  }
};
const login = (code) => {
  {
    return Promise.resolve({
      token: "mocked_token_123456"
    });
  }
};
const getUserInfo = () => {
  {
    return Promise.resolve({
      avatarUrl: "/static/catcats.jpg",
      nickName: "测试用户"
    });
  }
};
const collectList = () => {
  return api_http.http("/collect/list");
};
exports.collectList = collectList;
exports.getAlbumImages = getAlbumImages;
exports.getBanner = getBanner;
exports.getHomeList = getHomeList;
exports.getUserInfo = getUserInfo;
exports.login = login;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/api.js.map
