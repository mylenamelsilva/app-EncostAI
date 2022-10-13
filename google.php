<?php 
        $content = file_get_contents('');
        $content = str_replace('</title>','</title><base href="https://www.google.com/maps/" />', $content);
        $content = str_replace('</head>','<link rel="stylesheet" href="https://testencostai.netlify.app/assets/css/risco.css" /></head>', $content);
        echo $content;
        return $content;
?>