<template>
  <div id="modal" @click="fecharModal">
    <div id="modal-content">
      <h1>Modal</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    fecharModal({ toElement }) {
      toElement.id === "modal" && this.$emit("fecharModal");
    },
  },
};
</script>

<style>
#modal {
  width: 100vw;
  height: 100vh;
  z-index: 1;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  background: darkgray;
}
</style>
