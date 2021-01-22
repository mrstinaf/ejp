/***********************************************
***  Metody pro use case editace pomucky  ******
************************************************/
kab.v.editujPomucku = {
  vytvorFormular: function () {
    var formEl = document.forms['Pomucka'],
        tlacUloz = formEl.commit,
        tlacVyberKnihu = formEl.vyberKnihu;
    var klic="", klice=[], radek=null, seznamKnih=null, i=0;
    // nacte vse
    Pomucka.nactiVse();
    // vlozi seznam zaznamu do prvku
    klice = Object.keys( Pomucka.instances);
    for (i=0; i < klice.length; i++) {
      klic = klice[i];
      radek = Pomucka.instances[klic];
      seznamKnih = document.createElement("option");
      seznamKnih.text = radek.id+" - "+radek.nazev;
      seznamKnih.value = radek.id;
      tlacVyberKnihu.add( seznamKnih, null);
    }
    // kdyz je zaznam vybran, vyplni zbytek formulare
    tlacVyberKnihu.addEventListener("change", 
	    kab.v.editujPomucku.udalostVyberPomucku);
    // pri kliknutin na tlacitko vyvola udalost
    tlacUloz.addEventListener("click",
        kab.v.editujPomucku.udalostUlozPomucku);
  },
  udalostVyberPomucku: function () {
    var formEl = document.forms['Pomucka'];
    var tlacVyberKnihu = formEl.vyberKnihu,
        radek=null, klic = tlacVyberKnihu.value;
        if (klic) {
          radek = Pomucka.instances[klic];
          formEl.id.value = radek.id;
          formEl.inventCislo.value =  radek.inventCislo;
          formEl.nazev.value =   radek.nazev;
          formEl.popis.value = radek.popis;
          formEl.kategorie.value = radek.kategorie;
          formEl.datNakup.value  = radek.datNakup;
          formEl.vyrazeno.value = radek.vyrazeno;
          formEl.datVyraz.value = radek.datVyraz;
        } else {
          formEl.reset();
    }
  },
  // ulozeni zaznamu
  udalostUlozPomucku: function () {
    var formEl = document.forms['Pomucka'], 
        tlacVyberKnihu = formEl.vyberKnihu;  
    klic = tlacVyberKnihu.value;
    if (klic)  {
        var priznak = formEl.vyrazeno.value == "true";
        var polozky = { 
            id: formEl.id.value,
            inventCislo: formEl.inventCislo.value,
            nazev: formEl.nazev.value,
            popis: formEl.popis.value,
            kategorie: formEl.kategorie.value,
            datNakup: formEl.datNakup.value,
            vyrazeno: priznak,
            datVyraz: formEl.datVyraz.value
            };
        Pomucka.uprav( polozky);
        Pomucka.ulozVse();
    } else {
        formEl.reset();
    }
    formEl.reset();
  }
};