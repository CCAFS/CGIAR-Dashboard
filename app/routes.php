<?php

$app->get('/action', App\Action\BaseAction::class)->setName('action');

$app->get('/[{actionName}]', function ($request, $response, $args) {

 // echo $args['actionName'];


  $sections = array(
    array('name' => 'Case Studies',   'action' => 'caseStudies',  'active' => true ),
    array('name' => 'Innovations',    'action' => 'innovations',  'active' => true ),
    array('name' => 'Partnerships',   'action' => 'partnerships', 'active' => true ),
    array('name' => 'Publications',   'action' => 'publications', 'active' => true )
  );

  $crps = array(
    array('acronym' => 'CCAFS'),
    array('acronym' => 'PIM'),
    array('acronym' => 'WLE'),
    array('acronym' => 'A4NH'),
    array('acronym' => 'Livestock'),
    array('acronym' => 'RTB')
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
