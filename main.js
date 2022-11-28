let _regions = ["Iran", "Netherlands", "Denmark", "Germany"]
let _currencies = ["USD", "TOMAN","EUR", "DKK"]
let _currency_values = [35000, 1000]
let _net_income = 10000
let _goods = ["coca", "small pizza", "family pizza", "206", "IPhone 13", "galaxy s22 ultra", "condom", "home rent", "hoodie", "wine bottle", "cinema ticket", "laptop 3080", "macbook", "macDonald sandwich", "steam game" ]
let _times = {"one day" : 1, "one week" : 7, "one month" : 30, "one year" : 365 }

function submit_informations(currency_index, net_income)
{
    
}

function ReadElements(id, list) {
    console.log(id)
    for (var i = 0; i < list.length; i++) {
        document.getElementById(id).options.add(new Option(list[i], i))
    }
}