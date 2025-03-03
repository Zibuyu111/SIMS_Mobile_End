if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main$2 = vue.defineComponent({
    name: "Splash",
    setup() {
      const currentTime = vue.ref("");
      const welcomeMessage = vue.ref("");
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
      const getWelcomeMessage = (hour) => {
        if (hour >= 0 && hour < 6)
          return "早点睡吧！";
        if (hour >= 6 && hour < 11)
          return "美丽的早晨！";
        if (hour >= 11 && hour < 13)
          return "中午小睡，下午精神百倍！";
        if (hour >= 13 && hour < 18)
          return "记得忙里偷闲！";
        return "晚上好！";
      };
      vue.onMounted(() => {
        try {
          const now = /* @__PURE__ */ new Date();
          currentTime.value = formatDate(now);
          welcomeMessage.value = getWelcomeMessage(now.getHours());
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index",
              fail: (err) => {
                formatAppLog("error", "at pages/splash/splash.vue:47", "页面跳转失败:", err);
                uni.navigateTo({
                  url: "/pages/index/index"
                });
              }
            });
          }, 3e3);
        } catch (error) {
          formatAppLog("error", "at pages/splash/splash.vue:56", "Splash页面初始化失败:", error);
        }
      });
      return {
        currentTime,
        welcomeMessage
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "splash-container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("text", { class: "title" }, "SIMS"),
        vue.createElementVNode(
          "text",
          { class: "date" },
          vue.toDisplayString(_ctx.currentTime),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "message" },
          vue.toDisplayString(_ctx.welcomeMessage),
          1
          /* TEXT */
        )
      ])
    ]);
  }
  const PagesSplashSplash = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "C:/Users/liulu/Desktop/新建文件夹/SIMS/pages/splash/splash.vue"]]);
  const _sfc_main$1 = vue.defineComponent({
    name: "Index",
    setup() {
      const currentTab = vue.ref(0);
      const tabs = vue.reactive([
        { name: "首页", icon: "🏠" },
        { name: "课程", icon: "📚" },
        { name: "成绩", icon: "📝" },
        { name: "我的", icon: "👤" }
      ]);
      const overviewCards = vue.reactive([
        { title: "总学生数", value: "2,458", icon: "👥" },
        { title: "总课程数", value: "156", icon: "📚" },
        { title: "优秀学生", value: "328", icon: "🏆" },
        { title: "待处理", value: "12", icon: "🔔" }
      ]);
      const menuItems = vue.reactive([
        { name: "学生管理", icon: "👥" },
        { name: "课程管理", icon: "📚" },
        { name: "成绩录入", icon: "📝" },
        { name: "考勤管理", icon: "📅" },
        { name: "请假审批", icon: "📋" },
        { name: "系统设置", icon: "⚙️" }
      ]);
      const recentActivities = vue.reactive([
        { title: "张三提交了请假申请", time: "10分钟前", icon: "📋" },
        { title: "新增课程：高等数学", time: "30分钟前", icon: "📚" },
        { title: "李四完成了成绩录入", time: "1小时前", icon: "📝" },
        { title: "系统更新完成", time: "2小时前", icon: "🔄" }
      ]);
      const handleTabClick = (index) => {
        currentTab.value = index;
        uni.showToast({
          title: `切换到${tabs[index].name}`,
          icon: "none"
        });
      };
      const handleMenuClick = (index) => {
        uni.showToast({
          title: `进入${menuItems[index].name}`,
          icon: "none"
        });
      };
      const handleAdminClick = () => {
        uni.showActionSheet({
          itemList: ["个人信息", "系统设置", "退出登录"],
          success: (res) => {
            switch (res.tapIndex) {
              case 0:
                uni.showToast({ title: "查看个人信息", icon: "none" });
                break;
              case 1:
                uni.showToast({ title: "进入系统设置", icon: "none" });
                break;
              case 2:
                uni.showModal({
                  title: "提示",
                  content: "确定要退出登录吗？",
                  success: (res2) => {
                    if (res2.confirm) {
                      uni.showToast({ title: "已退出登录", icon: "success" });
                    }
                  }
                });
                break;
            }
          }
        });
      };
      return {
        currentTab,
        tabs,
        overviewCards,
        menuItems,
        recentActivities,
        handleTabClick,
        handleMenuClick,
        handleAdminClick
      };
    }
  });
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 顶部导航栏 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "header-left" }, [
          vue.createElementVNode("text", { class: "header-title" }, "SIMS"),
          vue.createElementVNode("text", { class: "header-subtitle" }, "Student Information Management System")
        ]),
        vue.createElementVNode("view", { class: "header-right" }, [
          vue.createElementVNode("view", {
            class: "admin-btn",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleAdminClick && _ctx.handleAdminClick(...args))
          }, [
            vue.createElementVNode("text", { class: "admin-icon" }, "👤")
          ])
        ])
      ]),
      vue.createCommentVNode(" 数据概览卡片 "),
      vue.createElementVNode("scroll-view", {
        class: "main-content",
        "scroll-y": ""
      }, [
        vue.createElementVNode("view", { class: "data-overview" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.overviewCards, (card, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: index,
                  class: vue.normalizeClass(["data-card", "card-" + index])
                },
                [
                  vue.createElementVNode("view", { class: "card-header" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "card-icon" },
                      vue.toDisplayString(card.icon),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "card-title" },
                      vue.toDisplayString(card.title),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode(
                    "text",
                    { class: "card-value" },
                    vue.toDisplayString(card.value),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "card-decoration" })
                ],
                2
                /* CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createCommentVNode(" 功能菜单 "),
        vue.createElementVNode("view", { class: "menu-grid" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.menuItems, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: vue.normalizeClass(["menu-item", "menu-" + index]),
                onClick: ($event) => _ctx.handleMenuClick(index)
              }, [
                vue.createElementVNode("view", { class: "menu-icon-wrapper" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "menu-icon" },
                    vue.toDisplayString(item.icon),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "menu-text" },
                  vue.toDisplayString(item.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "menu-decoration" })
              ], 10, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createCommentVNode(" 最近活动 "),
        vue.createElementVNode("view", { class: "recent-activities" }, [
          vue.createElementVNode("view", { class: "section-header" }, [
            vue.createElementVNode("text", { class: "section-title" }, "最近活动"),
            vue.createElementVNode("view", { class: "section-line" })
          ]),
          vue.createElementVNode("view", { class: "activity-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(_ctx.recentActivities, (activity, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: index,
                    class: vue.normalizeClass(["activity-item", "activity-" + index])
                  },
                  [
                    vue.createElementVNode(
                      "text",
                      { class: "activity-icon" },
                      vue.toDisplayString(activity.icon),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "activity-content" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "activity-title" },
                        vue.toDisplayString(activity.title),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "activity-time" },
                        vue.toDisplayString(activity.time),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "activity-decoration" })
                  ],
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ]),
      vue.createCommentVNode(" 底部导航栏 "),
      vue.createElementVNode("view", { class: "tab-bar" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.tabs, (tab, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: vue.normalizeClass(["tab-item", _ctx.currentTab === index ? "active" : ""]),
              onClick: ($event) => _ctx.handleTabClick(index)
            }, [
              vue.createElementVNode(
                "text",
                { class: "tab-icon" },
                vue.toDisplayString(tab.icon),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "tab-text" },
                vue.toDisplayString(tab.name),
                1
                /* TEXT */
              ),
              _ctx.currentTab === index ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "tab-line"
              })) : vue.createCommentVNode("v-if", true)
            ], 10, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/liulu/Desktop/新建文件夹/SIMS/pages/index/index.vue"]]);
  __definePage("pages/splash/splash", PagesSplashSplash);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/liulu/Desktop/新建文件夹/SIMS/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
