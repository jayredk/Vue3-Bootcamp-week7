<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li
        @click.prevent="$emit('getData', page.current_page - 1)"
        :class="{ disabled: !page.has_pre }"
        class="page-item"
      >
        <a class="page-link" href="#">Previous</a>
      </li>
      <li
        v-for="item in page.total_pages"
        :key="item"
        @click.prevent="$emit('getData', item)"
        :class="{ active: item === page.current_page }"
        class="page-item"
      >
        <a class="page-link" href="#">{{ item }}</a>
      </li>
      <li
        @click.prevent="$emit('getData', page.current_page + 1)"
        :class="{ disabled: !page.has_next }"
        class="page-item"
      >
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['page'],
};
</script>
