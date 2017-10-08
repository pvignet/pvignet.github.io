<?php
// this is the autoloader - if you upload to the server everything you downloaded, under the same structure, this path would work
require_once 'src/autoload.php';

// creation of the configuration object
$config = new ScientiaMobile\WurflCloud\Config();

// here is where you will put your own WURFL Cloud API Key
$config->api_key = 'XXXXXX:XXXXXXXXXXXXXXXXXXXXX';

// we are creating here the WURFL Cloud Client
$client = new ScientiaMobile\WurflCloud\Client($config);

// we are now detecting the device
$client->detectDevice();

// checking the capabilities that we are able to check
if ($client->getDeviceCapability('can_assign_phone_number')) {
  echo "This is a mobile phone and you can call from it";
} else {
  echo "This is not a mobile phone and you cannot call from it";
}