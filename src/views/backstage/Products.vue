<template>
  <div class="container mx-5">
    <div class="d-flex justify-content-between align-items-end mt-5">
      <h1 class="d-flex align-items-center mb-0">
        產品列表
      </h1>
      <button @click="openModal" class="btn btn-primary" data-action="create">
        建立新的產品
      </button>
    </div>
    <table class="table text-dark mt-4">
      <thead>
        <tr>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="150">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody id="productList">
        <tr v-for="item in products" :key="item.id">
          <td class="text-start">{{ item.title }}</td>
          <td width="120">{{ item.origin_price }}</td>
          <td width="120">{{ item.price }}</td>
          <td width="100">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td width="120">
            <div class="btn-group">
              <button
                @click="openModal(item)"
                type="button"
                class="btn btn-primary btn-sm"
                data-action="edit"
              >
                編輯
              </button>
              <button
                @click="openModal(item)"
                type="button"
                class="btn btn-sm btn-danger"
                data-action="remove"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p>目前有 <span id="productCount"></span>{{ products.length }} 項產品</p>
    <Pagination :page="pagination" @getData="getProducts" />
    <ProductModal
      :product="tempProduct"
      :action="action"
      @update-product="updateProduct"
      ref="productModal"
    />
    <DelModal :temp-product="tempProduct" @delete="deleteProduct" ref="delModal" />
    <Loading :active="isLoading">
      <template v-slot:default>
        <img src="../../assets/images/cat.gif" alt="Loading" />
      </template>
    </Loading>
  </div>
</template>

<script>
import ProductModal from '../../components/ProductModal.vue';
import DelModal from '../../components/DelModal.vue';

export default {
  data() {
    return {
      products: {},
      pagination: {},
      tempProduct: { imagesUrl: [] },
      action: '',
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
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
    updateProduct(tempProduct) {
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let method = 'post';
      const uploadData = {
        data: { ...tempProduct },
      };
      const { productModal } = this.$refs;
      this.isLoading = true;

      if (this.action === 'edit') {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${tempProduct.id}`;
        method = 'put';
      }

      this.$http[method](url, uploadData)
        .then((res) => {
          if (res.data.success) {
            productModal.hideModal();
            this.getProducts();
            this.isLoading = false;
          } else {
            alert(res.data.message);
            this.isLoading = false;
          }
        })
        .catch((err) => console.log(err));
    },
    deleteProduct(tempProduct) {
      const { delModal } = this.$refs;
      this.isLoading = true;
      this.$http
        .delete(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${tempProduct.id}`,
        )
        .then((res) => {
          if (res.data.success) {
            delModal.hideModal();
            this.getProducts();
            this.isLoading = false;
          } else {
            alert(res.data.message);
            this.isLoading = false;
          }
        })
        .catch((err) => console.log(err));
    },
    openModal(item) {
      const { productModal, delModal } = this.$refs;
      this.action = window.event.target.dataset.action;
      this.$refs.productModal.imgData = null;

      switch (this.action) {
        case 'create':
          this.tempProduct = { imagesUrl: [] };
          productModal.openModal();
          break;

        case 'edit':
          this.tempProduct = { ...item };
          if (!this.tempProduct.imagesUrl) {
            this.tempProduct.imagesUrl = [];
          }
          productModal.openModal();
          break;

        case 'remove':
          this.tempProduct = { ...item };
          delModal.openModal();
          break;

        default:
          break;
      }
    },
  },
  components: {
    ProductModal,
    DelModal,
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.getProducts();
  },
};
</script>
