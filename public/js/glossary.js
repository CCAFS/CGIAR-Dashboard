window.onload = function () {
    init();
}

let count = 0;
function init() {
    addEvents();
    loadTerms('0', 'All terms');
}

function addEvents() {
    const iframe = document.querySelector('#svg-iframe');
    const iframeWindow = (iframe.contentDocument);
    const sphere_title_1 = iframeWindow.querySelector('#tl_1');
    const sphere_title_2 = iframeWindow.querySelector('#tl_2');
    const sphere_title_3 = iframeWindow.querySelector('#tl_3');
    const trainees_group = iframeWindow.querySelector('#ly_ppl_trained');
    const ly_innovations = iframeWindow.querySelector('#ly_innovations');
    const ly_pjts_benfs = iframeWindow.querySelector('#ly_ptjs_benfs');
    const ly_slo = iframeWindow.querySelector('#ly_slo');
    const tl_partnertships = iframeWindow.querySelector('#tl_partnertships');
    const publications_group = iframeWindow.querySelector('#ly_publications');
    const milestones_group = iframeWindow.querySelector('#ly_milestones');
    const ly_oicr = iframeWindow.querySelector('#ly_oicr');
    const almetrics_bg = iframeWindow.querySelector('#ly_almetric');
    const ly_policies = iframeWindow.querySelector('#ly_policies');

    sphere_title_1.onclick = function () {
        loadTerms('1', 'Sphere of control');
    };

    sphere_title_2.onclick = function () {
        loadTerms('2', 'Sphere of influence');
    };

    sphere_title_3.onclick = function () {
        loadTerms('3', 'Sphere of interest');
    };

    trainees_group.onclick = function () {
        loadTerms('4', 'People trained, PhD');
    };

    ly_innovations.onclick = function () {
        loadTerms('5', 'Innovations');
    };

    ly_pjts_benfs.onclick = function () {
        loadTerms('6', 'Projected benefits assessment');
    };

    ly_slo.onclick = function () {
        loadTerms('7', 'SLOs');
    };

    tl_partnertships.onclick = function () {
        loadTerms('8', 'Partnerships');
    };

    publications_group.onclick = function () {
        loadTerms('9', 'Peer reviewed papers');
    };

    milestones_group.onclick = function () {
        loadTerms('10', 'Milestones');
    };

    ly_oicr.onclick = function () {
        loadTerms('11', 'OICR');
    };

    almetrics_bg.onclick = function () {
        loadTerms('12', 'Altmetric');
    };

    ly_policies.onclick = function () {
        loadTerms('13', 'Policies');
    };
}

function loadTerms(triggerValue, triggerName) {
    if (count == 0) {
        count += 1;
    } else {
        // window.location = '#termsDefinitionsTable';
        window.scrollBy(0, 260);
    }

    const csv_file_API = './csv/CGIAR Results Dashboard - Glossary - Project Management - Terms and Definitions List.csv';
    const table = document.querySelector("table");
    const tableWrapper = document.querySelector("#termsDefinitionsTable");
    table.innerHTML = "";
    tableWrapper.innerHTML = "";
    const tableCaption = triggerName;
    const tableCapEl = document.createElement("caption");
    tableCapEl.classList.add("tableCaption");
    tableCapEl.innerHTML = tableCaption;
    tableWrapper.innerHTML = "<tr class='headTitles'><th class='cellTerm'>Term</th><th class='cellDef'>Definition</th></tr>";
    table.appendChild(tableCapEl);
    table.appendChild(tableWrapper);

    $.ajax({
        type: 'GET',
        url: csv_file_API,
        dataType: 'text',

        error: function (e) {
            alert('An error occurred while processing API calls');
            console.log("API call Failed: ", e);
        },
        success: function (data) {
            var jsonData = $.csv.toObjects(data);

            $.each(jsonData, function (index, value) {
                if (value[triggerValue] == 'x' || value[triggerValue] == 'X') {
                    term = value['Term'];
                    definition = value['Definition'];
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
                } else if (triggerValue == '0') {
                    term = value['Term'];
                    definition = value['Definition'];
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
            });
        } // end: Ajax success API call
    }); // end: of Ajax call
}