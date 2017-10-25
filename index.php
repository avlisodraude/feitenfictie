<?php
    /*
    ** Define a couple of functions for
    ** starting and ending an HTML document
    */
    function startPage()
    {
        print("<html>\n");
        print("<head>\n");
        print("<title>Listing 24-1</title>\n");
        print("</head>\n");
        print("<body>\n");
    }

    function endPage()
    {
        print("</body>\n");
        print("</html>\n");
    }
    /*
    ** test for username/password
    */
    if( ( isset($_SERVER['PHP_AUTH_USER'] ) && ( $_SERVER['PHP_AUTH_USER'] == "nisv.feitfictie" ) ) AND
      ( isset($_SERVER['PHP_AUTH_PW'] ) && ( $_SERVER['PHP_AUTH_PW'] == "Feit||Fixi.17" )) )
    {
        startPage();

        print("You have logged in successfully!<br>\n");

        endPage();
    }
    else
    {
        //Send headers to cause a browser to request
        //username and password from user
        header("WWW-Authenticate: " .
            "Basic realm=\"Leon's Protected Area\"");
        header("HTTP/1.0 401 Unauthorized");

        //Show failure text, which browsers usually
        //show only after several failed attempts
        print("This page is protected by HTTP " .
            "Authentication.<br>\nUse <b>leon</b> " .
            "for the username, and <b>secret</b> " .
            "for the password.<br>\n");
    }
    print_r($_REQUEST);
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Feit & Fixie</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/landing-page.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

<!-- Navigation -->
<nav class="navbar navbar-default navbar-fixed-top topnav" role="navigation">
    <div class="container topnav">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <span class="siteLogo">
                <a class="navbar-brand topnav" href="#">Feit & Fixie</a>
                <p class="siteNameDesc">Van teskst naar archiefmateriaal</p>
            </span>

        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="#about">About</a>
                </li>
                <li>
                    <a href="#contact">Contact</a>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>


<!-- Header -->
<a name="about"></a>
<?php
print_r($_REQUEST); ?>

<div class="intro-header">
    <form name="cookieform" id="login" method="post">
        <input type="text" name="username" id="username" class="text"/>
        <input type="password" name="password" id="password" class="text"/>
        <input type="submit" name="sub" value="Submit" class="page"/>
    </form>


    <div class="container">

        <div class="row">
            <div class="col-lg-12">
                <div class="intro-message">
                    <h1>Van tekst naar archiefmateriaal</h1>

                    <div class="row">

                        <div class="col-lg-12">
                            <div class="input-group">
                                <input id="search_input_field" name="searchUrl" type="text" class="form-control" placeholder="Enter the url of a news item">
                                <span class="input-group-btn">
                                    <button id="search_article" class="btn btn-default" type="button">Go!</button>
                                </span>
                            </div><!-- /input-group -->
                        </div><!-- /.col-lg-12 -->
                    </div><!-- /.row -->

                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="table-responsive" id="searchTerms">

                </div><!--end of .table-responsive-->
            </div>
            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <div class="col-xs-12">
                    <div class="table-responsive" id="recommendedSegments">

                    </div><!--end of .table-responsive-->
                </div>
            </div>
        </div>
        <!-- /.container -->

    </div>
    <!-- /.intro-header -->

    <!-- Page Content -->
    <a name="contact"></a>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="list-inline">

                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                    <p class="copyright text-muted small">Copyright &copy; Beeld en Geluid 2017. All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
</div>
</body>

</html>
