/**
 * 请求接口
 * 根据接口文档定义接口请求
 */
import ajax from './ajax'
const BASE = "http://localhost:5000"

// 登录
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, "POST")

// 添加用户
export const reqAddUser = (user) => ajax(BASE + "/manage/user/add", user, "POST")

// 获取一级分类/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId })
// 添加分类
export const reqAddCategorys = (parentId, categoryName) => ajax(BASE + '/manage/category/add', { parentId, categoryName }, "POST")
// 更新分类
export const reqUpdataCategorys = (categoryId, categoryName) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, "POST")