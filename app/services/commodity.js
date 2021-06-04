// 此处设置不同标签下的显示
import { request } from "../utils/request";
import {
  searchTrend,
  allCommodity,     // 所有商品
  trendCommodity,   // 商品人气榜
  newCommodity,     // 新品（这里考虑删掉不要，在所有商品里加上按时间排序）
  likeCommodity,
  votePage,
  commodityDetail,  // 商品详细信息
} from "./__mock__/commodity";
import { ALL, TREND, NEW, LIKE, VOTE } from "../asserts/CommodityType";

export const getSearchTrend = () => {
  // return request(`${URL_PREFIX}/trend`);
  return Promise.resolve(searchTrend);
};

export const getCommodity = ({ type = 1 }) => {
  // return request(`${URL_PREFIX}/commodity?type=${type}`);
  switch (type) {
    case ALL:
      return Promise.resolve(allCommodity);
    case TREND:
      return Promise.resolve(trendCommodity);
    case NEW:
      return Promise.resolve(newCommodity);
    case LIKE:
      return Promise.resolve(likeCommodity);
    case VOTE:
      return Promise.resolve(votePage);
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
