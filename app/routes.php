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
  $yearSelected = (isset($yearSelected)? $yearSelected : 2018);

  // Managers
  $controlList = new \services\ControlListService();
  $sections = $controlList->getSections();

  // Current section/view
  $currentSection = (isset($args['actionName'])? $args['actionName'] : $sections[0]['action']);
  $currentView = $currentSection;
  $forceRefresh = false;
  if(($currentSection == "partnerships") || ($currentSection == "home")){
    if($yearSelected > 2017){
      $currentView = $currentSection. "-2018";
    }
    $forceRefresh = true;
  }

  // Embeding
  $embed = (($request->getQueryParam('embed') == "true")? true : false);
  $displayNav = true;
  if ($embed){
    $displayNav = (($request->getQueryParam('displayNav') == "true")? true : false);
  }

  $this->view->render($response, $currentView.'.twig', [
    'sections' => $sections,
    'crps' => $controlList->getCrps(),
    'years' => $controlList->getYears(),
    'chartsInfo' => $controlList->getChartsInfo(),
    'messagesArray' => $controlList->getMessages(),
    'currentSection' => $currentSection,
    'entitySelected' => $entitySelected,
    'yearSelected' => $yearSelected,
    'forceRefresh' => $forceRefresh,
    'embed' => $embed,
    'displayNav' => $displayNav,
    'hostOrigin' => $request->getQueryParam('hostOrigin'),
    'appConfig' => $settings['appConfig'],
    'queryParams' => $request->getUri()->getQuery()
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
