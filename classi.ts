//CLASSI
class Lavoratore {
    public name: string;
    private compito: string | null;

    constructor(name: string) {
        this.name = name
        this.selezionaCompito()
        // this.compito = null; //utente non ha un compito
    }

    public selezionaCompito() {
        this.compito = this.assegnaTodo()
        // this.compito = "Debug"
    }

    getName() {
        return this.name
    }

    setName(n: string) {
        this.name = n
    }

    private assegnaTodo() {
        // fetch("todos").then(res=>res.json()).then((todos)=>{
        // })
        return "Debug"
        //rimmuove il todo dal server e lo restituisce
    }

    completaCompito() {
        this.compito = null
        if (confirm("Vuoi un altro task?")) {
            this.selezionaCompito()
        }
    }
}


let l = new Lavoratore("Flavio")
l.getName()

let btn = document.querySelector("#fineCompito") !
    btn.addEventListener("click", () => {
        l.completaCompito()
        l.selezionaCompito()

    })
let btn1 = document.querySelector("#fineCompito") !
    btn1.addEventListener("click", () => {
        l.completaCompito()
    })

//Paradigmi dell'OOP
//Incapsulamento - private/public
//Ereditarietà - extends
//Polimorfismo

class Veicolo {
    consumo: number
    ruote: number
    colore: string
    constructor(consumo: number, ruote: number, colore: string) {
        this.consumo = consumo
        this.ruote = ruote
        this.colore = colore
    }
    getConsumo(prezzo): number {
        // const prezzo = 10
        return this.consumo * prezzo
    }
}
class Moto extends Veicolo {
    constructor(consumo: number, colore: string) {
        super(consumo, 2, colore)
    }
    getConsumo(): number {
        if (this.consumo > 10) {
            return super.getConsumo(10)
        } else {
            return super.getConsumo(5)
        }
    }
}
// let v = new Veicolo(5, 4, "Rosso") //Di solito si istanziano le sottoclassi perchè la superclasse fa solo da modello per le sottoclassi
let m = new Moto(5, "Rosso")
m.getConsumo()




class Auto {
    consumo: number
    ruote: number
    colore: string
    constructor(consumo: number, colore: string) {
        this.consumo = consumo
        this.ruote = 4
        this.colore = colore
    }
    getConsumo(): number {
        const prezzo = 10
        return this.consumo * prezzo
    }
}


/* */
class ContoBancario {
    name: string
    iban: string
    constructor(name: string) {
        this.name = name
        // this.iban = this.getIban()
    }
    private getIban(): string {
        return "asdfghjkl";
    }
    apriConto(saldo: number) {
        this.iban = this.getIban()

        fetch("/conti", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: this.name,
                iban: this.iban,
                saldo: saldo
            })
        })
        return true
    }
}

class ContoBusiness extends ContoBancario {
    private credito:number

    constructor(name: string) {
        super(name)
        this.credito = 0
    }
    apriConto(saldo: number) {
        if (saldo > 1000) {
            return super.apriConto(saldo)
        } else {
            alert("Saldo minimo non rispettato")
            return false
        }
    }

    richiediCredito(c:number) {
        this.credito += c
        return this.credito
    }

}
class ContoPersonale extends ContoBancario {
    constructor(name: string) {
        super(name)
    }
    apriConto(saldo: number) {
        if(saldo < 0) {
            alert("Errore saldo")
            return false
        } else {
            return super.apriConto(saldo)
        }
    }
}

// let conto = new ContoBancario("Flavio")
let bConto = new ContoBusiness("Flavio")
let pConto = new ContoPersonale("Flavio")
// let x = conto.apriConto(80)
let y = bConto.apriConto(80)
let z = pConto.apriConto(80)

let creditoAttuale = bConto.richiediCredito(100)