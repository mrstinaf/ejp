/***********************************************
***  Metody pro use case vytvor pomucku      ***
************************************************/
kab.v.vytvorPomucku = {
  vytvorFormular: function () {
    var tlacitkoUloz = document.forms['Pomucka'].commit;
    // nacti vse
    Pomucka.nactiVse();
    document.getElementById("id").value = maxId+1;
    // pri kliknuti na tlacitko vyvola udalost
    tlacitkoUloz.addEventListener("click", kab.v.vytvorPomucku.udalostTlacitkoUloz);
  },
  // vytvori zaznam ze zadanych dat
  udalostTlacitkoUloz: function () {
    var formEl = document.forms['Pomucka'];
    var polozky = { id: formEl.id.value, 
        inventCislo: formEl.inventCislo.value,
        nazev: formEl.nazev.value,
        popis: formEl.popis.value,
        kategorie: formEl.kategorie.value,
        datNakup: formEl.datNakup.value,
        inventCislo: formEl.inventCislo.value,
        vyrazeno: formEl.vyrazeno.value,
        datVyraz: formEl.datVyraz.value,};
    console.log("Prida polozku do kolekce.")
    Pomucka.pridej( polozky);
    console.log("Ulozi vse do localStorage")  ;
    Pomucka.ulozVse();
    formEl.reset();
    Pomucka.nactiVse();
    document.getElementById("id").value = maxId+1;
  }
};