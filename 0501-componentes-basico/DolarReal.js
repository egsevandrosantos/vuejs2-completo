import { toBRL } from "./filters.js";

export default {
  name: "DolarReal",
  template: `<p>Dolar em reais: {{ quoteUSDBRL | toBRL }}</p>`,
  data() {
    return {
      quoteUSDBRL: undefined,
    };
  },
  methods: {
    fetchDolarReal() {
      fetch(
        "http://api.currencylayer.com/live?access_key=e53108814e836b4c88859e0ec617f5dc&format=1"
      )
        .then((response) => response.json())
        .then((json) => (this.quoteUSDBRL = json.quotes["USDBRL"]));
    },
  },
  filters: { toBRL },
  created() {
    this.fetchDolarReal();
  },
};
