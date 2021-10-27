<template>
  <div>
    <button @click="modalAtivo = true">Abrir modal</button>
    <transition name="fade">
      <Modal v-if="modalAtivo" @fecharModal="fecharModal" />
    </transition>
  </div>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  data() {
    return {
      modalAtivo: false,
    };
  },
  methods: {
    fecharModal() {
      this.modalAtivo = false;
    },
  },
  components: { Modal },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
