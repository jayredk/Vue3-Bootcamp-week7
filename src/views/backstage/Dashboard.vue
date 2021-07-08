<template>
  <div class="container">
    <h1 class="text-center mt-5">儀表版</h1>
  </div>
</template>

<script>
export default {
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      if (token) {
        const url = `${process.env.VUE_APP_API}api/user/check `;
        this.$http.defaults.headers.common.Authorization = token;

        this.$http.post(url).then((res) => {
          if (!res.data.success) {
            this.$router.push('/admin/dashboard');
          }
        });
      } else {
        this.$router.push('/');
      }
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
