<template>
  <div class="d-flex">
    <aside class="navbar navbar-expand-lg flex-shrink-0 navbar-dark bg-dark" style="width:200px;">
      <div class="container-fluid flex-column h-100 min-vh-100">
        <a class="navbar-brand mt-3 mb-5" href="#">後台</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse align-items-start w-100" id="navbarSupportedContent">
          <ul class="navbar-nav flex-column w-100 mb-2 mb-lg-0 text-start">
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
      </div>
    </aside>
    <router-view />
  </div>
</template>

<style lang="scss">
@import '../../assets/stylesheets/all';
</style>
