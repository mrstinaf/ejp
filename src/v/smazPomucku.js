/***********************************************
***  Metody pro use case smazani pomucky     ***
************************************************/
kab.v.smazPomucku = {
  vytvorFormular: function () {
    var tlacSmaz = document.forms['Pomucka'].commit;
    var vyberEl = document.forms['Pomucka'].vyberPomucku;
    var klic="", klice=[], radek=null, volbaEl=null, i=0;
    // nacti vse
    Pomucka.nactiVse();
    klice = Object.keys( Pomucka.instances);
    // vlozi seznam zaznamu do prvku
    for (i=0; i < klice.length; i++) {
      klic = klice[i];
      radek = Pomucka.instances[klic];
      volbaEl = document.createElement("option");
      volbaEl.text = radek.id+" - "+radek.nazev;
      volbaEl.value = radek.id;
      vyberEl.add( volbaEl, null);
    }
    // pri kliknutin na tlacitko vyvola udalost
    tlacSmaz.addEventListener("click",
        kab.v.smazPomucku.udalostSmazPomucku);
  },
  // smazani polozky a ulozeni zaznamu
  udalostSmazPomucku: function () {
    var vyberEl = document.forms['Pomucka'].vyberPomucku;
    var id = vyberEl.value;
    if (id) {
      Pomucka.smaz( id);
      Pomucka.ulozVse();
      // odstrani zaznam ze seznamu v prvku
      vyberEl.remove( vyberEl.selectedIndex);
    }
  }
};