export const initAPI = {
  get: "/init/get",
};

export const homeAPI = {
  getBanners: "/home/get_banners",
};

export const currencyApi = {
  get: "/currency/get",
};

export const userDeviceApi = {
  updateToken: "user_device/update_token",
};

export const notificationApi = {
  getNotificationList: "notification/get_list",
  readNotification: "notification/read_message",
  notificationRequest: "notification/notification_request",
  readNotificationRequest: "notification/read_notification_request",
  readAllNotification: "notification/read_all_notification",
  clearAllNotification: "notification/clear_all_notification",
};
export const newsAPI = {
  get: "/news/get",
  getFooterPage: "/news/get_footer_page",
  geAlltFooterPage: "/news/get_all_footer_page",
  getBanner: "/news/get_banner",
  getSlideShow: "/news/get_slide_show",
  getCategory: "/news/get_category",
  getPopurlarNews: "/news/get_popular_news",
  viewCount: "/news/view_count_update",
};

export const matchAPI = {
  getMatchList: "match/get_list",
};

export const highlightAPI = {
  get: "/highlight/get",
  detail: "/highlight/detail",
  related: "/highlight/related",
  getBanner: "/highlight/banner",
};

export const analysisAPI = {
  get: "/analysis/get",
  detail: "/analysis/detail",
  related: "/analysis/related",
};

export const userClientAPI = {
  register: "/user_client/register",
  login: "/user_client/login",
  logout: "/auth/user_client/logout",
  checkDuplicatePhone: "/user_client/check_duplicate_phone",
  update: "/auth/user_client/update",
};

export const sportTvAPI = {
  get: "/sport_tv/get",
  detail: "/sport_tv/detail",
  related: "/sport_tv/relatedTv",
  search: "/sport_tv/search",
  get_default_live:'/sport_tv/get_default_live'
};

export const liveAPI = {
  getLive: "/live/live_match",
  relatedLiveToday: "/live/related_live_today",
};

export const teamScheduleAPI = {
  getSchedule: "/league/schedule_by_team",
}