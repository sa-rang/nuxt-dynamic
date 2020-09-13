<template>
  <div class="app__container">
    <Login :page-list="pathList" :is-login="userLoginFound" />
  </div>
</template>

<script>
import Login from "@/components/Login";
import { getUserFromCookie } from "@/helpers";
export default {
  components: {
    Login
  },

  async asyncData(context) {
    try {
      let userLoginFound = false;
      console.log(context);
      if (process.server) {
        const user = getUserFromCookie(req);
        // console.log(user);
        // if (user) {
        //   userLoginFound = true;
        // } else {
        //   userLoginFound = false;
        // }
      }
      const pathList = context.route.params.pathMatch.split("/");
      return { pathList, userLoginFound };
    } catch (ex) {
      context.error(ex);
    }
  }
};
</script>

<style lang="scss" scoped>
.app__container {
  * {
    margin: 0;
  }
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
