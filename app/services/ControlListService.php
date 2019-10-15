<?php
namespace services;

class ControlListService {

  private $sections;
  private $crps;
  private $years;

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
      array('name' => 'OICR Test',                                'action' => 'oicr',                 'type' => 'section',      'active' => true ),
      array('name' => 'Innovations Test',                         'action' => 'innovationsTest',      'type' => 'section',      'active' => true ),
      array('name' => 'Milestones Test',                          'action' => 'milestonesTest',       'type' => 'section',      'active' => true ),
    );


    $this->crps = array (
      array('acronym' => '',            'name' => 'All'),
      array('acronym' => 'A4NH',        'name' => 'A4NH - Agriculture for Nutrition and Health'),
      array('acronym' => 'BigData',     'name' => 'BigData - Big Data in Agriculture'),
      array('acronym' => 'CCAFS',       'name' => 'CCAFS - Climate Change, Agriculture and Food Security'),
      array('acronym' => 'EiB',         'name' => 'EiB - Excellence in Breeding'),
      array('acronym' => 'Fish',        'name' => 'Fish'),
      array('acronym' => 'FTA',         'name' => 'FTA - Forests, Trees and Agroforestry'),
      array('acronym' => 'Genebank',    'name' => 'Genebank'),
      array('acronym' => 'GLDC',        'name' => 'GLDC - Grain Legumes and Dryland Cereals'),
      array('acronym' => 'Livestock',   'name' => 'Livestock'),
      array('acronym' => 'Maize',       'name' => 'Maize'),
      array('acronym' => 'PIM',         'name' => 'PIM - Policies, Institutions and Markets'),
      array('acronym' => 'Rice',        'name' => 'Rice'),
      array('acronym' => 'RTB',         'name' => 'RTB - Roots, Tubers and Bananas'),
      array('acronym' => 'Wheat',       'name' => 'Wheat'),
      array('acronym' => 'WLE',         'name' => 'WLE - Water, Land and Ecosystems'),
    );

    $this->years = array(
      array('year'=>  '',     'name' => 'All Years',  'checked' => false ),
      array('year'=>  2018,   'name' => '2018',       'checked' => false ),
      array('year'=>  2017,   'name' => '2017',       'checked' => false )
    );
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
