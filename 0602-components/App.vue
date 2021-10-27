<template>
  <div>
    <button @click="estoque++">Adicionar estoque</button>
    <button @click="estoque = 0">Deletar estoque</button>
    <p>{{ estoque }}</p>
    <transition mode="out-in">
      <p v-if="estoque <= 0" key="foraEstoque">Produto fora de estoque</p>
      <p v-else-if="estoque < 5" key="acabando">Itens quase acabando</p>
      <p v-else key="estoque">Itens em estoque</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      estoque: 1,
    };
  },
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
