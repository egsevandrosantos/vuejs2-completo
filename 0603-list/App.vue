<template>
  <div>
    <button @click="ordenarAZ()">Ordenar A-Z</button>
    <br /><br />
    <button @click="ordenarZA()">Ordenar Z-A</button>
    <transition-group tag="ul">
      <li v-for="(produto, index) in carrinho" :key="produto.nome">
        <p>{{ produto.nome }}</p>
        <p>{{ produto.preco | numeroPreco }}</p>
        <button @click="remover(index)">Remover</button>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carrinho: [
        { nome: "Notebook", preco: 2399 },
        { nome: "Tablet", preco: 899 },
        { nome: "Smartphone", preco: 1399 },
      ],
    };
  },
  methods: {
    remover(index) {
      this.carrinho.splice(index, 1);
    },
    ordenarAZ() {
      this.carrinho.sort((itemA, itemB) =>
        itemA.nome > itemB.nome ? 1 : itemA.nome < itemB.nome ? -1 : 0
      );
    },
    ordenarZA() {
      this.ordenarAZ();
      this.carrinho.reverse();
    },
  },
  filters: {
    numeroPreco(valor, onlyNumber) {
      const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const preco = formatter.format(valor);
      if (!onlyNumber) {
        return preco;
      }
      return preco.replace("R$\xa0", ""); // \xa0 é espaço
    },
  },
};
</script>

<style>
.v-move {
  transition: transform 0.3s;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translate3d(-20px, 0, 0);
}
</style>
