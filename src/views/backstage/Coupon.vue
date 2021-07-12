<template>
  <div class="container">
    <h1 class="mt-5">coupon</h1>
    <div class="text-end mt-4">
      <button @click="openModal({}, 'new')" class="btn btn-primary" type="button">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button @click="openModal(item, 'edit')" class="btn btn-outline-primary btn-sm">
                編輯
              </button>
              <button @click="openModal(item, 'delete')" class="btn btn-outline-danger btn-sm">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :page="pagination" @getData="getCoupon" />
  </div>

  <CouponModal
    :coupon="tempCoupon"
    :is-new="isNew"
    @update-coupon="updateCoupon"
    ref="couponModal"
  />
  <DelModal :temp-product="tempCoupon" @delete="removeCoupon" ref="delModal" />
  <Loading :active="isLoading">
    <template v-slot:default>
      <img src="../../assets/images/cat.gif" alt="Loading" />
    </template>
  </Loading>
</template>

<script>
import CouponModal from '../../components/CouponModal.vue';
import DelModal from '../../components/DelModal.vue';

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: {
    CouponModal,
    DelModal,
  },
  methods: {
    getCoupon(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading = true;

      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.coupons = res.data.coupons;
            this.pagination = res.data.pagination;
            this.isLoading = false;
          } else {
            alert(res.data.message);
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCoupon() {
      const { couponModal } = this.$refs;
      const method = this.isNew ? 'post' : 'put';
      const id = this.isNew ? '' : `/${this.tempCoupon.id}`;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon${id}`;
      this.isLoading = true;

      this.$http[method](url, { data: this.tempCoupon })
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            this.getCoupon();
            couponModal.hideModal();
            this.isLoading = false;
          } else {
            alert(res.data.message);
            couponModal.hideModal();
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeCoupon(tempCoupon) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${tempCoupon.id}`;
      const { delModal } = this.$refs;
      this.isLoading = true;

      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            this.getCoupon();
            delModal.hideModal();
            this.isLoading = false;
          } else {
            alert(res.data.message);
            delModal.hideModal();
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openModal(item, action) {
      const { couponModal, delModal } = this.$refs;
      this.tempCoupon = { ...item };
      switch (action) {
        case 'new':
          this.isNew = true;
          this.tempCoupon = { due_date: new Date().getTime() / 1000 };
          couponModal.openModal();
          break;
        case 'edit':
          this.isNew = false;
          couponModal.openModal();
          break;
        case 'delete':
          delModal.openModal();
          break;
        default:
          break;
      }
    },
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.getCoupon();
  },
};
</script>
