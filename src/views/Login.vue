<template>
  <div class="vh-100">
    <div class="container h-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-8 col-lg-3">
          <h1 class="mb-5 text-center">後台登入頁面</h1>
          <h2 class="h3 mb-3 text-center font-weight-normal">
            請先登入
          </h2>
          <form @submit.prevent="signIn" id="form" class="form-signin">
            <div class="form-floating mb-3">
              <input
                v-model="user.username"
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                required
                autofocus
              />
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                v-model="user.password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
              />
              <label for="password">Password</label>
            </div>
            <button id="loginBtn" class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </form>
          <p class="mt-3 mb-3 text-center text-muted">
            &copy; 2021~∞ - 六角學院
          </p>
        </div>
      </div>
    </div>
  </div>
  <Loading :active="isLoading">
    <template v-slot:default>
      <img src="../assets/images/tenor.gif" alt="Loading" style="height:300px;" />
    </template>
  </Loading>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    signIn() {
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.isLoading = true;
      this.$http
        .post(url, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hextoken=${token}; expires=${expired}`;
            alert(res.data.message);
            this.isLoading = false;
            this.$router.push('/admin/dashboard');
          } else {
            alert(res.data.message);
            this.user.username = '';
            this.user.password = '';
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
@import '../assets/stylesheets/all.scss';
</style>
