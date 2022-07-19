//ENUM

enum Months {
    Gennaio = 1,
    Febbraio,
    Marzo,
}

// enum Classi {
//     FE1 = 1,
//     FE2,
//     FE3,
//     FE4,
//     FE5,
//     FE6,
//     FE7,
// }

enum Classi {
    FE1 = "Front End Development 1",
    BE2 = "Back End Development 2",
    FE3 = "Front End Development 3",
}

type classeCorso = "FE1" | "BE1" | "CS1"

type studente = {
    name:string,
    classe: Classi.BE2
}

// let a:tipo = true
console.log(Months.Gennaio)

// let classi = ["FE1", "FE2", "FE3", "FE4", "FE5", "FE6"]
/*
1 - FE1
2 - BE1
3 - FE2
4 - CS1
*/

let s:studente = {
    name: "test",
    classe: Classi.FE1
}
let s1 = {
    name: "test",
    classe: 3
}


function getClasse(c) {

}