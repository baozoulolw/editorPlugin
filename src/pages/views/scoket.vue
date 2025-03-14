<template>
  <div>
    <res-button @click="connect">{{ showText }}</res-button>
  </div>
</template>

<script>
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
      const key = Object.keys(window).find((i) => {
        return _.has(window[i], "apiScript");
      });
      const [appCode, pageCode] = key.split("_");
      const socket = new WebSocket(
        `http://localhost:7458?appCode=${appCode}&pageCode=${pageCode}&type=1`
      );
      // 监听连接成功事件
      socket.addEventListener("open", (event) => {
        window.mySocket = socket;
        this.hasConnect = true;
      });
      // 监听接收到消息事件
      socket.addEventListener("message", ({ data }) => {
        console.log(JSON.parse(data));
      });
    },
  },
  mounted() {},
  created() {
    if (window.mySocket) {
      this.hasConnect = true;
    }
  },
};
</script>

<style scoped lang="scss"></style>
