import Vue from "vue";

Vue.filter("currency", function (value, currency_mark = true) {
  if (value == null) value = 0;

  value = Number(value);
  return (
    (currency_mark ? "R$ " : "") +
    value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
  );
});

Vue.filter("cpfcnpj", function (value) {
  if (!value) return "";

  value = value.replace(/[^\d]*/i, "");
  value = value.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/i,
    "$1.$2.$3/$4-$5"
  );
  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/i, "$1.$2.$3-$4");

  return value;
});

Vue.filter("phoneCelphone", function (value) {
  if (!value) return "";

  value = `${value}`;

  value = value.replace(/[^0-9]/g, "");

  const isPhone = value.length <= 8;
  const isCelphone = value.length >= 9;

  if (isPhone) value = value.replace(/(\d{4})(\d{4})/, "$1-$2");
  else if (isCelphone) value = value.replace(/(\d{5})(\d{4})/, "$1-$2");

  return value;
});

Vue.filter("phoneCelphoneWithDDD", function (value) {
  if (!value) return "";

  value = `${value}`;

  value = value.replace(/[^0-9]/g, "");

  const isPhone = value.length <= 10;
  const isCelphone = value.length >= 11;

  if (isPhone) value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  else if (isCelphone)
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

  return value;
});

Vue.filter("phoneCelphoneWithDDI", function (value) {
  if (!value) return "";

  value = `${value}`;

  value = value.replace(/[^0-9]/g, "");

  const isPhone = value.length <= 12;
  const isCelphone = value.length >= 13;

  if (isPhone)
    value = value.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, "+$1 ($2) $3-$4");
  else if (isCelphone)
    value = value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");

  return value;
});

Vue.directive("click-outside", {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind: function (el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});
