const drawTable = (state) => {
    return (table, tableNr) => {
        const body = table.querySelector("tbody");
        body.querySelectorAll('*').forEach(n => n.remove());
        const content = state.tables[tableNr];
        let tr, i = 0;
        Object.entries(content).forEach(([key, checked]) => {
            if (i % 5 === 0) {
                tr = document.createElement("tr");
                body.appendChild(tr);
            }
            const td = document.createElement("td");
            const nr = key.toString().substring(1);
            td.innerText = nr;
            if (checked) {
                td.style.backgroundColor = "red";
            } else {
                td.style.backgroundColor = "white";
            }
            td.onclick = () => {
                action('CHECK', {table: tableNr, number: nr});
            }
            tr.appendChild(td);
            i++;
        });
    };
};

const draw = (state) => {
    const tables = document.querySelectorAll("table");
    tables.forEach(drawTable(state));
};

const reducer = (action, state) => {
    switch (action.name) {
        case 'INIT':
            return {...state};
        case 'CHECK':
            const tables = [...state.tables];
            const table = tables[action.data.table];
            table[`c${action.data.number}`] = !table[`c${action.data.number}`];
            return {...state, tables};
    }
    return {...state};
};

const action = (() => {
    let state = JSON.parse(localStorage.getItem("state")) || initialState;
    return (name, data) => {
        state = reducer({name, data}, state);
        localStorage.setItem("state", JSON.stringify(state));
        draw(state);
    };
})();

action('INIT');
