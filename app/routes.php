<?php
$container = $app->getContainer();
$settings = $container->get('settings');

$app->get('/action', App\Action\BaseAction::class)->setName('action');

$app->get('/[{actionName}]', function ($request, $response, $args) {
  global $settings;

  // Managers
  $controlList = new \services\ControlListService();
  $sections = $controlList->getSections();

  // Current section
  $currentSection = (isset($args['actionName'])? $args['actionName'] : $sections[0]['action']);

  // Embeding
  $embed = ($request->getQueryParam('embed')? true : false);

  $this->view->render($response, $currentSection.'.twig', [
    'sections' => $sections,
    'crps' => $controlList->getCrps(),
    'years' => $controlList->getYears(),
    'messagesArray' => $controlList->getMessages(),
    'currentSection' => $currentSection,
    'embed' => $embed,
    'hostOrigin' => $request->getQueryParam('hostOrigin'),
    'appConfig' => $settings['appConfig']
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



  // print_r($this->get('environment'));

  $this->view->render($response,  'widget.twig', [
    'sectionsJson' => json_encode($sections),
    'baseOrigin' => $baseOrigin,
    'baseURL' => $baseURL,
    'appConfig' => $settings->get('appConfig')
  ]);



  return $response->withHeader('Content-type', 'text/javascript');
})->setName('widget');
