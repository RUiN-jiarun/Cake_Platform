// 此处设置不同标签下的显示
import { request } from "../utils/request";
import {
  searchTrend,
  picCommodity,     // 瀑布流界面
  allCommodity,     // 商品人气榜
  likeCommodity,

  loveList,         // 收藏夹信息
  myList,           // 我的发起的创意信息
} from "./__mock__/commodity";
import { ALL, TREND, LIKE } from "../asserts/CommodityType";

export const getSearchTrend = () => {
  // return request(`${URL_PREFIX}/trend`);
  return Promise.resolve(searchTrend);
};

export const getCommodity = ({ type = 1 }) => {
  // return request(`${URL_PREFIX}/commodity?type=${type}`);
  switch (type) {
    case ALL:
      return Promise.resolve(picCommodity);
    case TREND:
      return Promise.resolve(allCommodity);
    case LIKE:
      return Promise.resolve(likeCommodity);

    default:
      return Promise.resolve([]);
  }
};

export const getCommodityDetail = id => {
  // return request(`${URL_PREFIX}/commodity/${id}`);
  // return request(`pages/handbag/handbag/commodity/${id}`);
  // return Promise.resolve(commodityDetail);
  // console.log(Promise.resolve(allCommodity.data[id]));
  // console.log(Promise.resolve(allCommodity));
  // return allCommodity.data[id];
  return Promise.resolve(allCommodity);
};

export const getLoveList = () => {
  return Promise.resolve(loveList);
};

export const getMyList = () => {
  return Promise.resolve(myList);
};
