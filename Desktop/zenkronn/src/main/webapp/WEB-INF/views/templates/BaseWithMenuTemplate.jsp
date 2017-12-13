<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page pageEncoding="UTF-8" %>
<html>
<head>
    <title><tiles:getAsString name="title"/></title>
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
	<meta http-equiv="pragma" content="no-cache" />
    <!-- ace -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace/bootstrap.min.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace/font-awesome.min.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace/dropzone.css" />
	
	<link href="<%=request.getContextPath()%>/resources/css/jquery-ui_ace.css" rel="stylesheet" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace/ace-fonts.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace/ace.min.css" id="main-ace-style" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace/ace-skins.min.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace-rtl.min.css" />
	<script src="<%=request.getContextPath()%>/resources/css/ace/ace-extra.min.js"></script>
	
    <!-- ace -->
	<link href="<%=request.getContextPath()%>/resources/css/ui.dynatree.css" rel="stylesheet" type="text/css" />
    <script src="<%=request.getContextPath()%>/resources/js/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/resources/js/jquery-ui-1.10.min.js" type="text/javascript"></script>
	<script src='<%=request.getContextPath()%>/resources/js/jquery.cookie.js' type="text/javascript"></script>
	<script src="<%=request.getContextPath()%>/resources/js/jquery.dynatree.js"></script>
	<script src="<%=request.getContextPath()%>/resources/js/js-ace-flot/jquery.dataTables.min.js"></script>
 	<script src="<%=request.getContextPath()%>/resources/js/js-ace-flot/jquery.dataTables.bootstrap.js"></script>
 	<script src="<%=request.getContextPath()%>/resources/js/js-ace-flot/bootstrap.min.js"></script>
	<script src="<%=request.getContextPath()%>/resources/js/js-ace-flot/ace-elements.min.js"></script>
	<script src="<%=request.getContextPath()%>/resources/js/js-ace-flot/ace.min.js"></script>
	
	<!--time picker -->
	<link href="<%=request.getContextPath()%>/resources/css/ace/bootstrap-datetimepicker.css" rel="stylesheet" />
	<link href="<%=request.getContextPath()%>/resources/css/ace/bootstrap-timepicker.css" rel="stylesheet" />
	<script src="<%=request.getContextPath()%>/resources/js/js-ace-flot/moment.min.js"></script>
	<script src="<%=request.getContextPath()%>/resources/js/js-ace-flot/bootstrap-datetimepicker.min.js"></script>
	<script src="<%=request.getContextPath()%>/resources/js/js-ace-flot/bootstrap-timepicker.min.js"></script>
 	<!--time picker -->
 	
 
</head>


<body class="no-skin">
	<tiles:insertAttribute name="header" />
	
	<div class="main-container container" id="main-container">
     	<tiles:insertAttribute name="menu" />
     	
	     <div class="main-content">
		 	<div class="breadcrumbs">
		       <!-- breadcrumbs goes here -->
		    </div>
		   
		<div class="page-content">
		
			 <div class="row">
			   <div class="col-xs-12">
			    <!-- page content goes here -->
				<tiles:insertAttribute name="body" />
			   </div><!-- /.col -->
			 </div><!-- /.row -->
		
		</div><!-- /.page-content -->
	    </div><!-- /.main-content -->
     
     
		<div class="footer">
		  <div class="footer-inner">
		    <div class="footer-content">
		       <tiles:insertAttribute name="footer" />
		    </div>
		  </div>
		</div>
		
   </div><!-- /.main-container -->

</body>


</html>