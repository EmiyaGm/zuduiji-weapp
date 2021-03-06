import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/user";
import { View, Text, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import defaultAvatar from "@assets/default-avatar.png";
import bg from "./assets/bg.png";
import fetch from "@utils/request";
import {
  API_ACCOUNT_PHONE,
  API_ADDRESS_ADDRESS,
  API_ACCOUNT_SYNCSESSION,
} from "@constants/api";
import walletIcon from "@assets/walletIcon.png";
import addressIcon from "@assets/addressIcon.png";
import "./index.scss";
@connect((state) => state.user, actions)
export default class Profile extends Component {
  static defaultProps = {
    userInfo: {},
    loginInfo: {},
  };

  getPhoneNumber = (e) => {
    const self = this;
    const { errMsg } = e.detail ? e.detail : {};
    if (errMsg === "getPhoneNumber:ok") {
      Taro.login({
        success: function(res) {
          if (res.code) {
            fetch({
              url: API_ACCOUNT_SYNCSESSION,
              payload: [res.code],
              method: "POST",
              showToast: false,
              autoLogin: false,
            }).then((result) => {
              if (result && result.sessionKey) {
                fetch({
                  url: API_ACCOUNT_PHONE,
                  payload: [
                    {
                      ...e.detail,
                      sessionKey: result.sessionKey,
                    },
                  ],
                  method: "POST",
                  showToast: false,
                  autoLogin: false,
                }).then((res) => {
                  if (res) {
                    self.props.dispatchUser(res);
                    Taro.showToast({
                      title: "获取成功",
                      icon: "success",
                    });
                  } else {
                    Taro.showToast({
                      title: "获取失败",
                      icon: "error",
                    });
                  }
                });
              }
            });
          }
        },
      });
    }
  };

  myWallet = () => {
    Taro.navigateTo({
      url: "/pages/my-wallet/my-wallet",
    });
  };

  goAddress = () => {
    Taro.chooseAddress({
      success: (res) => {
        if (res && res.errMsg === "chooseAddress:ok") {
          fetch({
            url: API_ADDRESS_ADDRESS,
            payload: [res],
            method: "POST",
            showToast: false,
            autoLogin: false,
          }).then((res) => {
            if (res) {
              Taro.showToast({
                title: "提交成功",
                icon: "none",
              });
            } else {
              Taro.showToast({
                title: "提交失败",
                icon: "error",
              });
            }
          });
        }
      },
      fail: (res) => {
        console.log(res);
      },
    });
  };

  render() {
    const { userInfo, loginInfo } = this.props;

    return (
      <View className="user-profile">
        {/* // NOTE 背景图片：Image 标签 + position absolute 实现 */}
        {/* <Image className="user-profile__bg" src={bg} mode="widthFix" /> */}

        <View className="user-profile__wrap">
          <View className="user-profile__avatar">
            <Image
              className="user-profile__avatar-img"
              src={userInfo.avatarUrl || defaultAvatar}
            />
          </View>
          <View className="user-profile__info">
            <Text className="user-profile__info-name">
              {loginInfo.token ? userInfo.nickName : "未登录"}
            </Text>
            {loginInfo.token ? (
              !userInfo.phone ? (
                <View className="getPhoneButton">
                  <AtButton
                    type="primary"
                    openType="getPhoneNumber"
                    onGetPhoneNumber={this.getPhoneNumber}
                    size="small"
                    round
                  >
                    获取手机号
                  </AtButton>
                </View>
              ) : (
                <View className="user-profile__info-tip">{userInfo.phone}</View>
              )
            ) : (
              <Text className="user-profile__info-tip">登录后显示</Text>
            )}
          </View>
          {loginInfo.token && (
            <View className="user-profile_icons">
              <View>
                <Image
                  className="userIcon"
                  src={walletIcon}
                  onClick={this.myWallet.bind(this)}
                />
              </View>
              <View>
                <Image
                  className="userIcon"
                  src={addressIcon}
                  onClick={this.goAddress.bind(this)}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
