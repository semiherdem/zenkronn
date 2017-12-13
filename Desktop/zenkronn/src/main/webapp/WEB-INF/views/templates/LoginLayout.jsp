<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
    <title><tiles:getAsString name="title"/></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link href="<%=request.getContextPath()%>/resources/css/farm_style.css" rel="stylesheet" type="text/css"/>
     <!-- ace -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace/bootstrap.min.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace/font-awesome.min.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace/ace-fonts.css" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace/ace.min.css" id="main-ace-style" />
	<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/ace/ace-skins.min.css" />
	<script src="<%=request.getContextPath()%>/resources/css/ace/ace-extra.min.js"></script>
    <!-- ace -->
</head>

<tiles:insertAttribute name="header" />
<body class="login-layout light-login">
	
	<div class="main-container" id="main-container">
	     <div class="main-content">
			<tiles:insertAttribute name="body" />
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