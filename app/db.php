<?php
    class db{
        // Connect
        public function connect(){
            global $settings;
            $dbhost = $settings['settings']['db']['host'];
            $dbuser = $settings['settings']['db']['username'];
            $dbpass = $settings['settings']['db']['password'];
            $dbname = $settings['settings']['db']['database'];

            $mysql_connect_str = "mysql:host=$dbhost;dbname=$dbname;charset=utf8";
            $dbConnection = new PDO($mysql_connect_str, $dbuser, $dbpass);
            $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbConnection;
        }
    }
