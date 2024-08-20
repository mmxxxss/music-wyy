<template>
  <div class="login">
    <a-input style="width: 300px" placeholder="请输入账号" class="input" :value="account"
      @change="handleInput('account', $event)" />
    <a-input style="width: 300px; margin-top: 20px" class="input" placeholder="请输入密码" :value="password"
      @change="handleInput('password', $event)" type="password"></a-input>
    <a-button style="margin-top: 20px" @click="toLogin">登陆</a-button>
    <div :hidden="load">loading...</div>
  </div>
</template>

<script>
import API from "../api/login";
import { message } from "ant-design-vue";
import store from "../store";

export default {
  data() {
    return {
      account: "",
      password: "",
      load: true,
    };
  },
  methods: {
    toLogin() {
      this.load = false;
      // 把 loading 展示

      API.loginToNet(this.account, this.password).then((res) => {
        // 移除 loading
        this.load = true;
        if (res.code === 200) {
          message.success("登陆成功！");
          //   存 cookie
          const cookie = encodeURIComponent(res.cookie || "");
          store.commit({
            type: "updateCookie",
            cookie,
          });

          API.getUserInfo().then((res2) => {
            const newSrc = res2.profile.avatarUrl;
            const newName = res2.profile.nickname;
            localStorage.setItem("newSrc", newSrc);
            localStorage.setItem("newName", newName);
            // console.log("newSrc",newSrc);
            // console.log('res2',res2);
            this.$store.commit("getSrc", newSrc);
            this.$store.commit("getName", newName);
            // console.log('newName',newName);
          });

          // 登陆成功后，跳转到首页
          this.$router.replace({ path: "/home/discovery" });
        } else {
          message.error(res.password);
        }

        // vuex 存储个人数据

        // 在其他 路由 展示个人信息
      });
    },
    handleInput(type, event) {
      if (type === "account") {
        this.account = event.target.value;
      } else {
        this.password = event.target.value;
      }
    },
  },
};
</script>

<style>
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  border: 3px solid #efefef;
  justify-content: center;
  align-items: center;
}
</style>