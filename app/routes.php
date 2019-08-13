<?php
$container = $app->getContainer();
$settings = $container->get('settings');

$app->get('/action', App\Action\BaseAction::class)->setName('action');

$app->get('/[{actionName}]', function ($request, $response, $args) {
  global $settings;

  $sections = array(
    array('name' => 'Home',                   'action' => 'home',         'active' => true ),
    array('name' => 'Outcome Case Reports',   'action' => 'caseReports',  'active' => true ),
    array('name' => 'Innovations',            'action' => 'innovations',  'active' => true ),
    array('name' => 'Partnerships',           'action' => 'partnerships', 'active' => true ),
    array('name' => 'Capacity Development',   'action' => 'capDev',       'active' => true ),
    array('name' => 'Publications',           'action' => 'publications', 'active' => true ),
    array('name' => 'Policies',               'action' => 'policies',     'active' => true ),
    array('name' => 'Altmetric',              'action' => 'altmetrics',   'active' => true )
  );

  $crps = array(
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

  $years = array( '2018','2017' );

  $currentSection = (isset($args['actionName'])? $args['actionName'] : $sections[0]['action']);

  //Get CRP messages
  $messagesJSON = file_get_contents('data/messages.json', FILE_USE_INCLUDE_PATH);
  $messagesArray = json_decode($messagesJSON, true);

  // Embeding
  $embed = ($request->getQueryParam('embed')? true : false);

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
    'messagesArray' => $messagesArray,
    'currentSection' => $currentSection,
    'embed' => $embed,
    'appConfig' => $settings['appConfig']
  ]);
  return $response;
})->setName('homepage');
