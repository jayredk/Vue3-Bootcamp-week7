<template>
  <div class="container mx-5">
    <div class="d-flex justify-content-between align-items-end mt-5">
      <h1 class="d-flex align-items-center mb-0">
        產品列表
      </h1>
      <button class="btn btn-primary" data-action="create">
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
              <button type="button" class="btn btn-sm btn-danger" data-action="remove">
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
  </div>
</template>

<script>
import ProductModal from '../../components/ProductModal.vue';

export default {
  data() {
    return {
      products: {},
      pagination: {},
      tempProduct: { imagesUrl: [] },
      action: '',
    };
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          } else {
            alert(res.data.message);
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

      if (this.action === 'edit') {
        url = `${this.apiUrl}api/${this.apiPath}/admin/product/${tempProduct.id}`;
        method = 'put';
      }

      this.$http[method](url, uploadData)
        .then((res) => {
          if (res.data.success) {
            productModal.hide();
            this.getProduct();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    },
    openModal(item) {
      this.action = window.event.target.dataset.action;
      this.$refs.productModal.imgData = null;
      const { productModal } = this.$refs;
      console.log(productModal);

      switch (this.action) {
        case 'create':
          this.tempProduct = { imagesUrl: [] };
          productModal.show();
          break;

        case 'edit':
          this.tempProduct = { ...item };
          if (!this.tempProduct.imagesUrl) {
            this.tempProduct.imagesUrl = [];
          }
          productModal.show();
          break;

        // case 'remove':
        //   this.tempProduct = { ...item };
        //   delProductModal.show();
        //   break;
        default:
          break;
      }
    },
  },
  components: {
    ProductModal,
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
  },
  mounted() {
    this.getProducts();
    console.log(this.$refs.productModal);
  },
};
</script>
