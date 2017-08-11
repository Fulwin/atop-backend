<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{!! csrf_token() !!}">
    <title>Atop Technology</title>
    <link href="{{ asset('/css/app.css') }}" rel="stylesheet">
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?6e0cff9073f44e35588f3ea0c2064ccd";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
    <script src="https://use.fontawesome.com/1f9c7af9a7.js"></script>
</head>
<body>

<div id="app"></div>

<?php
  $crsfToken = csrf_token();
  $t = [
    'csrfToken' => $crsfToken
  ];
?>
<script>
  window.Laravel = <?php echo json_encode($t); ?>;
</script>
<script src="{{ asset('/js/app.js') }}"></script>
</body>
</html>
