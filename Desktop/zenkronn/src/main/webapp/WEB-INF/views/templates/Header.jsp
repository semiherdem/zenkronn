<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page pageEncoding="UTF-8" %>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/header.js"></script>

<div id="navbar" class="navbar navbar-default navbar-fixed-top ">

 <div id="navbar-container" class="navbar-container container">

    <!-- toggle buttons are here or inside brand container -->

    <div class="navbar-header pull-left">
   		<a href="<%=request.getContextPath()%>/" class="navbar-brand">
			<small>
				<img class="labelincon" src="<%=request.getContextPath()%>/resources/img/logo.jpg"/>
			</small>
		</a>
      <!-- brand text here -->
    </div><!-- /.navbar-header -->

    <div class="navbar-buttons navbar-header pull-right ">
					
		<ul class="nav ace-nav">
			<!-- #section:basics/navbar.user_menu -->
		
			
			<li class="purple">
				<a href="<%=request.getContextPath()%>/">
					<i class="ace-icon fa fa-home"></i>
					Anasayfa
				</a>
			</li>
			
			<li class="green">
				<a href="<%=request.getContextPath()%>/help">
					<i class="ace-icon fa fa-exclamation-circle"></i>
					Help
				</a>
			</li>
			
			
			<li class="light-blue">
				<a data-toggle="dropdown" href="#" class="dropdown-toggle">
					<img class="nav-user-photo" src="<%=request.getContextPath()%>/resources/css/img/avatar2.png" />
					<span class="user-info">
							<sec:authentication property="principal.username" var="username"/>${username }				
					</span>

					<i class="ace-icon fa fa-caret-down"></i>
				</a>

				<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
					<li>
						<a href="<%=request.getContextPath()%>/views/logout">
							<i class="ace-icon fa fa-power-off"></i>
							Logout
						</a>
					</li>
				</ul>
			</li>
			

			<!-- /section:basics/navbar.user_menu -->
		</ul>
					
    </div><!-- /.navbar-buttons -->

    <nav class="navbar-menu pull-left">
      
    </nav><!-- /.navbar-menu -->

 </div><!-- /.navbar-container -->
</div><!-- /.navbar -->

<input type="hidden" value="<%=request.getContextPath()%>" id="contextPath" name="contextPath" />
<input type="hidden" value="${username }" id="username" /> 

<div id="userLoginLogInformationDialog"></div>