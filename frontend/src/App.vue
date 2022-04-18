<template>
  <div class="app">
    <div v-if="state.account.id"><p>안녕하세요 {{ state.account.name }}님</p>
    <button @click="logout">로그아웃</button>
    </div>
    <div v-else>
      <label for="loginId">
        <span>아이디</span>
        <input type="text" id="loginId" v-model="state.form.loginId" />
      </label>
      <label for="loginPw">
        <span>패스워드</span>
        <input type="password" id="loginPw" v-model="state.form.loginPw" />
      </label>
      <button type="button" @click="submit">로그인</button>
    </div>
    <hr />
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      account: {
        id: null,
        name: "",
      },
      form: {
        loginId: "",
        loginPw: "",
      },
    });

    axios.get("/api/account").then((res) => {
      console.log(res);
      state.account = res.data;
    });

    return { state };
  },
  methods: {
    submit() {
      const args = {
        loginId: this.state.form.loginId,
        loginPw: this.state.form.loginPw,
      };
      console.log(args);
      axios
        .post("/api/account", args)
        .then((res) => {
          alert("로그인에 성공했습니다.");
          this.state.account = res.data;
        })
        .catch(() => {
          alert("로그인에 실패했습니다. 계정 정보를 확인해 주세요");
        });
    },
    logout() {
      axios
        .delete("/api/account")
        .then((res) => {
          alert("로그아웃 하였습니다.");
          this.state.account.id = null;
          this.state.account.name = "";
        });
    }
  },
};
</script>