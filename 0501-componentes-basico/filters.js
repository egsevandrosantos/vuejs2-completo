const toBRL = (value) => {
  return (
    value &&
    (+value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  );
};

const inCelsius = (value) => {
  return +value.toFixed(2) + "ºC";
};

export { toBRL, inCelsius };
