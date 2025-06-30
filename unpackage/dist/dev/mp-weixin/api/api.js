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
  return api_http.http("/login", { code }, "POST");
};
const getUserInfo = () => {
  return api_http.http("/getUserInfo");
};
exports.getAlbumImages = getAlbumImages;
exports.getBanner = getBanner;
exports.getHomeList = getHomeList;
exports.getUserInfo = getUserInfo;
exports.login = login;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/api.js.map
