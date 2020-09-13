<template>
  <div class="dynamicPage">
    <div class="pageBox">
      <div
        v-for="(page, index) in pageList"
        :key="index"
        :style="{ backgroundColor: page }"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      email: ""
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.dynamicPage {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .pageBox {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    div {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
