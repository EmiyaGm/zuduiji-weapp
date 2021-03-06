import {
  USER_INFO,
  USER_LOGIN,
  USER_LOGOUT,
  USER_CFG,
  NBA_TEAMS,
  BANK_NAMES,
} from "@constants/user";
import { createAction } from "@utils/redux";
import { API_USER_LOGIN } from "@constants/api";

/**
 * 用户登录
 * @param {*} payload
 */
export const dispatchLogin = (payload) =>
  createAction({
    url: API_USER_LOGIN,
    type: USER_LOGIN,
    method: "POST",
    payload,
  });

/**
 * 用户退出登录
 */
export const dispatchLogout = () => ({ type: USER_LOGOUT });

/**
 * 保存用户微信信息
 */
export const dispatchUser = (payload) => ({ type: USER_INFO, payload });

export const dispatchLoginInfo = (payload) => ({ type: USER_LOGIN, payload });

export const dispatchCfg = (payload) => ({ type: USER_CFG, payload });

export const dispatchTeams = (payload) => ({ type: NBA_TEAMS, payload });

export const dispatchBanks = (payload) => ({ type: BANK_NAMES, payload });
