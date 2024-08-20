<template>
  <div id="body">
    <div class="sideBar-wrap">
      <a-button type="primary" icon="user" style="display: block; margin: 10px auto" ghost @click="toLogin"
        v-if="$store.state.showButton">
        我要登陆
      </a-button>
      <div v-if="$store.state.hideUserInfo" class="userinfo">
        <a-avatar :size="64" :src="$store.state.src" style="width: 50px; height: 50px" />
        <span class="name">{{ $store.state.name }}</span>
        <button class="logout" @click="backOut">退出登陆</button>
      </div>
      <a-menu :selectedKeys="[$store.state.selectedKey]" @click="handleClick">
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>发现音乐</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="desktop" />
          <span>推荐歌单</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="inbox" />
          <span>最新音乐</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="inbox" />
          <span>最新 mv</span>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="layout">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import API from "../api/login";
export default {
  async created() {
    const res = await API.getStatus();
    if (res.data.profile === null) {
      return;
    } else {
      const localSrc = localStorage.getItem("newSrc");
      const localName = localStorage.getItem("newName");
      this.$store.commit("getSrc", localSrc);
      this.$store.commit("getName", localName);
      this.$store.commit("changeButton");
      this.$store.commit("changeUserInfo");
    }
  },
  methods: {
    toLogin() {
      this.$router.replace("/login");
    },
    async backOut() {
      await API.backOut();
      this.$store.commit("changeButton");
      this.$store.commit("changeUserInfo");
      localStorage.removeItem("newSrc");
      localStorage.removeItem("newName");
    },
    handleClick(e) {
      if (e.key === "1") {
        this.$router.push("/home/discovery");
      } else if (e.key === "2") {
        this.$router.push("/home/recommendplaylist");
      } else if (e.key === "3") {
        this.$router.push("/home/recommendmusic");
      } else if (e.key === "4") {
        this.$router.push("/home/movie");
      }
    },
  },
};
</script>

<style lang="less" scoped>
#body {
  display: flex;
  flex-grow: 1;
  border: 1px solid whitesmoke;

  .sideBar-wrap {
    flex-shrink: 0;
    width: 15%;
    background-color: #fff;
  }

  .layout {
    display: flex;
    width: 85%;
    height: e("calc(100vh - 125px)");
    // justify-content: center;
    flex-grow: 1;
    overflow: scroll;
  }

  .userinfo {
    display: flex;
    align-items: center;
  }

  .name {
    margin-left: 10px;
    width: 60px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .logout {
    margin-left: 30px;
    font-size: 10px;
  }
}
</style>