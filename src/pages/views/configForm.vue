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
            v-for="group in themes"
            :key="group.name"
            :label="group.name"
          >
            <el-option
              v-for="item in group.children"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
      <el-form-item label="vim">
        <el-switch v-model="settings.useVim" />
      </el-form-item>
      <el-form-item label="author">
        <el-input v-model="settings.annotationConfig.author"></el-input>
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
      annotationConfig:{}
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
    themeChange(theme) {
      if (_.isEmpty(theme)) return;
      regTheme(theme);
    },
  },
  mounted() {
    this.themes = codeThemeList;
    this.settings = getSettings();
    console.log(this.settings)
    this.fonts = fontList;
    this.copilots = copilots;
  },
};
</script>

<style scoped lang="scss"></style>
