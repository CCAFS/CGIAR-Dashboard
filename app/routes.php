<?php
$container = $app->getContainer();
$settings = $container->get('settings');

$app->get('/action', App\Action\BaseAction::class)->setName('action');

$app->get('/[{actionName}]', function ($request, $response, $args) {
  global $settings;
  // CRP/Platform selected
  $entitySelected = $request->getQueryParam('entity');
  $entitySelected = (isset($entitySelected)? $entitySelected : "");

  // Year Selected
  $yearSelected = $request->getQueryParam('year');
  $yearSelected = (isset($yearSelected)? $yearSelected : 2020);

  // Managers
  $controlList = new \services\ControlListService();
  $sections = $controlList->getSections();

  // Current section/view
  $currentSection = (isset($args['actionName'])? $args['actionName'] : $sections[0]['action']);
  $currentView = $currentSection;
  $forceRefresh = false;
  if(($currentSection == "partnerships")){
    if($yearSelected > 2017){
      $currentView = $currentSection. "-2018";
    }
    $forceRefresh = true;
  }
  $glossarySection = false;
  if ($currentSection == 'glossary') {
    $glossarySection = true;
  } else {
    $glossarySection = false;
  }

  // Embeding
  $embed = (($request->getQueryParam('embed') == "true")? true : false);
  $hostOrigin = $request->getQueryParam('hostOrigin');
  $queryParams = ""; //$request->getUri()->getQuery();
  $displayNav = true;
  if ($embed){
    $displayNav = (($request->getQueryParam('displayNav') == "true")? true : false);
    $queryParams = "embed=true&hostOrigin=".$hostOrigin."&displayNav=".($displayNav?'true':'false');
  }

  $this->view->render($response, $currentView.'.twig', [
    'sections' => $sections,
    'crps' => $controlList->getCrps(),
    'years' => $controlList->getYears(),
    'chartsInfo' => $controlList->getChartsInfo(),
    'messagesArray' => $controlList->getMessages(),
    'dataUrl' => $controlList->getDataUrl(),
    'currentSection' => $currentSection,
    'entitySelected' => $entitySelected,
    'yearSelected' => $yearSelected,
    'forceRefresh' => $forceRefresh,
    'embed' => $embed,
    'displayNav' => $displayNav,
    'hostOrigin' => $hostOrigin,
    'appConfig' => $settings['appConfig'],
    'queryParams' => $queryParams,
    'glossarySection' =>   $glossarySection,
  ]);
  return $response;
})->setName('homepage');

$app->get('/widget/main.js', function ($request, $response, $args) {
  global $settings;

  $controlList = new \services\ControlListService();

  // Active sections
  $sections = [];
  foreach ($controlList->getSections() as $i => $section) {
    if($section['active']){
      $sections[] = $section['action'];
    }
    
  }

  $requestScheme = $this->get('environment')['REQUEST_SCHEME'];
  $httpHost = $this->get('environment')['HTTP_HOST'];
  $basePath = $request->getUri()->getBasePath();
  $baseOrigin = $requestScheme. "://". $httpHost;
  $baseURL = $baseOrigin . "" .$basePath;

  $this->view->render($response,  'widget.twig', [
    'sectionsJson' => json_encode($sections),
    'baseOrigin' => $baseOrigin,
    'baseURL' => $baseURL,
    'appConfig' => $settings->get('appConfig')
  ]);

  return $response->withHeader('Content-type', 'text/javascript');
})->setName('widget');
