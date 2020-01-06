<template>
  <el-container style="height: 880px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        class="menu"
        :default-openeds="['table']"
        :default-active="activeTab"
        @select="select"
      >
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>导航一
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>-->
        <el-menu-item index="hello">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="table">
          <template slot="title">
            <i class="el-icon-s-grid"></i>表格
          </template>
          <el-menu-item index="table1">表格1</el-menu-item>
          <el-menu-item index="table2">表格2</el-menu-item>
          <!-- <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>-->
        </el-submenu>
        <!-- <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>导航三
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>-->
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-tabs v-model="activeTab" type="card" @tab-remove="removeTab" :before-leave="leaveTab">
          <el-tab-pane
            v-for="(item) in worktabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="item.closable"
          ></el-tab-pane>
        </el-tabs>
      </el-header>

      <el-main style="padding-bottom:0;">
        <keep-alive :include="openTabs">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-aside {
  color: #333;
}
.menu {
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      activeTab: "hello"
    };
  },
  watch: {
    "$store.state.worktab.current"(tab) {
      this.activeTab = tab.name;
    }
  },
  computed: {
    worktabs() {
      return this.$store.state.worktab.list;
    },
    openTabs() {
      return this.$store.getters.openTabs;
    }
  },
  mounted() {
    this.activeTab = this.$store.state.worktab.current.name;
  },
  methods: {
    select(name) {
      if (this.$store.state.worktab.current.name !== name) {
        this.$router.push({ name });
      }
    },
    leaveTab(activeName) {
      if (this.$store.state.worktab.current.name !== activeName) {
        this.$router.push({ name: activeName });
      }
    },
    removeTab(targetName) {
      this.$store.dispatch("worktabRemove", targetName);
    }
  }
};
</script>