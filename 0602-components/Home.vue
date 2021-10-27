<template>
  <div>
    <ul>
      <li @click="componentActive = 'Sobre'">Sobre</li>
      <li @click="componentActive = 'Servicos'">Serviços</li>
    </ul>
    <transition mode="out-in">
      <component :is="componentActive"></component>
    </transition>
  </div>
</template>

<script>
import Servicos from "./Servicos.vue";
import Sobre from "./Sobre.vue";

export default {
  data() {
    return {
      componentActive: Sobre.name,
    };
  },
  components: { Servicos, Sobre },
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translate3d(0, -20px, 0);
}
</style>
