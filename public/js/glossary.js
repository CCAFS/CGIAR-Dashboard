window.onload = function () {
    init();
}

function init() {
    addEvents();
}

function addEvents() {
    const iframe = document.querySelector('#svg-iframe');
    const iframeWindow = (iframe.contentDocument);
    const sphere_title_1 = iframeWindow.querySelector('#tl_1');
    const sphere_title_2 = iframeWindow.querySelector('#tl_2');
    const sphere_title_3 = iframeWindow.querySelector('#tl_3');

    sphere_title_1.onclick = function () {
        loadTerms();
    };
}

function loadTerms() {
    const tableWrapper = document.querySelector("#termsDefinitionsTable");
    const term = "The Sphere of Control";
    const definition = "The direct products of CGIAR research.";
    const rowEl = document.createElement("tr");
    const cellTermEl = document.createElement("td");
    const cellDefEl = document.createElement("td");
    cellTermEl.classList.add("cellTerm");
    cellDefEl.classList.add("cellDef");
    cellTermEl.innerHTML = term;
    cellDefEl.innerHTML = definition;
    rowEl.appendChild(cellTermEl);
    rowEl.appendChild(cellDefEl);
    tableWrapper.appendChild(rowEl);
}