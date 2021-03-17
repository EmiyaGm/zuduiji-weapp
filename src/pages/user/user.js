import Taro, { Component, login } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtButton, AtCard, AtList, AtListItem, AtActionSheet } from "taro-ui";
import { ButtonItem } from "@components";
import * as actions from "@actions/user";
import { getWindowHeight } from "@utils/style";
import {
  API_BUSINESS_APPLY,
  API_USER_INFO,
  API_BUSINESS_STATUS,
  API_ACCOUNT_PHONE,
} from "@constants/api";
import { ADMIN_REVIEW_NOTICE, BUSINESS_APPLY_NOTICE } from "@utils/noticeTmpl";
import fetch from "@utils/request";
import Profile from "./profile";
import waitSend from "@assets/wait-send.png";
import waitPay from "@assets/wait-pay.png";
import waitReceive from "@assets/wait-receive.png";
import businessIcon from "@assets/businessIcon.png";
import userIcon from "@assets/userIcon.png";
import activityIcon from "@assets/activityIcon.png";
import withdrawIcon from "@assets/withdrawIcon.png";
import allIcon from "@assets/allIcon.png";
import luckOrder from "@assets/luckOrder.png";
import applyIcon from "@assets/applyIcon.png";
import publishIcon from "@assets/publishIcon.png";
import onPublishIcon from "@assets/onPublishIcon.png";
import allPublishIcon from "@assets/allPublishIcon.png";
import applyStatus from "@assets/applyStatus.png";
import "./user.scss";

@connect((state) => state.user, { ...actions })
class User extends Component {
  config = {
    navigationBarTitleText: "组队鸡",
  };

  state = {
    applyInfo: {},
    isOpened: false,
  };

  componentDidShow() {
    const self = this;
    if (self.props.loginInfo.account) {
      if (self.props.loginInfo.account.role === "USER") {
        self.getApplyStatus();
      }
    }
  }

  handleLogout = () => {
    this.props.dispatchLogout();
  };

  myPublish(type) {
    Taro.navigateTo({
      url: `/pages/my-publish/my-publish?type=${type}`,
    });
  }

  myOrder() {
    Taro.navigateTo({
      url: "/pages/my-order/my-order",
    });
  }

  orderList(e, type) {
    e.stopPropagation();
    Taro.navigateTo({
      url: `/pages/my-order/my-order?type=${type}`,
    });
  }

  getApplyStatus = () => {
    const self = this;
    fetch({
      url: API_BUSINESS_STATUS,
      showToast: false,
      autoLogin: false,
    }).then((res) => {
      if (res) {
        self.setState({
          applyInfo: res,
        });
      }
    });
  };

  handleApply = () => {
    const self = this;
    Taro.showModal({
      title: "商家入驻",
      content: "您确定要申请成为商家并入驻吗？",
    }).then((res) => {
      if (res.confirm) {
        fetch({
          url: API_BUSINESS_APPLY,
          showToast: false,
          autoLogin: false,
        }).then((res) => {
          if (res) {
            Taro.showToast({
              title: "申请成功！",
              icon: "succes",
            });
            self.applyNotice();
            self.getApplyStatus();
          } else {
            Taro.showToast({
              title: "申请失败，请稍后再试",
              icon: "error",
            });
          }
        });
      }
    });
  };

  applyNotice = () => {
    notice = () => {
      wx.requestSubscribeMessage({
        tmplIds: [BUSINESS_APPLY_NOTICE],
        success: (rep) => {},
        fail: () => {},
      });
    };
  };

  adminPublish = () => {
    Taro.navigateTo({
      url: "/pages/admin-publish/admin-publish",
    });
  };

  adminApply = () => {
    Taro.navigateTo({
      url: "/pages/admin-apply/admin-apply",
    });
  };

  adminUser = () => {
    Taro.navigateTo({
      url: "/pages/admin-user/admin-user",
    });
  };

  adminWithdraw = () => {
    Taro.navigateTo({
      url: "/pages/admin-withdraw/admin-withdraw",
    });
  };

  agreeAuth = (e) => {
    const { errMsg, userInfo } = e.detail ? e.detail : {};
    const self = this;
    if (errMsg === "getUserInfo:ok") {
      self.props.dispatchUser(userInfo);
      Taro.login({
        success: function(res) {
          if (res.code) {
            Taro.showLoading({
              title: "正在登录",
            });
            self.props.dispatchLogin([res.code]).then((rep) => {
              fetch({
                url: API_USER_INFO,
                payload: [
                  {
                    ...e.detail,
                    sessionKey: rep.account.sessionKey,
                  },
                ],
                method: "POST",
                showToast: false,
                autoLogin: false,
              }).then((result) => {
                if (result) {
                  self.props.dispatchUser(result);
                  if (result.role === "ADMIN") {
                    self.adminNotice();
                  }
                  if (!result.phone) {
                    self.setState({ isOpened: true });
                  }
                  Taro.hideLoading();
                  Taro.showToast({
                    title: "登录成功！",
                    icon: "none",
                  });
                  self.getApplyStatus();
                }
              });
            });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        },
      });
    } else {
      Taro.showToast({
        title: "授权失败",
        icon: "none",
      });
    }
  };

  adminNotice = () => {
    notice = () => {
      wx.requestSubscribeMessage({
        tmplIds: [ADMIN_REVIEW_NOTICE],
        success: (rep) => {},
        fail: () => {},
      });
    };
  };

  goOrderList = () => {
    Taro.navigateTo({
      url: `/pages/publish-order-list/publish-order-list`,
    });
  };

  goPublish = () => {
    Taro.navigateTo({
      url: "/pages/publish/publish",
    });
  };

  getPhoneNumber = (e) => {
    const self = this;
    const { errMsg } = e.detail ? e.detail : {};
    if (errMsg === "getPhoneNumber:ok") {
      fetch({
        url: API_ACCOUNT_PHONE,
        payload: [
          {
            ...e.detail,
            sessionKey: self.props.loginInfo.account.sessionKey,
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
          self.setState({
            isOpened: false,
          });
        } else {
          Taro.showToast({
            title: "获取失败",
            icon: "error",
          });
        }
      });
    }
  };

  render() {
    const { userInfo, loginInfo } = this.props;
    const { applyInfo, isOpened } = this.state;
    const getStatus = {
      pass: "审核通过",
      never: "管理员正在审核中",
      fail: "审核拒绝，请联系客服后再次申请",
    };

    return (
      <View className="user">
        <ScrollView
          scrollY
          className="user__wrap"
          style={{ height: getWindowHeight() }}
        >
          <Profile userInfo={userInfo} loginInfo={loginInfo} />
          <View className="user__empty" />
          {loginInfo.account && loginInfo.account.role === "ADMIN" && (
            <AtCard extra="" title="平台管理">
              <View className="at-row">
                <View
                  className="at-col at-col-3 statusText"
                  onClick={this.adminApply.bind(this)}
                >
                  <View>
                    <Image className="statusIcon" src={businessIcon} />
                  </View>
                  <View>全部商家</View>
                </View>
                <View
                  className="at-col at-col-3 statusText"
                  onClick={this.adminUser.bind(this)}
                >
                  <View>
                    <Image className="statusIcon" src={userIcon} />
                  </View>
                  <View>全部用户</View>
                </View>
                <View
                  className="at-col at-col-3 statusText"
                  onClick={this.adminPublish.bind(this)}
                >
                  <View>
                    <Image className="statusIcon" src={activityIcon} />
                  </View>
                  <View>全部活动</View>
                </View>
                <View
                  className="at-col at-col-3 statusText"
                  onClick={this.adminWithdraw.bind(this)}
                >
                  <View>
                    <Image className="statusIcon" src={withdrawIcon} />
                  </View>
                  <View>全部提现</View>
                </View>
              </View>
            </AtCard>
          )}
          <View className="user__empty" />
          {loginInfo.account && (
            <View>
              {loginInfo.account.role !== "USER" && (
                <AtCard title="我发起的">
                  <View className="at-row">
                    <View
                      className="at-col at-col-3 statusText"
                      onClick={this.goOrderList.bind(this)}
                    >
                      <View>
                        <Image className="statusIcon" src={luckOrder} />
                      </View>
                      <View>中奖订单</View>
                    </View>
                    <View
                      className="at-col at-col-3 statusText"
                      onClick={this.myPublish.bind(this, "")}
                    >
                      <View>
                        <Image className="statusIcon" src={allIcon} />
                      </View>
                      <View>全部活动</View>
                    </View>
                  </View>
                </AtCard>
              )}
              <View className="user__empty" />
              <AtCard title="我的组队">
                {loginInfo.account.role === "USER" && (
                  <View className="at-row">
                    <View
                      className="at-col at-col-3 statusText"
                      onClick={this.handleApply.bind(this)}
                    >
                      <View>
                        <Image className="statusIcon" src={applyIcon} />
                      </View>
                      <View>入驻商家</View>
                    </View>
                    {applyInfo.userId && (
                      <View className="at-col at-col-9 statusText">
                        <View>
                          <Image className="statusIcon" src={applyStatus} />
                        </View>
                        <View>
                          商家审核结果：
                          {getStatus[applyInfo.status]}
                        </View>
                      </View>
                    )}
                  </View>
                )}
                {loginInfo.account.role !== "USER" && (
                  <View className="at-row">
                    <View
                      className="at-col at-col-3 statusText"
                      onClick={this.goPublish.bind(this)}
                    >
                      <View>
                        <Image className="statusIcon" src={publishIcon} />
                      </View>
                      <View>发布组队</View>
                    </View>
                    <View
                      className="at-col at-col-3 statusText"
                      onClick={this.myPublish.bind(this, "wait_team")}
                    >
                      <View>
                        <Image className="statusIcon" src={onPublishIcon} />
                      </View>
                      <View>进行中的组队</View>
                    </View>
                    <View
                      className="at-col at-col-3 statusText"
                      onClick={this.myPublish.bind(this, "")}
                    >
                      <View>
                        <Image className="statusIcon" src={allPublishIcon} />
                      </View>
                      <View>全部组队</View>
                    </View>
                  </View>
                )}
              </AtCard>
              <View className="user__empty" />
              <AtCard extra="" title="我参与的">
                <View className="at-row">
                  <View
                    className="at-col at-col-3 statusText"
                    onClick={(e) => {
                      this.orderList(e, "wait_pay");
                    }}
                  >
                    <View>
                      <Image className="statusIcon" src={waitPay} />
                    </View>
                    <View>待支付</View>
                  </View>
                  <View
                    className="at-col at-col-3 statusText"
                    onClick={(e) => {
                      this.orderList(e, "bingo");
                    }}
                  >
                    <View>
                      <Image className="statusIcon" src={waitSend} />
                    </View>
                    <View>待发货</View>
                  </View>
                  <View
                    className="at-col at-col-3 statusText"
                    onClick={(e) => {
                      this.orderList(e, "send");
                    }}
                  >
                    <View>
                      <Image className="statusIcon" src={waitReceive} />
                    </View>
                    <View>待收货</View>
                  </View>
                  <View
                    className="at-col at-col-3 statusText"
                    onClick={this.myOrder.bind(this)}
                  >
                    <View>
                      <Image className="statusIcon" src={allIcon} />
                    </View>
                    <View>全部订单</View>
                  </View>
                </View>
              </AtCard>
              <View className="user__empty" />
            </View>
          )}
          {!loginInfo.account && (
            <View className="loginArea">
              <View className="loginTip">登录后即可参与报名球星卡组队活动</View>
              <ButtonItem
                type="primary"
                text="立即登录"
                openType="getUserInfo"
                onGetUserInfo={this.agreeAuth}
              />
            </View>
          )}
          <View className="functionArea">
            <AtList>
              {/* {loginInfo.account && (
                <View>
                  <AtListItem title="联系客服" arrow="right" />
                </View>
              )} */}
            </AtList>
          </View>
        </ScrollView>
        <AtActionSheet isOpened={isOpened} cancelText="取消" title="绑定手机号">
          <View className="bindPhone">
            <View className="bindPhoneTip">
              以便于我们为您提供更好的服务，请绑定手机号
            </View>
            <AtButton
              type="primary"
              size="normal"
              openType="getPhoneNumber"
              onGetPhoneNumber={this.getPhoneNumber}
              round
              className="bindPhoneButton"
            >
              微信一键绑定
            </AtButton>
          </View>
        </AtActionSheet>
      </View>
    );
  }
}

export default User;
