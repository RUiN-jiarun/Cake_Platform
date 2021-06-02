// 这里是分类的菜单的进入处
import { request } from "../utils/request";
import { categories } from "./__mock__/category";

export const getAllCategories = () => {
  // return request(`${URL_PREFIX}/category`);
  return Promise.resolve(categories);
};
