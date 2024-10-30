<template>
  <div id="self_dialog">
    <el-popover placement="bottom" width="250" trigger="click">
      <configForm />
      <el-button icon="el-icon-setting" slot="reference">设置</el-button>
    </el-popover>
  </div>
</template>

<script>
import configForm from "./views/configForm.vue";

export default {
  name: "",
  components: { configForm },
  data: () => ({}),
  methods: {
    initData(){

    }
  },
  mounted() {},
};
</script>

<style scoped lang="scss"></style>
