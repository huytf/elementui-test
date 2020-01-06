<template>
  <div>
    <el-table :data="tableData" height="760" class="table">
      <el-table-column prop="id" label="id" width="180"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="sextext" label="性别" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10,20,30]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "table2",
  data() {
    return {
      tableData: [],
      total: 1,
      limit: 10,
      page: 1
    };
  },
  computed: {
    offset() {
      return (this.page - 1) * this.limit + 1;
    },
    paginationChange(){
      let {limit,page} = this
      return {limit,page}
    }
  },
  watch:{
    paginationChange(){
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleSizeChange(size) {
      this.limit = size;
    },
    handleCurrentChange(page) {
      this.page = page;
    },
    getList() {
      this.$axios
        .get("/api/list", {
          params: { limit: this.limit, offset: this.offset }
        })
        .then(res => {
          console.log(res);
          this.total = res.data.total;
          this.tableData = res.data.list.map(item => {
            item.sextext = item.sex === 0 ? "女" : "男";
            return item;
          });
        });
    }
  }
};
</script>

<style>
  .table{
    width: 100%;
  }
  .pagination{
    margin-top: 6px;
  }
</style>