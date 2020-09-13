<template>
  <div class="login">
    <div v-if="!ifLogin" class="login__wrapper">
      <h2>Login to see Dynamic Route Result</h2>
      <span>use dummy@gmail.com & dummy123</span>

      <form @submit.prevent="doLogin">
        <div class="email">
          <input type="email" placeholder="email" v-model="email" />
        </div>
        <div class="password">
          <input type="password" placeholder="password" v-model="password" />
        </div>
        <div class="btn">
          <button>Login</button>
        </div>

        <div v-if="error" class="error">{{ error.message }}</div>
      </form>
    </div>

    <div v-else>
      <div class="btn">
        <button @click="doLogout">Logout</button>
      </div>
      <DynamicPage :page-list="pageList" />
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import DynamicPage from "@/components/DynamicPage";
import Cookies from "js-cookie";

export default {
  components: {
    DynamicPage
  },
  props: {
    pageList: {
      type: Array,
      default: () => []
    },
    isLogin: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      email: "",
      password: "",
      error: "",
      ifLogin: this.isLogin
    };
  },
  mounted() {
    this.checkIfLoggedIn();
  },
  methods: {
    doLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          this.error = "";
          this.email = "";
          this.password = "";
          this.ifLogin = true;
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
              Cookies.set("access_token", token);
            });
        })
        .catch(er => (this.error = er));
    },
    doLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.ifLogin = false;
          Cookies.remove("access_token");
        });
    },
    checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged(usr => {
        if (usr) {
          console.log("yes");
          this.ifLogin = true;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
    border: 2px solid;
    border-radius: 4px;
    font-size: 1rem;
    margin: 0.25rem;
    min-width: 125px;
    padding: 0.5rem;
    transition: border-color 0.5s ease-out;
  }
  .error {
    color: red;
  }
}
</style>
