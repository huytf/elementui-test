<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="180"></el-table-column>
    <el-table-column prop="username" label="姓名" width="180"></el-table-column>
    <el-table-column prop="sextext" label="性别" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.$axios
      .get("/api/list", {
        params: { limit: 1, offset: 20 }
      })
      .then(res => {
        console.log(res);
        this.tableData = res.data.list.map(item=>{
            item.sextext = item.sex === 0 ? '女' : '男'
            return item
        })
      });
  }
};
</script>

<style>
</style>