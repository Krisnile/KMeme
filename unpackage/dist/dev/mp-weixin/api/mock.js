"use strict";
const common_vendor = require("../common/vendor.js");
const api_mockData_pageApi = require("./mockData/pageApi.js");
common_vendor.Mock.mock(/api\/user\/getBanner/, "get", api_mockData_pageApi.pageApi.getBanner);
common_vendor.Mock.mock(/\/api\/user\/getHomeList/, "get", api_mockData_pageApi.pageApi.getHomeList);
common_vendor.index.__f__("log", "at api/mock.js:7", "[mock] mock服务已启用");
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/mock.js.map
