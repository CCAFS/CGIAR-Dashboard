<?php
namespace services;

class ControlListService {

  private $sections;
  private $crps;
  private $years;
  private $chartsInfo;
  private $dataUrl;

  public function __construct(){

    $this->sections = array(
      array('name' => 'Home',                                     'action' => 'home',                 'type' => 'section',      'active' => true ),
      array('name' => '1. Contribution to System Level Outcomes (SLOs)',          'action' => 'systemLevelOutcomes',  'type' => 'section',      'active' => true ),
      array('name' => '2. Outcome Impact Case Reports (OICR)',    'action' => 'caseReports',          'type' => 'section',      'active' => true ),
      array('name' => '3. Progress Towards Milestones',           'action' => 'milestones',           'type' => 'section',      'active' => true ),
      array('name' => '4. Common Results Reporting Indicators',           'action' => 'innovations',          'type' => 'title',        'active' => true ),
      array('name' => 'Innovations',                              'action' => 'innovations',          'type' => 'subsection',   'active' => true ),
      array('name' => 'Partnerships',                             'action' => 'partnerships',         'type' => 'subsection',   'active' => true ),
      array('name' => 'Policies',                                 'action' => 'policies',             'type' => 'subsection',   'active' => true ),
      array('name' => 'Capacity Development',                     'action' => 'capDev',               'type' => 'subsection',   'active' => true ),
      array('name' => 'Publications',                             'action' => 'publications',         'type' => 'subsection',   'active' => true ),
      array('name' => 'Altmetric',                                'action' => 'altmetric',            'type' => 'subsection',   'active' => true ),
      array('name' => '5. Insights',                              'action' => 'insights',             'type' => 'section',      'active' => true ),
      array('name' => 'Innov Test',                                'action' => 'innovTest',                 'type' => 'section',      'active' => true ),
      array('name' => 'Innovations Test',                         'action' => 'innovationsTest',      'type' => 'section',      'active' => true ),
      array('name' => 'Milestones Test',                          'action' => 'milestonesTest',       'type' => 'section',      'active' => true ),
    );


    $this->crps = array (
      array('acronym' => '',            'name' => 'All'),
      array('acronym' => 'A4NH',        'name' => 'A4NH - Agriculture for Nutrition and Health'),
      array('acronym' => 'BIG DATA',    'name' => 'BIG DATA - Big Data in Agriculture'),
      array('acronym' => 'CCAFS',       'name' => 'CCAFS - Climate Change, Agriculture and Food Security'),
      array('acronym' => 'EiB',         'name' => 'EiB - Excellence in Breeding'),
      array('acronym' => 'FISH',        'name' => 'FISH'),
      array('acronym' => 'FTA',         'name' => 'FTA - Forests, Trees and Agroforestry'),
      array('acronym' => 'GENEBANK',    'name' => 'GENEBANK'),
      array('acronym' => 'GLDC',        'name' => 'GLDC - Grain Legumes and Dryland Cereals'),
      array('acronym' => 'LIVESTOCK',   'name' => 'LIVESTOCK'),
      array('acronym' => 'MAIZE',       'name' => 'MAIZE'),
      array('acronym' => 'PIM',         'name' => 'PIM - Policies, Institutions, and Markets'),
      array('acronym' => 'RICE',        'name' => 'RICE'),
      array('acronym' => 'RTB',         'name' => 'RTB - Roots, Tubers and Bananas'),
      array('acronym' => 'WHEAT',       'name' => 'WHEAT'),
      array('acronym' => 'WLE',         'name' => 'WLE - Water, Land and Ecosystems'),
    );

    $this->years = array(
      array('year'=>  '',     'name' => 'All Years',  'checked' => false ),
      array('year'=>  2018,   'name' => '2018',       'checked' => false ),
      array('year'=>  2017,   'name' => '2017',       'checked' => false )
    );

    $this->chartsInfo = array (
      array('title'=> 'Cross-Cutting Topics',         'info'=>'<p><strong>Principal Objective:</strong> Principally aimed at advancing Gender / Youth / Capacity Development / Climate Change.</p> <p><strong>Significant Objective:</strong> Gender / Youth / Capacity Development / Climate Change is a significant factor, however it is not the main reason for the work.</p>'),
      array('title'=> 'Innovations by Type',          'info'=>'<p><strong>Research and Communication Methodologies and Tools:</strong> Includes new or improved research and communication tools including Information Communication Technology.</p> <p><strong>Biophysical Research:</strong> Applies the approaches and methods of physical sciences to study biological systems and may include computational biology, decision support tools, and geospatial analysis.</p> <p><strong>Genetic:</strong> Includes new and adapted varieties, cultivars, lines, and breeds.</p> <p><strong>Social Science:</strong> Includes policy, economic, market access and nutrition research.</p> <p><strong>Production Systems and Management Practices:</strong> Includes Integrated Pest Management, Sustainable Intensification, Livestock Management, Post-Harvest technologies or management practices for feed or food, Natural Resource Management, Vaccines and Animal Health Services.</p>'),
      array('title'=> 'Policies by Type',             'info'=>'<p><strong>Curriculum:</strong> The means and materials with which students interact for the purpose of achieving identified educational outcomes.</p> <p><strong>Policy or Strategy:</strong> Includes a written decision or commitment to a particular course of action by an institution; or a high level plan outlining how a particular course of action will be carried out.</p> <p><strong>Budget or Investment:</strong> A budget or investment is an estimate of funds allocated for development.</p> <p><strong>Legal Instrument:</strong> Includes laws and regulations.</p>'),
      array('title'=> 'Training Terms',               'info'=>'<p><p><strong>Long-term:</strong> Includes academic degree training.</p><strong>Short-term:</strong> Includes all other types of training.</p> '),
      array('title'=> 'Number of Publications',       'info'=>'<p><strong>Open Access</strong> means the immediate, irrevocable, unrestricted and free online access by any user worldwide to information products, and unrestricted re-use of content (which could be restricted to non-commercial use and/or granted subject to appropriate licences in line with the CGIAR IA Principles), subject to proper attribution. See <a href="https://cgspace.cgiar.org/bitstream/handle/10947/2875/CGIAR%20OA%20Policy%20-%20October%202%202013%20-%20Approved%20by%20Consortium%20Board.pdf?sequence=4" target="_blank">CGIAR Open Access and Data Management Policy</a> for further information.</p> <p><strong>ISI</strong> provides indexing of major international journals and proceedings (<a href="https://mjl.clarivate.com/search-results" target="_blank">https://mjl.clarivate.com/search-results</a>).</p>')
    );

    $this->dataUrl = (object) [
    'home'=>  'https://dataverse.harvard.edu/dataverse/CGIAR-Results-Dashboard/',
    'systemLeveloutcomes'=>  'https://dataverse.harvard.edu/dataverse/CGIAR-Results-Dashboard/',
    'caseReports'=>  'https://dataverse.harvard.edu/dataverse/CGIAR-Results-Dashboard/',
    'milestones'=>  'https://dataverse.harvard.edu/dataverse/CGIAR-Results-Dashboard/',
    'innovations'=>  'https://dataverse.harvard.edu/dataverse/CGIAR-Results-Dashboard/'
    ];

  }

  public function getSections(){
    return $this->sections;
  }

  public function getCrps(){
    return $this->crps;
  }

  public function getYears(){
    return $this->years;
  }

  public function getChartsInfo(){
    return $this->chartsInfo;
  }

  public function getDataUrl(){
    return $this->dataUrl;
  }

  public function getMessages(){
    //Get CRP messages
    $messagesJSON = file_get_contents('./../app/data/messages.json', FILE_USE_INCLUDE_PATH);
    return json_decode($messagesJSON, true);
  }


  public function getDatabaseQuery(){
    global $settings;
    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();
        // Get CRPs
        $stmt = $db->query("SELECT * FROM global_units where global_unit_type_id = 1 and is_active = 1");
        $crps = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
  }

}

?>
