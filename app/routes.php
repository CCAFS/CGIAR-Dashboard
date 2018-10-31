<?php

$app->get('/action', App\Action\BaseAction::class)->setName('action');

$app->get('/[{actionName}]', function ($request, $response, $args) {

 // echo $args['actionName'];


  $sections = array(
    array('name' => 'Outcome Case Studies',   'action' => 'caseStudies',  'active' => true ),
    array('name' => 'Innovations',    'action' => 'innovations',  'active' => true ),
    array('name' => 'Partnerships',   'action' => 'partnerships', 'active' => true ),
    array('name' => 'Publications',   'action' => 'publications', 'active' => true ),
    array('name' => 'Altmetric',      'action' => 'altmetrics',   'active' => true )
  );

  $crps = array(
    array('acronym' => 'A4NH',      'name' => 'A4NH - Agriculture for Nutrition and Health'), 
    array('acronym' => 'CCAFS',     'name' => 'CCAFS - Climate Change, Agriculture and Food Security'), 
    array('acronym' => 'Livestock', 'name' => 'Livestock'), 
    array('acronym' => 'PIM',       'name' => 'PIM - Policies, Institutions, and Markets'), 
    array('acronym' => 'RTB',       'name' => 'RTB - Roots, Tubers and Bananas'), 
    array('acronym' => 'WLE',       'name' => 'WLE - Water, Land and Ecosystems') 
  );

  $years = array( '2017');

  $currentSection = (isset($args['actionName'])? $args['actionName'] : $sections[0]['action']);

  /*
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
  */

  $this->view->render($response, $currentSection.'.twig', [
    'sections' => $sections,
    'crps' => $crps,
    'years' => $years,
    'currentSection' => $currentSection
  ]);
  return $response;
})->setName('homepage');
