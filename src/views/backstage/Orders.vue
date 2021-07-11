<template>
  <div class="container">
    <h1 class="mt-5">orders</h1>
    <div class="overflow-scroll" style="max-height:80vh; min-height:80vh">
      <table class="table mt-4" style="max-height:80vh">
        <thead>
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th>應付金額</th>
            <th>是否付款</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, key) in orders" :key="key">
            <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
              <td></td>
              <td><span v-text="item.user.email" v-if="item.user"></span></td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="(product, i) in item.products" :key="i">
                    {{ product.product.title }} 數量：{{ product.qty }}
                    {{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td class="text-right">{{ item.total }}</td>
              <td>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`paidSwitch${item.id}`"
                    v-model="item.is_paid"
                    @change="updatePaid(item)"
                  />
                  <label class="form-check-label" :for="`paidSwitch${item.id}`">
                    <span v-if="item.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    type="button"
                    @click="openModal(item, 'edit')"
                  >
                    檢視
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    @click="openModal(item, 'delete')"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <Pagination :page="pagination" @getData="getOrders" />
    <OrderModal :order="tempOrder" @update-paid="updateOrder" ref="orderModal" />
    <DelModal :temp-product="tempOrder" ref="delModal" />
    <Loading :active="isLoading">
      <template v-slot:default>
        <img src="../../assets/images/cat.gif" alt="Loading" />
      </template>
    </Loading>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination.vue';
import OrderModal from '../../components/OrderModal.vue';
import DelModal from '../../components/DelModal.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      isLoading: true,
    };
  },
  components: {
    Pagination,
    OrderModal,
    DelModal,
  },
  methods: {
    getOrders(page = 1) {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.isLoading = true;

      if (token) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
        this.$http.defaults.headers.common.Authorization = token;
        this.$http
          .get(url)
          .then((res) => {
            if (res.data.success) {
              this.orders = res.data.orders;
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
      } else {
        this.$router.push('/');
      }
    },
    updateOrder(tempOrder) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${tempOrder.id}`;
      const uploadData = {
        data: { ...tempOrder },
      };
      this.isLoading = true;

      this.$http
        .put(url, uploadData)
        .then((res) => {
          if (res.data.success) {
            const { orderModal } = this.$refs;
            alert(res.data.message);
            orderModal.hideModal();
            this.getOrders();
            this.isLoading = false;
          } else {
            const { orderModal } = this.$refs;
            alert(res.data.message);
            orderModal.hideModal();
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteOrder(tempOrder) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${tempOrder.id}`;
      this.isLoading = true;

      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            const { delModal } = this.$refs;
            alert(res.data.message);
            delModal.hideModal();
            this.isLoading = false;
          } else {
            const { delModal } = this.$refs;
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
      const { orderModal, delModal } = this.$refs;
      this.tempOrder = { ...item };
      switch (action) {
        case 'edit':
          orderModal.openModal();
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
    this.getOrders();
  },
};
</script>
