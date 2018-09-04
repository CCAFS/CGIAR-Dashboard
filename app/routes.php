<?php

$app->get('/action', App\Action\BaseAction::class)->setName('action');

$app->get('/', function ($request, $response, $args) {
  $sections = array(
    array('name' => 'Case Studies'),
    array('name' => 'Innovations'),
    array('name' => 'Partnerships'),
    array('name' => 'Trainees'),
    array('name' => 'Papers'),
    array('name' => 'Policies'),
    array('name' => 'Almetrics')
  );

  $crps = array(
    array('acronym' => 'All'),
    array('acronym' => 'CCAFS'),
    array('acronym' => 'PIM'),
    array('acronym' => 'WLE'),
    array('acronym' => 'A4NH'),
    array('acronym' => 'Livestock'),
    array('acronym' => 'FTA'),
    array('acronym' => 'Rice'),
    array('acronym' => 'RTB'),
    array('acronym' => 'Wheat'),
    array('acronym' => 'Maize'),
    array('acronym' => 'Fish'),
    array('acronym' => 'GLDC')
  );

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

  $this->view->render($response, 'home.twig', [
    'sections' => $sections,
    'crps' => $crps
  ]);
  return $response;
})->setName('homepage');
