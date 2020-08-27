const initialState = {
    field1: [6,17,35,54,71,13,30,40,60,74,5,19,36,59,67,10,29,42,52,69,1,23,43,49,62],
    field2: [7,21,35,56,74,6,25,43,60,66,8,28,40,46,70,10,29,45,57,73,5,20,36,55,62],
};

const table1 = document.querySelectorAll("table")[0];
const table2 = document.querySelectorAll("table")[1];

const initState = (initialState) => {
    const storedState = localStorage.getItem("state");
    if(storedState) {
        const {table1, table2} = JSON.parse(storedState);
        for (i = 0; i < table1.length; i++) {
            if(table1[i]) {
                n.style.backgroundColor = "white";
            } else {
                n.style.backgroundColor = "red";
            }
        }
    }
    else {
        return initialState;
    }
};

const state = initState(initialState);

const populateTable = (table, content) => {
    content.forEach((value, i) => {
        let tr;
        if(i % 5 === 0) {
            tr = document.createElement("tr");
            table.appendChild(tr);
        }
        const td = document.createElement("td");
        td.innerText = value;
        tr.appendChild(td);
    });
};

populateTable(table1, state.field1);
populateTable(table2, state.field2);

const reducer = (action, state) => {
    switch(action.name) {
        case 'CHECK':
            return {...state}; 
        case 'UNCHECK':
            return {...state}
    }
    return {...state};
};

document.querySelectorAll("td").forEach((n) => {
    n.onclick = () => {
        const current = n.style.backgroundColor;
        if(current === 'red') {
            n.style.backgroundColor = "white";
        } else {
            n.style.backgroundColor = "red";
        }
    }
});