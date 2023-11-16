<template>
  <div id="app">
    <h1>当前网络信息：</h1>
    <h2>网络状态: {{ networkInfo?.type }}</h2>
    <h2>延迟: {{ networkInfo?.rtt }}ms</h2>
    <h2>带宽: {{ networkInfo?.downlink }}Mb/s</h2>
  </div>
</template>

<script setup lang="ts">
import { initVirtualWatcher, UserInfo, InitConfig } from "virtual-watcher";
import { onMounted, ref } from "vue";

const networkInfo = ref<UserInfo>();

const onUpdate = (info: UserInfo) => {
  console.log("onUpdate", info);
  networkInfo.value = info;
};

const getNetworkInfo = () => {
  const initConfig: InitConfig = {
    onUpdate,
    updateTime: 2000,
  };
  initVirtualWatcher(initConfig);
};

onMounted(getNetworkInfo);
</script>

<style scoped lang="scss"></style>
