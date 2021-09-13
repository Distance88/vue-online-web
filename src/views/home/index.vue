<template>
  <el-container>
    <el-main>
      <introduce></introduce>
    </el-main>
  </el-container>
</template>
<style scoped>
.el-main {
  padding: 0;
  height: 100%;
}
</style>
<script>
import introduce from './components/introduce'
export default {
  components: {
    introduce
  }
};
</script>