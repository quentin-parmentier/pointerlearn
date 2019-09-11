import RNN from "./RNN.js";

//Exemple [{size:2,fnc:""} , {size:3,fnc:"linear"} , {size:2,fnc:"linear"}]

var POP = [];
var NB_POP = 100;
var TOP_SELECT = 20;

let tab_reseau = [{size:2,fnc:""} , {size:2,fnc:"linear"} , {size:2,fnc:"linear"}]

//Initialisation du réseau
function createFirstGeneration(tab_reseau,nb_wanted){

    for (let index = 0; index < nb_wanted; index++) {
        POP.push(new RNN(tab_reseau,[]));
    }
}

//Calcul les valeurs de sorties
function activateRNN(entry_value){
    POP.forEach(element => {
       let sortie_value = element.calculerSorties(entry_value);
       //console.log(sortie_value)
       let score = fitness(entry_value,sortie_value); //Peut aussi changer ici

       //console.log(score)
       element.setScore = score;
    });
}

//Fonction de fitness change selon le problème
//Ici on veut que Yx,Yy = x,y
//On calcul la distance pour garder les taux les plus proches
function fitness(wanted_value,sortie_value){
    console.log(wanted_value,sortie_value)
    //Plus le score est grand, moins bien c'est par conséquent
    let score = Math.sqrt(Math.pow(wanted_value[0] - sortie_value[0],2) + Math.pow((wanted_value[1] -sortie_value[1]),2))//Distance cartésienne
    return score;
}

//On récupère les x meilleurs réseaux
function getTopPOP(){
    var listTop = new Array();

    POP.sort((a, b) => a.getScore > b.getScore ? 1 : -1); //Tri du plus petit au plus grand
    listTop = POP.slice(0,TOP_SELECT);
    return listTop;
}

//On accouple les différents réseaux en fonction de leurs poids et performance
function creatingBabies(tab_reseau){

    let topPOP = getTopPOP();

    let newGen = new Array();
    newGen = topPOP;

    for (let index = 0; index < NB_POP - TOP_SELECT; index++) {

        //On récupère deux parents
        let parentOne = topPOP[Math.floor(Math.random() * Math.floor(TOP_SELECT))];
        let parentTwo = topPOP[Math.floor(Math.random() * Math.floor(TOP_SELECT))];

        
        //On récupère la moitié des poids de l'un et de l'autre
        let wOne = parentOne.getW;
        let wTwo = parentTwo.getW;
        
        let newWeigths = [];

        wOne.slice(0,wOne.length/2).forEach(element => {
            newWeigths.push(element);
        });

        wTwo.slice(wTwo.length/2,wTwo.length).forEach(element => {
            newWeigths.push(element);
        });

        newWeigths = mutateBabies(newWeigths);

        newGen.push(new RNN(tab_reseau,newWeigths));
    }

    POP = newGen;

}

//Mutation du nouveau bébé
function mutateBabies(tab_weigths){
    
    let mutate_tab = new Array();
    tab_weigths.forEach(element => {
        if(Math.random() < 0.05){
            mutate_tab.push(Math.random());
        }else{
            mutate_tab.push(element);
        }
    });
    return mutate_tab;
}

//Fais avancer de 1 l'évolution (Gen 1 --> Gen 2)
function oneStep(entry_value,tab_reseau){

    activateRNN(entry_value);
    creatingBabies(tab_reseau)

}

createFirstGeneration(tab_reseau,100)

$(window).mousemove(function( event ) {

    let heigthPage = $( window ).height();
    let widthPage = $( window ).width();
    let entry_value = [event.pageX/widthPage,event.pageY/heigthPage];

    oneStep(entry_value,tab_reseau)

})
