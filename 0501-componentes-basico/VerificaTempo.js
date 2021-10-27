import { inCelsius } from "./filters.js";

export default {
  name: "VerificaTempo",
  template: `
    <div id="app">
      <template v-if="!city">
        <p>Carregando tempo...</p>
      </template>
      <template v-else>
        <p>Cidade: {{ city }}</p>
        <p>Máxima de: {{ maxTemp | inCelsius }}</p>
        <p>Minima de: {{ minTemp | inCelsius }}</p>
        <p>Atualmente: {{ theTemp | inCelsius }}</p>
      </template>
    </div>
  `,
  data() {
    return {
      city: undefined,
      maxTemp: undefined,
      minTemp: undefined,
      theTemp: undefined,
    };
  },
  methods: {
    fetchTempo() {
      fetch("https://www.metaweather.com/api/location/455827/")
        .then((response) => response.json())
        .then((json) => {
          this.city = json.title;
          this.maxTemp = json.consolidated_weather[0].max_temp;
          this.minTemp = json.consolidated_weather[0].min_temp;
          this.theTemp = json.consolidated_weather[0].the_temp;
        });
    },
  },
  filters: { inCelsius },
  created() {
    this.fetchTempo();
  },
};
