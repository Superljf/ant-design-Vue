<template>
  <div class="pageAll">
    <div class="loginForm">
      <a-card title="登录" class="loginCard">
        <a-input class="inputArea" v-model="uAccount" placeholder="手机号/邮箱">
          <a-icon slot="prefix" type="user" />
        </a-input>
        <a-input
          class="inputArea"
          type="password"
          v-model="uPwd"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="eye" />
        </a-input>
      </a-card>
      <a-button type="primary" icon="login" class="loginBtn" @click="loginIn"
        >立即登录</a-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uAccount: "",
      uPwd: "",
    };
  },
  mounted() {},
  methods: {
    loginIn() {
      if (this.uAccount === "") {
        this.$message.warning("请输入账号名称");
        return;
      }
      if (this.uPwd === "") {
        this.$message.warning("请输入密码");
        return;
      }
      this.$router.push({
        path: "/Home",
      }); //利用路由跳转页
    },
  },
};
</script>

<style lang="scss" scoped>
.pageAll {
  width: 100vw;
  height: 100vh;
  background: url("../assets/loginBg.jpg") center center fixed no-repeat;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .loginForm {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
    .logTitle {
      font-weight: bold;
      font-size: 36px;
    }
    .loginCard {
      border-radius: 8px;
      width: 400px;
      .inputArea {
        margin: 10px 0;
      }
    }
    .loginBtn {
      margin-top: 20px;
    }
  }
}
</style>
