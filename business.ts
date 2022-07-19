
interface Transazione {
    id:number,
    acconto:number,
    data:Date
}

class Conto {
    //transazioni e totale entrate e totale uscite
    entrate:Transazione[]
    uscite:Transazione[]

    transazioni:Transazione[]

    private name: string;
    iban: string;
    saldo:number;

    private personale:boolean
    constructor(name: string) {
        this.name = name

        // this.iban = this.getIban()
    }
    private getIban(): string {
        return "asdfghjkl";
    }
    private apriConto(saldo: number) {
        this.iban = this.getIban()
        this.saldo = saldo
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

    getName() {
        return this.name
    }


    creditoPossibile(){
        alert("Non hai un account business")
        return false
    }
    richiediCredito(c:number) {
        alert("Non hai un account business")
    }

    richiediAperturaConto(saldo:number){
        return this.apriConto(saldo)
    }

    generaPulsanti() {
        document.body.append(document.createElement("button"))
    }

    bonifico(saldo:number){
        this.saldo -= saldo
        this.uscite.push({
            id: this.uscite.length,
            acconto: saldo,
            data: new Date()
        })
    }

    totaleUscite() {
        return this.uscite.reduce((total, ele)=>{
            return total + ele.acconto
        }, 0)
    }
    
    totaleEntrate() {
        return this.entrate.reduce((total, ele)=>{
            return total + ele.acconto
        }, 0)
    }

    bilancio(){
        return this.totaleEntrate() - this.totaleUscite()
    }

}

class PersonalConto extends Conto{
    constructor(name:string){
        super(name)
    }
    bonifico(saldo:number){
        let commissione = saldo * 0.1
        this.saldo -= commissione
        super.bonifico(saldo)
    }
}

class BusinnessConto extends Conto {
    credito:number
    constructor(name:string){
        super(name)

    }

    creditoPossibile(){
        return true
    }
    richiediAperturaConto(saldo:number){
        if (saldo > 1000) {
            this.credito = 0
            return super.richiediAperturaConto(saldo)
        } else {
            alert("Saldo minimo non rispettato")
            return false
        }
    }
    richiediCredito(c:number) {
        this.credito += c
    }
    generaPulsanti(){
        super.generaPulsanti()
    }
    bilancio(){
        return this.totaleEntrate() - this.totaleUscite() - this.credito
    }

}

class TravelConto extends Conto {
    richiediAperturaConto(saldo:number){
        if (saldo > 500) {
            return super.richiediAperturaConto(saldo)
        } else {
            alert("Saldo minimo non rispettato")
            return false
        }
    }
    bonifico(saldo:number){
        let commissione = saldo * 0.05
        this.saldo -= commissione
        super.bonifico(saldo)
    }
}
let business:boolean = true
let conto:Conto|BusinnessConto

if(business){
    conto = new BusinnessConto("Flavio") 
} else {
    conto = new Conto("Flavio") 
    conto.getName()
}
conto.richiediAperturaConto(100)

let btnCredito = document.getElementById("btnCredito")!
let inputCredito:HTMLInputElement = document.querySelector("input")!
btnCredito.addEventListener("click",()=>{
    conto.richiediCredito(parseInt(inputCredito.value))
})