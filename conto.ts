/* */
class ContoBancario {
    name: string
    iban: string
    credito:number|null
    saldo:number
    personale:boolean
    constructor(name: string) {
        this.name = name
        // this.iban = this.getIban()
    }
    private getIban(): string {
        return "asdfghjkl";
    }
    private apriConto(saldo:number){
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
    apriContoPersonale(saldo: number) {
        this.credito = null
        this.personale = true
        return this.apriConto(saldo)
    }
    apriContoBusiness(saldo: number) {
        if (saldo > 1000) {
            this.personale = false
            this.credito = 0
            return this.apriConto(saldo)
        } else {
            alert("Saldo minimo non rispettato")
            return false
        }

    }

    richiediCredito(c:number) {
        this.credito! += c;
    }

    bonfico(saldo:number) {
        if(this.personale){
            this.saldo -= saldo * 0.1
        }
        this.saldo -= saldo
    }
}

// let p = new ContoBancario("Personal")
// p.apriContoPersonale(100)
// let b = new ContoBancario("Business")
// b.apriContoBusiness(1500)
let b = true

let c = new ContoBancario("Business")
if(b){
    c.apriContoBusiness(1500)
} else {
    c.apriContoPersonale(1500)
}


let btnCredito = document.getElementById("btnCredito")!
let inputCredito:HTMLInputElement = document.querySelector("input")!
btnCredito.addEventListener("click",()=>{
    if(!c.personale){
        c.richiediCredito(parseInt(inputCredito.value))
    }
})
// c.apriContoBusiness(1000)


// class ContoBusiness extends ContoBancario {
//     private credito:number

//     constructor(name: string) {
//         super(name)
//         this.credito = 0
//     }
//     apriConto(saldo: number) {
//         if (saldo > 1000) {
//             return super.apriConto(saldo)
//         } else {
//             alert("Saldo minimo non rispettato")
//             return false
//         }
//     }

//     richiediCredito(c:number) {
//         this.credito += c
//         return this.credito
//     }

// }
// class ContoPersonale extends ContoBancario {
//     constructor(name: string) {
//         super(name)
//     }
//     apriConto(saldo: number) {
//         if(saldo < 0) {
//             alert("Errore saldo")
//             return false
//         } else {
//             return super.apriConto(saldo)
//         }
//     }
// }

// // let conto = new ContoBancario("Flavio")
// let bConto = new ContoBusiness("Flavio")
// let pConto = new ContoPersonale("Flavio")
// // let x = conto.apriConto(80)
// let y = bConto.apriConto(80)
// let z = pConto.apriConto(80)

// let creditoAttuale = bConto.richiediCredito(100)