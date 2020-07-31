<?php

// To help the built-in PHP dev server, check if the request was actually for
// something which should probably be served as a static file
if (PHP_SAPI === 'cli-server' && $_SERVER['SCRIPT_FILENAME'] !== __FILE__) {
    return false;
}

require __DIR__ . '/../vendor/autoload.php';

session_start();

// Loading services
require_once(__DIR__ . '/../app/services/ControlListService.php');

// Instantiate the app
$settings = require __DIR__ . '/../app/settings.php';
$app = new \Slim\App($settings);

// Set up database connection
require __DIR__ . '/../app/db.php';

// Set up dependencies
require __DIR__ . '/../app/dependencies.php';

// Register middleware
require __DIR__ . '/../app/middleware.php';

// Register routes
require __DIR__ . '/../app/routes.php';

// Run!
$app->run();
/**
 *  Given a file, i.e. /css/base.css, replaces it with a string containing the
 *  file's mtime, i.e. /css/base.1221534296.css.
 *  
 *  @param $file  The file to be loaded.  Must be an absolute path (i.e.
 *                starting with slash).
//  */
// function auto_version($file)
// {
//     if (strpos($file, '/') !== 0 || !file_exists($_SERVER['DOCUMENT_ROOT'] . $file))
//         return $file;

//     echo '<script>';
//     echo 'console.log(' . json_encode($file) . ')';
//     echo '</script>';
//     $mtime = filemtime($_SERVER['DOCUMENT_ROOT'] . $file);
//     return preg_replace('{\\.([^./]+)$}', ".$mtime.\$1", $file);
// }

// function console_log($data)
// {
//     echo '<script>';
//     echo 'console.log(' . json_encode($data) . ')';
//     echo '</script>';
// }
