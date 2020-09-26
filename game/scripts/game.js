var startBtn = document.getElementById("startbtn");
startBtn.addEventListener("click", game);

var companyAmt = 2;
var companyData = [];
var initalCash = 1000000; // starting cash in $
var initialProfit = 100000;
for (let i = 0; i < companyAmt; i++) {
    companyData.push({name: "Company " + (i+1), bank: initalCash, profit: initialProfit});
}
console.log(companyData);

var buyChoices = [
    {
        text: "You may purchase a new manufacturing facility, this has a 90 percent chance to increase your annual profit rate by 30 percent. It will however cost 500,000 dollars.",
        cost: 500000,
        increase : 0.3,
        chance: 0.9
    },
    {
        text: "You may purchase a rival company's video game division for 1,800,000 dollars but you will receive a 95 percent chance to receive 66 percent increase in profits.",
        cost: 1800000,
        increase: 0.66,
        chance: 0.95
    },
    {
        text: "A failing company is going bankrupt, it has massive potential in its assets but is a very risky investment. You may purchase it for only 400,000 for a 55 percent profit increase, however it only has a 49 percent chance to succeed.",
        cost: 400000,
        increase: 0.55,
        chance: 0.49
    },
    {
        text: "A rival company is losing money, you have the chance to buy it for 800,000 dollars. If it works it will increase your profits by 40 percent if it works and it has a 70 percent chance to succeed.",
        cost: 800000,
        increase: 0.4,
        chance: 70
    },
    {
        text: "You have the opportunity to hire a marketing company, this will cost you 1,000,000 dollars. If it works it will increase your profits by 35% but it only has a 95% chance of success.",
        cost: 1000000,
        increase: 0.35,
        chance: 0.95
    },
    {
        text: "You have the opportunity to buy a substantial share of a new technology start up for 500,000 dollars. If it succeeds, it will increase your profits by 250% but it only has a 12.5% chance of succeeding.",
        cost: 500000,
        increase: 2.5,
        chance: 0.125
    }
];

var sellChoices = [
    {
        text: "You may sell one of your board game divisions to a rival company for $1,000,000 in cash and a 60% reduction in profits.",
        income: 1000000,
        reduction: 0.6
    },
    {
        text: "You may sell one of your video game division to a rival company for $500,000 in cash and a 40% reduction in profits.",
        income: 500000,
        reduction: 0.6
    },
    {
        text: "You may sell one of your soft toy divisions to a rival company for $200,000 in cash and a 20% reduction in profits.",
        income: 200000,
        reduction: 0.2
    },
    {
        text: "You may sell one of your construction toy divisions to a rival company for $100,000 in cash and a 12.5% reduction in profits.",
        income: 100000,
        reduction: 0.125
    },
    {
        text: "You may sell one of your wooden toy divisions to a rival company for $50,000 in cash and a 10% reduction in profits.",
        income: 50000,
        reduction: 0.1
    }
];

var sabotageChoices = [
    {
        text: "You reveal false information about your investments into the video game industry, for only $5,000 yourself. If the other company buys it, their profits will decrease by 20%, but if it backfires (25% chance), you lose 50% of your profits.",
        cost: 5000,
        oppLoss: 0.2,
        ownLoss: 0.5,
        fine: 0,
        chance: 0.75
    },
    {
        text: "You attempt to sabotage the manufacturing line of your competitor for a cost of $150,000. It has a 90% chance of success, where the competitor loses 30% of their profits. If you are caught, you pay $1,500,000 in damages and lose 80% of profits.",
        cost: 150000,
        oppLoss: 0.3,
        ownLoss: 0.8,
        fine: 1500000,
        chance: 0.9
    },
    {
        text: "You launch a defamation campaign against your competition, the advertising campaign will cost $500,000 and will reduce their profits by 40% with an 80% chance to do so. If it fails, your profits reduce by 50%.",
        cost: 500000,
        oppLoss: 0.4,
        ownLoss: 0.5,
        fine: 0,
        chance: 0.8
    },
    {
        text: "You lie about the capabilities of your products for a cost of $50,000. If successful, the enemy profits reduce by 70%. It has a 40% chance of working. If it fails, your profits decrease by 50%.",
        cost: 50000,
        oppLoss: 0.7,
        ownLoss: 0.5,
        fine: 0,
        chance: 0.4
    }
];
var choices = [buyChoices, sellChoices, sabotageChoices];

var currentId = 0;
var turnText = "It is your turn. You have $";
var turnLimit = 10;
var turn = 0

function game() {
    console.log("game start");

    startBtn.remove();
    for (let i = 0; i < companyAmt; i++) {
        document.getElementById("c"+i).innerHTML = "";
    }

    for (let i = 0; i < companyData.length; i++) {
        companyData[i].name = prompt("Enter the name of "+companyData[i].name, companyData[i].name);
        document.getElementById("title"+i).innerText = companyData[i].name;
    };
    document.getElementById("turn-no").innerHTML = "Turn no.: 1";

    /*
        turn number and current company stored
        click button = advance turn

    */
    genButtons(currentId);
}

function genButtons(companyId) {
    var playerField = document.getElementById("c"+companyId);
    var opponentId = Math.abs(companyId - 1);
    var opponentField = document.getElementById("c"+opponentId);

    // start from a blank slate
    playerField.innerHTML = "";
    opponentField.innerHTML = "";

    alert("Click OK when " + companyData[companyId].name + " is ready.");

    var oppProfit = document.createElement("H4");
    oppProfit.innerHTML = "Profit last turn: $" + companyData[opponentId].profit;
    opponentField.appendChild(oppProfit);

    var playerBank = document.createElement("H4");
    playerBank.innerHTML = turnText + companyData[companyId].bank;
	var playerProfit = document.createElement("H4");
	playerProfit.innerHTML = "Profit last turn: $" + companyData[companyId].profit;
    playerField.appendChild(playerBank);
	playerField.appendChild(playerProfit);

    var buyBtn = document.createElement("BUTTON");
    var sellBtn = document.createElement("BUTTON");
    var sabotageBtn = document.createElement("BUTTON");
    var turnBtns = [buyBtn, sellBtn, sabotageBtn];
    var btnTexts = [];
    var btnActions = ["Buy", "Sell", "Sabotage"];
    for (var actionText of btnActions) {
        btnTexts.push("Select and <b>"+actionText+"</b>");
    }
    for (let v = 0; v < turnBtns.length; v++) {
        turnBtns[v].innerHTML = btnTexts[v];
        turnBtns[v].action = btnActions[v];
        turnBtns[v].companyId = companyId;
        turnBtns[v].opponentId = opponentId;
        turnBtns[v].playerField = playerField;
        turnBtns[v].addEventListener("click", doTurn);

        playerField.appendChild(turnBtns[v]);
    // }
    // for (let i of choices) {
        var i = choices[v];
        var dropdown = document.createElement("SELECT");
        for (let j = 0; j < i.length; j++) {
            var option = document.createElement("OPTION");
            option.innerHTML = i[j].text;
            option.value = j;
            dropdown.appendChild(option);
        }
        playerField.appendChild(dropdown);
    }

    // console.log("generated buttons");
}

function doTurn(evt) {
    var action = evt.target.action;
    var companyId = evt.target.companyId;
    var opponentId = evt.target.opponentId;
    var playerField = evt.target.playerField;
    var selection;
    var possible = false;

    switch (action) {
        case "Buy":
            // console.log("Buy");
            selection = buyChoices[playerField.getElementsByTagName("select")[0].value];
            possible = (companyData[companyId].bank >= selection.cost);
            break;
        case "Sell":
            // console.log("Sell");
            selection = sellChoices[playerField.getElementsByTagName("select")[1].value];
            possible = true;
            break;
        case "Sabotage":
            // console.log("Sabotage");
            selection = sabotageChoices[playerField.getElementsByTagName("select")[2].value];
            possible = (companyData[companyId].bank >= selection.cost);
            break;
    }
    console.log(selection);

    if (possible) {
        if (confirm("Are you sure you want to perform this action?")) {
            switch (action) {
                case "Buy":
                    companyData[companyId].bank -= selection.cost;
                    if (Math.random() < selection.chance) {
                        companyData[companyId].profit *= (1 + selection.increase);
                        alert("Item bought successfully. Your profits have risen.");
                    }
                    else {
                        alert("Item bought, but your profits didn't rise.");
                    }
                    break;
                case "Sell":
                    companyData[companyId].bank += selection.income;
                    companyData[companyId].profit *= (1-selection.reduction);
                    alert("Success. Money added and profits reduced.");
                    break;
                case "Sabotage":
                    companyData[companyId].bank -= selection.cost;
                    if (Math.random() < selection.chance) {
                        // sabotage success
                        companyData[opponentId].profit *= (1-selection.oppLoss);
                        alert("The sabotage was a success and the opposing company lost some profits.");
                    }
                    else {
                        // sabotage fail
                        companyData[companyId].profit *= (1-selection.ownLoss);
                        companyData[companyId].bank -= selection.fine;
                        alert("The sabotage failed and you lost some of your own profits.");
                    }
                    break;
            }

            // add profits 
            companyData[companyId].bank += companyData[companyId].profit;

            turn += 1;
            if (turn > turnLimit) {
                var winner;
                var points0 = 0.25 * companyData[0].bank + 7.5 * companyData[0].profit;
                var points1 = 0.25 * companyData[1].bank + 7.5 * companyData[1].profit;
                if (points0 > points1) {
                    winner = companyData[0].name;
                }
                else if (points0 < points1) {
                    winner = companyData[1].name;
                }
                else {
                    winner = "(it was a tie!)";
                }
				var endMsg = "The game has finished. The winner of the game is "+winner+" as they finished with the most points. "+companyData[0].name+" had "+points0+" points and "+companyData[1].name+" had "+points1+". Refresh to play again.";
                alert(endMsg);
				document.body.innerHTML = endMsg;
            }
            document.getElementById("turn-no").innerHTML = "Turn no.: " + turn;
            genButtons(opponentId);
        }
    }
    else {
        alert("You don't have enough money.");
    }

}


console.log("script loaded");