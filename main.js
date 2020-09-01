const initialState = {
    tables: new Map([
        [1, new Map([6, 17, 35, 54, 71, 13, 30, 40, 60, 74, 5, 19, 36, 59, 67, 10, 29, 42, 52, 69, 1, 23, 43, 49, 62].map((i) => [i, false]))],
        [2, new Map([7, 21, 35, 56, 74, 6, 25, 43, 60, 66, 8, 28, 40, 46, 70, 10, 29, 45, 57, 73, 5, 20, 36, 55, 62].map((i) => [i, false]))]
    ]),
};

const tables = document.querySelectorAll("table");

const initState = (initialState) => {
    const storedState = localStorage.getItem("state");
    if (storedState) {
        return storedState;
    } else {
        return initialState;
    }
};

let state = initState(initialState);

const populateTable = (tableNr, table, content) => {
    let tr, i = 0;
    content.forEach((checked, key) => {
        if (i % 5 === 0) {
            tr = document.createElement("tr");
            table.appendChild(tr);
        }
        const td = document.createElement("td");
        td.innerText = key;
        td.setAttribute("data-cell", i);
        td.setAttribute("data-table", tableNr);
        if (checked) {
            td.style.backgroundColor = "red";
        } else {
            td.style.backgroundColor = "white";
        }
        tr.appendChild(td);
        i++;
    });
};

const draw = (state) => {
    tables.forEach((table, i) => populateTable(i, table, state.tables.get(i)));
};

const reducer = (action, state) => {
    switch (action.name) {
        case 'INIT':
            return {...state};
        case 'CHECK':
            const entries = state.tables.entries();

            const cell = table.get(action.cell);
            return {...state, tables: []};
    }
    return {...state};
};

const action = (action) => {
    state = reducer(action, state);
    draw(state);
};

action('INIT');

document.querySelectorAll("td").forEach((n) => {
    n.onclick = () => {
        const cell = n.getAttribute("data-cell");
        const table = n.getAttribute("data-table");
        action('CHECK', {table, cell});
    }
});
