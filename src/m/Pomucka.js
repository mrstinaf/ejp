function Pomucka( polozky) {
    this.id             = polozky.id;
    this.inventCislo    = polozky.inventCislo;
    this.nazev          = polozky.nazev;
    this.popis          = polozky.popis;
    this.kategorie      = polozky.kategorie;
    this.datNakup       = polozky.datNakup;
    this.vyrazeno       = polozky.vyrazeno == true;
    this.datVyraz       = polozky.datVyraz;
    
}

Pomucka.instances = {};   // nastavení prázdné kolekce 

// Konvertuje řádek na object
Pomucka.radekNaObj = function (pomuckaRadek) {
    var pomucka = new Pomucka( pomuckaRadek);
    return pomucka;
};

// Nacita vsechny zaznamy z Local Storage
Pomucka.nactiVse = function() {
    var klic = "", klice = [], pomuckyRetez="", pomucky={}, i=0;
    try {
       if (localStorage.getItem("pomucky")) {
        pomuckyRetez = localStorage.getItem("pomucky");
       } 
    } catch (e) {
        alert("CHYBA!!! - Chyba při čtení localStorage.\n" + e);
    }
    if (pomuckyRetez) {
        pomucky = JSON.parse( pomuckyRetez);
        klice = Object.keys( pomucky);
        console.log(klice.length + " pomucek nacteno.");
        for(i=0; i< klice.length; i++){
            klic = klice[i];
            Pomucka.instances[klic] = Pomucka.radekNaObj ( pomucky[klic]);
            if (maxId < Pomucka.instances[klic].id ) maxId = parseInt(Pomucka.instances[klic].id);
        }
    }
};


//  Uklada vsechny zaznamy do Local Storage
Pomucka.ulozVse = function () {
    var pomuckyRetez="", chyba = false;
        pocetPomucek = Object.keys( Pomucka.instances).length;
    try {
        pomuckyRetez = JSON.stringify( Pomucka.instances);
        localStorage.setItem("pomucky", pomuckyRetez);
    }  catch (e) {
        alert("CHYBA!!! - Chyba při zápisu do localStorage.\n" + e);
        chyba = true
    }
    if (!chyba) console.log( "Zapsáno " + pocetPomucek + " pomůcek.")
};

//  Vytvori novy zaznam
Pomucka.pridej = function ( polozky) {
    var kniha = new Pomucka( polozky);
    Pomucka.instances[polozky.id] = kniha;
    console.log("Polozka id=" + polozky.id + " vytvořena.")
};

//   Uprava polozky
Pomucka.uprav = function (polozky) {
    var kniha = new Pomucka(polozky);
    console.log("Uprava pomucky id="+polozky.id);
    Pomucka.instances[polozky.id] = kniha;
    console.log("Polozka id=" + polozky.id + " upravena.")   
    on_hlaska("Položka upravena.","");  
};

//  Smazání položky
Pomucka.smaz = function (id) {
     if (Pomucka.instances[id]) {
        console.log("Položka id="+id+" bude smazána.");
        delete Pomucka.instances[id];
        on_hlaska("Položka smazána.","");  
     } else {
         console.log("Položka id="+id+" nebyla v databázi nalezena.");
     }
     
};

/*******************************************
*********** Metody pro testování  **********
********************************************/
//  Vytvoří a uloží testovací data
Pomucka.generujTestData= function () {
    Pomucka.instances[1] = new Pomucka({id:"1",inventCislo:"00120",nazev:"AN 1",popis:"Kniha AN 1",kategorie:"knihy",datNakup:2020,vyrazeno:false,datVyraz:""});
    Pomucka.instances[2] = new Pomucka({id:"2",inventCislo:"00220",nazev:"CD AN 1",popis:"CD pro knihu AN 1",kategorie:"CD",datNakup:2020,vyrazeno:false,datVyraz:""});
    Pomucka.instances[3] = new Pomucka({id:"3",inventCislo:"00119",nazev:"Mind Game",popis:"English Game",kategorie:"hry",datNakup:2019,vyrazeno:true,datVyraz:"2020"});
    Pomucka.instances[4] = new Pomucka({id:"4",inventCislo:"00320",nazev:"AN 5",popis:"Kniha AN 5",kategorie:"knihy",datNakup:2020,vyrazeno:false,datVyraz:""});
    Pomucka.ulozVse();
    console.log("Zapsána testovací data.");
};

// Smaže všechna data
Pomucka.smazVse = function () {
    if (confirm("Opravdu smazat všechna data?")) {
        Pomucka.instances = {};
        localStorage.setItem("pomucky", "{}");
        console.log("Všechna data smazána.");
    }
};

//  Konec

