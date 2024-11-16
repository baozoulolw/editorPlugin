<template>
  <el-button
    size="mini"
    class="btn tw-flex tw-items-center tw-justify-center"
    icon="el-icon-menu"
    @click="clickFormat"
  ></el-button>
</template>

<script>
import { unsafeWindow } from "$";

export default {
  name: "",
  data: () => ({}),
  methods: {
    clickFormat() {
      unsafeWindow.monaco.editor.getEditors().forEach((editor) => {
        editor
          .getAction('editor.action.formatDocument')
          .run()
      });
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.btn {
  position: absolute;
  z-index: 1000;
  left: 10px;
  top: 10px;
  background: transparent !important;
  color: white !important;
  font-size: 18px;
  height: 32px;
  width: 32px;
  border: 1px solid hsla(0, 0%, 100%, 0.2) !important;
  padding: unset;
}
</style>
