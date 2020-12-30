const initialState = {tables: [], form: true, scope: null};

const drawTable = (table, tableNr, tableDom) => {
    const body = tableDom.querySelector("tbody");
    body.querySelectorAll('*').forEach(n => n.remove());
    let tr;
    Object.entries(table).forEach(([key, checked], i) => {
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
    });
    document.getElementById("content").appendChild(tableDom);
};

const render = (state) => {
    document.getElementById("content").innerHTML = '';
    const {content} = document.getElementById("bingo");
    state.tables.forEach((table, index) => {
        const tableDom = content.cloneNode(true);
        drawTable(table, index, tableDom);
    });
    if (state.form) {
        const {content} = document.getElementById("form");
        const formContent = content.cloneNode(true);
        document.getElementById("content").appendChild(formContent);
    }
};

const reducer = (action, state) => {
    console.log(action);
    const {data, name} = action;
    switch (name) {
        case 'CLEAR':
            localStorage.removeItem(`state_${data.scope}`);
            return initialState;
        case 'INIT':
            const storedState = JSON.parse(localStorage.getItem(`state_${data.scope}`)) || initialState;
            return {...storedState, scope: data.scope};
        case 'CHECK':
            const tables = [...state.tables];
            const table = tables[data.table];
            table[`c${data.number}`] = !table[`c${data.number}`];
            return {...state, tables};
    }
    return {...state};
};

const action = (() => {
    let state = initialState;
    return (name, data) => {
        state = reducer({name, data}, state);
        if (state.scope) {
            localStorage.setItem(`state_${state.scope}`, JSON.stringify(state));
        }
        render(state);
    };
})();
