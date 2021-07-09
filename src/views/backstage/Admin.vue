<template>
  <div class="d-flex align-items-start">
    <aside class="navbar navbar-expand-lg flex-shrink-0 navbar-dark bg-dark" style="width:200px;">
      <div class="container-fluid flex-column justify-content-between h-100 min-vh-100">
        <div class="align-items-start w-100">
          <router-link class="navbar-brand d-block mt-3 mb-5" to="dashboard">後台</router-link>
          <ul class="navbar-nav flex-column w-100 text-start">
            <li class="nav-item">
              <router-link
                to="dashboard"
                class="nav-link d-flex align-items-center"
                aria-current="page"
                ><span
                  class="iconify me-3"
                  data-icon="mdi:view-dashboard"
                  data-inline="false"
                  style="font-size:24px"
                ></span>
                儀表版
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="products" class="nav-link d-flex align-items-center">
                <span
                  class="iconify me-3"
                  data-icon="eos-icons:product-classes"
                  data-inline="false"
                  style="font-size:24px"
                ></span>
                產品管理
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="orders" class="nav-link d-flex align-items-center">
                <span
                  class="iconify me-3"
                  data-icon="mdi:clipboard-list"
                  data-inline="false"
                  style="font-size:24px"
                ></span>
                訂單管理
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="coupon" class="nav-link d-flex align-items-center">
                <span
                  class="iconify me-3"
                  data-icon="ph:ticket-fill"
                  data-inline="false"
                  style="font-size:24px"
                ></span>
                優惠卷管理
              </router-link>
            </li>
          </ul>
        </div>
        <button @click="signOut" class="btn btn-lg btn-light mb-5" type="button">登出</button>
      </div>
    </aside>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      if (token) {
        const url = `${process.env.VUE_APP_API}logout`;
        this.$http.defaults.headers.common.Authorization = token;

        this.$http
          .post(url)
          .then((res) => {
            if (res.data.success) {
              document.cookie = 'hextoken=;expires=';
              alert(res.data.message);
              this.$router.push('/');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/stylesheets/all';
</style>
