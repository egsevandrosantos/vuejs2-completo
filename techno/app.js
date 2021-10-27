const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: undefined,
    carrinho: [],
    mensagemAlerta: undefined,
    alertaCarrinho: false,
    carrinhoAtivo: false,
  },
  methods: {
    fetchProdutos() {
      fetch("./api/produtos.json")
        .then((response) => response.json())
        .then((json) => (this.produtos = json));
    },
    fetchProduto(produtoId) {
      fetch(`./api/produtos/${produtoId}/dados.json`)
        .then((response) => response.json())
        .then((json) => (this.produto = json));
    },
    fecharModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.produto = undefined;
      }
    },
    clickForaCarrinho({ target, currentTarget }) {
      if (target === currentTarget) {
        this.carrinhoAtivo = false;
      }
    },
    abrirModal(produtoId) {
      this.fetchProduto(produtoId);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    adicionarItem() {
      if (this.produto.estoque) {
        this.produto.estoque--;

        const { id, nome, preco } = this.produto;
        let index = this.carrinho.findIndex((item) => item.id === id);
        let produto = this.carrinho[index];
        if (!produto) {
          produto = { id, nome, preco, quantidade: 0 };
          this.carrinho.push(produto);
          index = --this.carrinho.length;
        }
        // produto.quantidade++; // Ativa reatividade mas não dispara watch
        this.$set(this.carrinho, index, {
          id,
          nome,
          preco,
          quantidade: ++produto.quantidade,
        }); // Ativa reatividade e dispara watch
        this.alertar(`${nome} adicionado ao carrinho.`);
      }
    },
    removerItemPorQuantidade(index) {
      const produto = this.carrinho[index];
      const { id, nome, preco } = produto;
      // produto.quantidade--; // Ativa reatividade mas não dispara watch
      this.$set(this.carrinho, index, {
        id,
        nome,
        preco,
        quantidade: --produto.quantidade,
      }); // Ativa reatividade e dispara watch
      if (!produto.quantidade) {
        this.removerItemTodo(index);
      }
    },
    removerItemTodo(index) {
      this.carrinho.splice(index, 1);
    },
    compararEstoque() {
      const produtoCarrinho = this.carrinho.find(
        (item) => item.id === this.produto.id
      );
      if (produtoCarrinho) {
        this.produto.estoque -= produtoCarrinho.quantidade;
      }
    },
    checarLocalStorage() {
      const carrinhoLocalStorage = window.localStorage.carrinho;
      if (carrinhoLocalStorage) {
        this.carrinho = JSON.parse(carrinhoLocalStorage);
      }
    },
    alertar(mensagem) {
      this.mensagemAlerta = mensagem;
      this.alertaCarrinho = true;
      setTimeout(() => {
        this.alertaCarrinho = false;
      }, 1500);
    },
    router() {
      const hash = document.location.hash;
      if (hash) {
        this.fetchProduto(hash.replace("#", ""));
      }
    },
  },
  computed: {
    getCarrinhoQtde() {
      let qtde = 0;
      this.carrinho.forEach(({ quantidade }) => (qtde += quantidade));
      return qtde;
    },
    carrinhoTotal() {
      let total = 0;
      this.carrinho.forEach(
        ({ quantidade, preco }) => (total += quantidade * preco)
      );
      return total;
    },
  },
  watch: {
    produto() {
      document.title = (this.produto && this.produto.nome) || "Techno";
      const hash = (this.produto && this.produto.id) || "";
      history.pushState(null, null, `#${hash}`);
      if (this.produto) {
        this.compararEstoque();
      }
    },
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
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
  created() {
    this.fetchProdutos();
    this.checarLocalStorage();
    this.router();
  },
});
