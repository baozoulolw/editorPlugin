<template>
  <div class="tw-flex tw-gap-2">
    <res-button @click="connect">{{ showText }}</res-button>
    <res-button @click="copyShell">复制命令</res-button>
    <res-button @click="openTestPage">dev</res-button>
  </div>
</template>

<script>
import { set } from "vue";
import {
  getContainerRef,
  getSettings,
  copyToClipboard,
  findObjectByKey,
  removeTemplateTags,
  getCookie
} from "../../utils";
export default {
  name: "",
  data: () => ({
    hasConnect: false,
  }),
  computed: {
    showText() {
      return this.hasConnect ? "已连接" : "连接";
    },
  },
  methods: {
    connect() {
      if (window.mySocket) {
        window.mySocket.close();
      }
      const container = getContainerRef();
      const { appCode, pageCode } = container;
      // const socket = new WebSocket(
      //   `http://localhost:7458/browser?appCode=${appCode}&pageCode=${pageCode}`
      // );
      const socket = new WebSocket(
        `http://localhost:7969/browser?appCode=${appCode}&pageCode=${pageCode}`
      );
      // 监听连接成功事件
      socket.addEventListener("open", (event) => {
        window.mySocket = socket;
        this.hasConnect = true;
        const config = {
          token: getCookie('Authorization_lowcode'),
          host: location.hostname,
          base: $GLOBAL_CONFIG.apiPath.slice(0, -1),
          port: location.port || 80,
          origin: location.protocol.slice(0, -1),
        }
        socket.send(JSON.stringify(config))
      });
      // 监听接收到消息事件
      socket.addEventListener("message", async ({ data: rawData }) => {
        const { data, name, template } = JSON.parse(rawData);
        if (template) {
          const { path } = findObjectByKey(
            container.widgetJson,
            "key",
            template.split("&")[1]
          );
          const object = _.get(container.widgetJson, [...path]);
          object && (object.options.template = removeTemplateTags(data.code));
        } else {
          const map = {
            style: { name: "style.scss", key: "styleSheets" },
            page: { name: "page.json", key: "pageJson" },
            script: { name: "script.js", key: "pageScript" },
          };
          container.pageInfo[map[name].key] = data.code;
          container.widgetJson[map[name].key] = data.code;
          const codeRef = zzUtil.findRef(vueThis, "code");
          const activeName = codeRef.activeName;
          codeRef.activeName = "";
          codeRef.jscodes = codeRef._props.data.pageScript;
          codeRef.csscodes = codeRef._props.data.styleSheets;
          await this.$nextTick();
          codeRef.activeName = activeName;
        }
        this.downLoad(container);
        this.updPreview(container);
      });
    },
    copyShell() {
      const { appCode, pageCode } = getContainerRef();
      copyToClipboard(
        `pnpm run loadPage -- pageCode=${pageCode} appCode=${appCode}`
      );
    },
    downLoad(container) {
      const { syncDownload } = getSettings();
      if (syncDownload) {
        container.handleDownload();
      }
    },
    openTestPage() {
      const { appCode, pageCode } = getContainerRef();
      const { $GLOBAL_CONFIG: { apiPath } } = window
      const pageName = zzUtil.isMobile ? 'test' : 'pcTest'
      window.open(`${apiPath}auth/${pageName}.html?appCode=${appCode}&pageCode=${pageCode}&apiPath=${apiPath.slice(1, -1)}`)
      // other/auth/test.html?appCode=yxgl&pageCode=WelcomeInquiry
    },
    async updPreview(container) {
      const previewRef = container.$refs.preview;
      // console.log(previewRef.$children[0].$children[0].$children[0])
      // const ref = zzUtil.findRef(previewRef,'pageRendererCon')
      // console.log(ref)
      if (previewRef.previewVisible) {
        // previewRef.preview(true)
        // const generatePage = previewRef.$children[0].$children[0].$children[0]
        // previewRef.preview(true)
        // await this.$nextTick()
        // generatePage.initPage()
        previewRef.pageJsonUrl = "";
        await this.$nextTick();
        previewRef.preview(true);
      }
    },
  },
  async mounted() {
    // await new Promise(r => setTimeout(r, 3000))
    // this.connect()
  },
  created() {
    if (window.mySocket) {
      this.hasConnect = true;
    }
  },
};
</script>

<style scoped lang="scss"></style>
