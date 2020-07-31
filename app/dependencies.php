<?php
// DIC configuration

$container = $app->getContainer();

// -----------------------------------------------------------------------------
// Service providers
// -----------------------------------------------------------------------------

// Twig
$container['view'] = function ($c) {
    $settings = $c->get('settings');
    $view = new Slim\Views\Twig($settings['view']['template_path'], $settings['view']['twig']);

    // $function = new Twig_SimpleFunction('auto_version', function ($file) {
    //     dump($file);
    //     // echo '</script>';
    //     if (strpos($file, '/') !== 0 || !file_exists($_SERVER['DOCUMENT_ROOT'] . $file))
    //         return $file;

    //     $mtime = filemtime($_SERVER['DOCUMENT_ROOT'] . $file);
    //     return preg_replace('{\\.([^./]+)$}', ".$mtime.\$1", $file);
    // });
    
    $view->addExtension(new Twig_Extension_Debug());
    $view->addExtension(new Slim\Views\TwigExtension($c->get('router'), $c->get('request')->getUri()));
    // $view->getEnvironment()->addFunction($function);
    // $view->addExtension(new Twig_Extension_Debug());

    return $view;
};

// Flash messages
$container['flash'] = function ($c) {
    return new Slim\Flash\Messages;
};

// -----------------------------------------------------------------------------
// Service factories
// -----------------------------------------------------------------------------

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings');
    $logger = new Monolog\Logger($settings['logger']['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['logger']['path'], Monolog\Logger::DEBUG));
    return $logger;
};

$container['db'] = function ($c) {
    $capsule = new \Illuminate\Database\Capsule\Manager;
    $capsule->addConnection($c['settings']['db']);

    $capsule->setAsGlobal();
    $capsule->bootEloquent();

    return $capsule;
};

// -----------------------------------------------------------------------------
// Action factories
// -----------------------------------------------------------------------------


$container[App\Action\BaseAction::class] = function ($c) {
    return new App\Action\BaseAction($c->get('view'), $c->get('logger'));
};
