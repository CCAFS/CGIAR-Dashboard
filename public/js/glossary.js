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
    const trainees_group = iframeWindow.querySelector('#ly_ppl_trained');
    const publications_group = iframeWindow.querySelector('#ly_publications');
    const milestones_group = iframeWindow.querySelector('#ly_milestones');
    const almetrics_bg = iframeWindow.querySelector('#ly_almetric');
    const ly_slo = iframeWindow.querySelector('#ly_slo');

    sphere_title_1.onclick = function () {
        loadTerms('Sphere of control');
    };

    sphere_title_2.onclick = function () {
        loadTerms('Sphere of influence');
    };

    sphere_title_3.onclick = function () {
        loadTerms('Sphere of interest');
    };
}

function loadTerms(triggerValue) {
    const csv_file_API = './csv/CGIAR Results Dashboard - Glossary - Project Management - Terms and Definitions List.csv';
    const tableWrapper = document.querySelector("#termsDefinitionsTable");
    tableWrapper.innerHTML = "";
    tableWrapper.innerHTML = "<tr class='headTitles'><th class='cellTerm'>Term</th><th class='cellDef'>Definition</th></tr>";
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
                if (value['Trigger'] == triggerValue) {
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