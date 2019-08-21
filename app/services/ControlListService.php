<?php
namespace services;

class ControlListService {

  private $sections;
  private $crps;
  private $years;

  public function __construct(){

    $this->sections = array(
      array('name' => 'Home',                   'action' => 'home',         'active' => true ),
      array('name' => 'System Level Outcomes',   'action' => 'systemLevelOutcomes',  'active' => true ),
      array('name' => 'Outcome Case Reports',   'action' => 'caseReports',  'active' => true ),
      array('name' => 'Innovations',            'action' => 'innovations',  'active' => true ),
      array('name' => 'Partnerships',           'action' => 'partnerships', 'active' => true ),
      array('name' => 'Capacity Development',   'action' => 'capDev',       'active' => true ),
      array('name' => 'Publications',           'action' => 'publications', 'active' => true ),
      array('name' => 'Policies',               'action' => 'policies',     'active' => true ),
      array('name' => 'Altmetric',              'action' => 'altmetrics',   'active' => true )
    );

    $this->crps = array(
      array('acronym' => 'A4NH',      'name' => 'A4NH - Agriculture for Nutrition and Health'),
      array('acronym' => 'BigData',   'name' => 'BigData - Big Data in Agriculture'),
      array('acronym' => 'CCAFS',     'name' => 'CCAFS - Climate Change, Agriculture and Food Security'),
      array('acronym' => 'EiB',       'name' => 'EiB - Excellence in Breeding'),
      array('acronym' => 'Fish',      'name' => 'Fish'),
      array('acronym' => 'FTA',       'name' => 'FTA - Forests, Trees and Agroforestry'),
      array('acronym' => 'Genebank',  'name' => 'Genebank'),
      array('acronym' => 'Livestock', 'name' => 'Livestock'),
      array('acronym' => 'Maize',     'name' => 'Maize'),
      array('acronym' => 'PIM',       'name' => 'PIM - Policies, Institutions, and Markets'),
      array('acronym' => 'Rice',      'name' => 'Rice'),
      array('acronym' => 'RTB',       'name' => 'RTB - Roots, Tubers and Bananas'),
      array('acronym' => 'Wheat',     'name' => 'Wheat'),
      array('acronym' => 'WLE',       'name' => 'WLE - Water, Land and Ecosystems')
    );

    $this->years = array( '2018','2017' );
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
