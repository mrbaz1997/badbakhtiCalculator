
let _regions = ["Iran", "Netherlands", "Denmark", "Germany"]
let _currencies = { "USD": 1, "TOMAN": 35000, "EUR": 0.97, "DKK": 7.2 }
let _currency_values = [35000, 1000]

let _goods = ["coca", "small pizza", "family pizza", "206", "IPhone 13 Pro Max", "galaxy s22 ultra", "condom", "home rent", "hoodie", "wine bottle", "cinema ticket", "laptop 3080", "macbook", "macDonald sandwich", "steam game"]
let _iran_price = [0.35, 4.3, 10.8, 7000, 1285, 1000, 0.138, 171.42, 20, 18, 0.65, 2700, 3857, 3.43, 40]
let _netherlands_price = [3, 9.5, 22, 2500, 822, 1149, 0.7, 1000, 40, 57, 14.5, 2000, 3046, 1.5, 60]
let _times = { "one day": 1, "one week": 7, "one month": 30, "one year": 365 }

let _net_income = 10000.0
let _selected_region = 0
let _selected_currency = 0
let _selected_time = 0

_full_goods_data = []
_cells = []
ascendig = true
function submit_informations(currency_index, net_income) {

}

function ReadElements(id, list) {
    for (var i = 0; i < list.length; i++) {
        document.getElementById(id).options.add(new Option(list[i], i))
    }
}

function ReadDict(id, dict) {
    var counter = 0
    for (const value in dict) {
        document.getElementById(id).options.add(new Option(value, counter))
        counter++
    }
}

function GetNumberStep(id, value) {
    _net_income = value
    let counter = Math.floor(Math.log10(value))
    document.getElementById(id).step = (10 ** (counter - 2)) * 5
    Calculate()
}

function InitialJson() {
    for (let i = 0; i < _goods.length; i++) {
        _full_goods_data.push({ "id": i, "good": _goods[i], "bought": 0, "prices": [_iran_price[i], _netherlands_price[i]] })
    }
    //console.log(_full_goods_data)
}

function SetCurrency(value) {
    _selected_currency = value
    Calculate()
}

function SetRegion(value) {
    _selected_region = value
    Calculate()
}

function SetTime(value) {
    _selected_time = value
    Calculate()
}

function CreateCells() {
    var i = 0
    for (const key in _full_goods_data) {
        _cells[i] = { "id": _full_goods_data[key].id, "goods": _full_goods_data[key].good, "bought": _full_goods_data[key].bought, "numbers": CalculateGoodCounts(_full_goods_data[key].prices[_selected_region]) }
        i++;
    }
    console.log(_cells);
    return _cells
}


function CalculateGoodCounts(price) {
    var time = GetValueByIndex(_times, _selected_time)
    return (((_net_income / GetValueByIndex(_currencies, _selected_currency) / 30) / price) * time).toFixed(2)
}

function GetValueByIndex(dict, index) {
    return dict[Object.keys(dict)[index]]
}

function GetPairByIndex(dict, index) {
    return (GetKeyByIndex(dict, index), GetValueByIndex(dict, index))
}

function GetKeyByIndex(dict, index) {
    return Object.keys(dict)[index]
}

function Resort() {
    ascendig = !ascendig
    Calculate()

}



function GetImage(state) {
    //console.log(state)
    if (state) {
        return "files/down.png"
    }
    else {
        return "files/up.png"
    }

}

function Calculate() {

    CreateCells()
    sort()
    DrawTable()
    document.getElementById("columnImg").src = GetImage(ascendig)
}

function sort() {
    var items = Object.keys(_cells).map(function (key) {
        return [_cells[key].goods, _cells[key].bought, _cells[key].numbers];
    });
    items.sort(function (first, second) {
        if (ascendig)
            return first[2] - second[2];
        else
            return second[2] - first[2];
    });
    _cells = items
}

function DrawTable(data) {
    var table = document.getElementById("tableBody");
    if (table == null) return
    while (table.rows.length > 0) {
        table.deleteRow(0)
    }

    counter = 1
    for (const key in data) {
        var row = table.insertRow(table.rows.length)
        AddCellToRow(row, 0, data[key][0])
        AddCheckBoxToRow(row, 1, data[key][2], counter, data[key][1])
        AddCellToRow(row, 2, data[key][2])
        counter++;
    }
}


function AddCellToRow(row, index, data) {
    var cell = row.insertCell(index);
    var newText = document.createTextNode(data)
    cell.appendChild(newText);
}

function AddCheckBoxToRow(row, index, max, id, value) {
    var cell = row.insertCell(index);
    var input = document.createElement("input");
    input.setAttribute("type", "number");
    console.log("index " + id)
    input.setAttribute("onchange", "OnChangeNumber(id, max)")
    input.setAttribute("id", id)
    input.setAttribute("size", "3")
    input.setAttribute("max", max)
    if (value > 0)
        input.setAttribute("value", value)
    cell.appendChild(input);
}

function OnChangeNumber(id, max) {
    var element = document.getElementById(id)
    console.log("checkBoxMarked " + id + " " + element.value)
    if (element.value > max) element.value = max
    //console.log(_full_goods_data)
    console.log(_cells)
    _full_goods_data[id].bought = element.value
}
