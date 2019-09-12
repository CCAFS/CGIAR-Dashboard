var sheetsArray = [];
var LOADED = 0;

$(document).ready(init);

function init() {
    //Contribution to SLO bar
    var slobar = createTableauViz('slo-bar', 'HomeDB-SLOBarTop', [ ]);
    //Outcome Impact Case Reports
    var oicrchart = createTableauViz('oicr-chart', 'HomeDB-OICRBarchartyear', [ ]);
    //Total Innovations
    var totalInnovations = createTableauViz('total-innovations', 'HomeDB-InnovCount', [ ]);
    //Total Partnerships
    var totalPartnerships = createTableauViz('total-partnerships', 'HomeDB-PartnershipCount', [ ]);
    //Total Trainees
    var totalCapDev = createTableauViz('total-capDev', 'HomeDB-CapDevCount', [ ]);
    //Total Publications
    var totalPublications = createTableauViz('total-publications', 'HomeDB-PublicationsCount', [ ]);
    //Total Policies
    var totalPolicies = createTableauViz('total-policies', 'HomeDB-PoliciesCount', [ ]);
    //Total Altmetric
    var totalAltmetric = createTableauViz('total-altmetric', 'HomeDB-AltmetricCount', [ ]);
}


function loadSheets(){
  sheetsArray = [

  ];
}

//Hide "loading" when all charts have loaded
function loaded() {
  LOADED += 1;
  if (LOADED == 8) {
    $("#loadingModal").modal('hide');
    // Load sheets
    loadSheets();
  }
}
