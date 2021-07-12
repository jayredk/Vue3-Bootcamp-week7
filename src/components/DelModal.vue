<template>
  <div
    id="delModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delModalLabel" class="modal-title">
            <span v-if="tempProduct.content">刪除產品</span>
            <span v-else-if="tempProduct.total">刪除訂單</span>
            <span v-else-if="tempProduct.code">刪除優惠卷</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-dark">
          是否刪除
          <strong class="text-danger">{{ tempProduct.title }}</strong>
          <span v-if="tempProduct.content"> 商品(刪除後將無法恢復)。 </span>
          <span v-else-if="tempProduct.total"> 訂單</span>
          <span v-else-if="tempProduct.code"> 優惠卷</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button @click="$emit('delete', tempProduct)" type="button" class="btn btn-danger">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '../mixins/modalMixin';

export default {
  mixins: [modalMixin],
  props: ['tempProduct'],
};
</script>
