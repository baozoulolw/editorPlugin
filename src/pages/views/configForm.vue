<template>
  <div>
    <el-form label-width="70px">
      <el-form-item label="字号">
        <el-input-number
          class="tw-w-full"
          v-model="settings.editorConfig.fontSize"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="字体">
        <el-select class="tw-w-full" v-model="settings.editorConfig.fontFamily">
          <el-option
            v-for="item in fonts"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缩进">
        <el-input-number
          class="tw-w-full"
          v-model="settings.editorConfig.tabSize"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="主题">
        <el-select
          :filterable="true"
          class="tw-w-full"
          v-model="settings.editorConfig.theme"
          @change="themeChange"
        >
          <el-option-group
            v-for="(list, index) in themes"
            :key="index"
            :label="list.group"
            :divider="true"
          >
            <el-option
              v-for="item in list.children"
              :key="item.themeName"
              :value="item.themeName"
              :label="item.name"
            >
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="智能提示">
        <el-select class="tw-w-full" v-model="settings.copilot">
          <el-option
            v-for="item in copilots"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加载tm">
        <el-switch v-model="settings.initTextmate"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSettings } from "../../utils";
import { codeThemeList } from "../../theme/themeList";
import { fontList } from "../../font/fontList";
import { copilots } from "../../copilot";
import { setSettings } from "../../utils";
import { regTheme } from "../../theme";
export default {
  name: "",
  data: () => ({
    settings: {
      editorConfig: {},
    },
    fonts: [],
    themes: [],
    copilots: [],
  }),
  watch: {
    settings: {
      handler: function (n, o) {
        setSettings(n);
      },
      deep: true,
    },
  },
  methods: {
    initThemeOptions() {
      let obj = _.groupBy(codeThemeList, "group");
      Object.keys(obj).forEach((key) => {
        this.themes.push({
          group: key === "undefined" ? "其他" : key,
          children: obj[key],
        });
      });
    },
    themeChange(theme) {
      if (_.isEmpty(theme)) return;
      regTheme(theme);
    },
  },
  mounted() {
    this.initThemeOptions();
    this.settings = getSettings();
    this.fonts = fontList;
    this.copilots = copilots;
  },
};
</script>

<style scoped lang="scss"></style>
