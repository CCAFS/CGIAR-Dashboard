window.onload = function () {
    init();
}

let count = 0;
// Get the user-agent string
let userAgentString = navigator.userAgent;
// Detect Chrome
let chromeAgent = userAgentString.indexOf("Chrome") > -1;
// Detect Safari
let safariAgent = userAgentString.indexOf("Safari") > -1;
// Discard Safari since it also matches Chrome
if ((chromeAgent) && (safariAgent)) safariAgent = false;

function init() {
    console.log("Chrome:", chromeAgent, "Safari:", safariAgent);
    if (safariAgent != false) {
        $(".browser-message").css("display", "block");
        $("#svg-iframe").css("display", "none");
        $(".clearFilterBtn").css("display", "none");
        const mb4 = document.querySelector(".mb-4");
        const svg = document.querySelector("#svg-iframe");
        const image = document.createElement("img");
        image.setAttribute('width', '100%');
        image.setAttribute('height', '600');
        image.setAttribute('src', 'images/svg-interactive.svg?20210730a');
        svg.parentNode.insertBefore(image, svg.nextSibling);
        loadTerms('0', 'All terms');
    } else {
        addEvents();
        loadTerms('0', 'All terms');
    }
}

function addEvents() {
    const iframe = document.querySelector('#svg-iframe');
    const iframeWindow = (iframe.contentDocument);
    const sphere_title_1 = iframeWindow.querySelector('#tl_1');
    const sphere_title_2 = iframeWindow.querySelector('#tl_2');
    const sphere_title_3 = iframeWindow.querySelector('#tl_3');
    const trainees_group = iframeWindow.querySelector('#ly_ppl_trained');
    const ly_innovations = iframeWindow.querySelector('#ly_innovations');
    // const ly_pjts_benfs = iframeWindow.querySelector('#ly_ptjs_benfs');
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
        loadTerms('4', 'Capacity Development');
    };

    ly_innovations.onclick = function () {
        loadTerms('5', 'Innovations');
    };

    // ly_pjts_benfs.onclick = function () {
    //     loadTerms('6', 'Projected benefits assessment');
    // };

    ly_slo.onclick = function () {
        loadTerms('7', 'System Level Outcomes (SLOs)');
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
        loadTerms('11', 'Outcome/Impact Case Reports (OICRs)');
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
        window.location = '#termsDefinitionsTable';
    }

    if (triggerValue != '0') {
        $('.clearFilterBtn').css('display', 'flex');
    } else {
        $('.clearFilterBtn').css('display', 'none');
    }

    const csv_file_API = './csv/CGIAR Results Dashboard 2020 data - Project Management - Terms and Definitions List.csv';
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
                    cellTermEl.style.fontWeight = 'bold';
                    rowEl.appendChild(cellTermEl);
                    rowEl.appendChild(cellDefEl);
                    tableWrapper.appendChild(rowEl);
                    tableWrapper.style.height = '1%';
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
                    cellTermEl.style.fontWeight = 'bold';
                    rowEl.appendChild(cellTermEl);
                    rowEl.appendChild(cellDefEl);
                    tableWrapper.appendChild(rowEl);
                    tableWrapper.style.height = '500px';
                }
            });
        } // end: Ajax success API call
    }); // end: of Ajax call
}