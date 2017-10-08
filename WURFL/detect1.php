<!DOCTYPE html>
<html>
<meta name="description" content="working with WURFL database">
<title>Detecting your Device</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta charset="utf-8">
</head>
<body>
<?php
require_once 'src/autoload.php';

$config = new ScientiaMobile\WurflCloud\Config();

$config->api_key = '2147483647:qxLKrZ3h5iuTpXNAa14J03jwVu14LWLW';

$client = new ScientiaMobile\WurflCloud\Client($config);

$client->detectDevice();

if ($client->getDeviceCapability('is_smartphone')): ?>
<div style="width:100%; font-weight:bold; background-color:white;">
<?php
   foreach ($client->capabilities as $name => $value) {
      if ($name == 'is_mobile') {
      echo "<strong>$name</strong>: ".(is_bool($value)? var_export($value, true): $value) ."<br>"; }
	  }
	  ?>
<?php else: ?>
<div style="width:90%; margin:0 auto; border:2px solid blue; background-color:cyan;">
<?php
   foreach ($client->capabilities as $name => $value) {
      if ($name == 'is_mobile') {
      echo "<strong>$name</strong>: ".(is_bool($value)? var_export($value, true): $value) ."<br>"; }
	  }
	  ?>
<?php endif; ?>
<p>The background color will be cyan with a border around it if it is not a smartphone. If it is a smartphone, the background color will be white and font will be bold</p>
</div>
</body>
</html>
