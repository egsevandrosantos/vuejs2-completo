<template>
  <div>
    <button @click="ativo = !ativo">Ativar</button>
    <transition
      name="fade"
      enter-active-class="animar"
      leave-active-class="animar"
      @enter="enter"
      @leave="leave"
    >
      <h1 v-if="ativo">Serviços</h1>
    </transition>
    <transition name="fade" appear>
      <h1>Serviços 2</h1>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ativo: false,
    };
  },
  methods: {
    enter(elemento) {
      console.log(elemento);
    },
    leave() {
      console.log("Leave");
    },
  },
};
</script>

<style>
.fade-enter-active /* Quando esta entrando */,
.fade-leave-active /* Quando esta saindo */ {
  transition: opacity 2s;
}

.animar {
  transition: opacity 2s;
}

.fade-enter /* Quando esta entrando */,
.fade-leave-to /* Quando esta saindo */ {
  opacity: 0;
}
</style>
