/**
 * 本地存储功能
 * 进行localhost数据存储管理的工具模块
 */
const USER_KEY = 'user_key'

export default {
  /**
   * 保存user
   */
  saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  /**
   * 读取
   */
  getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },

  /**
   * 删除
   */
  removeUser() {
    localStorage.removeItem(USER_KEY)
  }
}