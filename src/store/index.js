export default new Vuex.Store({
  state: {
    keywords: "",
    id: 0,
    getAjaxData: 0,
    cookie: "",
    showButton: true,
    src: "",
    name: "",
    hideUserInfo: false,
    selectedKey: "1",
  },
  mutations: {
    refreshKeywords(state, payload) {
      state.keywords = payload.keywords;
    },
    refreshId(state, payload) {
      state.id = payload.id;
    },
    catchAjaxData(state) {
      state.getAjaxData += 1;
    },
    updateCookie(state, payload) {
      state.cookie = payload.cookie;
    },
    changeButton(state) {
      if (state.showButton === true) {
        state.showButton = false;
      } else {
        state.showButton = true;
      }
    },
    changeUserInfo(state) {
      if (state.hideUserInfo === false) {
        state.hideUserInfo = true;
      } else {
        state.hideUserInfo = false;
      }
    },
    getSrc(state, src) {
      state.src = src;
    },
    getName(state, name) {
      state.name = name;
    },
    changeSelectedKey(state, key) {
      state.selectedKey = key;
    },
  },
  actions: {},
  modules: {},
});
