import { toBRL } from "./filters.js";
import DolarReal from "./DolarReal.js";

export default {
  name: "AppleMarketCap",
  template: `
    <div id="app">
      <dolar-real></dolar-real>
      <p>Apple Market Cap: {{ appleMarketCap | toBRL }}</p>
    </div>
  `,
  data() {
    return {
      appleMarketCap: undefined,
    };
  },
  methods: {
    fetchAppleMarketCap() {
      fetch("https://api.origamid.dev/stock/aapl/quote")
        .then((response) => response.json())
        .then(({ marketCap }) => (this.appleMarketCap = marketCap));
    },
  },
  filters: { toBRL },
  created() {
    this.fetchAppleMarketCap();
  },
  components: {
    [DolarReal.name]: DolarReal,
  },
};
