<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<script type="text/javascript">
	var popupWindow = null;
	function Popup(url,winName,w,h,scroll)
	{
		LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
		TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
		settings =
		'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'
		popupWindow = window.open(url,winName,settings)
	}
</script>

<% 
   String captchaIsWrong = (String)request.getSession().getAttribute("captchaIsWrong"); 
   pageContext.setAttribute("error", captchaIsWrong); 
%>

<br/><br/><br/>
<br/><br/><br/>
<br/><br/><br/>
    <div class="row">
     <div class="col-sm-10 col-sm-offset-1">
     	<div class="login-container">
			  <div class="center">
			    <!-- page header and text -->
			  </div>
  			  <div class="space-6"></div><!-- optional space -->
			  <div class="pos-rel"><!-- a position relative container -->
			     <div class="login-box visible widget-box no-border" id="login-box">
	       			<div class="widget-body">
						<div class="widget-main">
							<h4 class="header blue lighter bigger">
								<i class="ace-icon fa fa-coffee green"></i>
								Kullanıcı Girişi
							</h4>
							<div class="space-6"></div>			
							<c:choose>
			    				<c:when test="${error == 'badCredentials'}">
			    					<div class="alert alert-danger"><i class="ace-icon fa fa-times"> Kullanıcı adı veya şifresi hatalı.</i></div>
			    				</c:when>
			    				<c:when test="${error == 'credentialsExpired'}">
			        				<div class="alert alert-danger"><i class="ace-icon fa fa-times"> Kullanıcı şifresinin süresi dolmuş.</i></div>
			    				</c:when>
			    				<c:when test="${error == 'accountLocked'}">
			    					<div class="alert alert-danger"><i class="ace-icon fa fa-times"> Kullanıcı hesabı kilitlenmiş.</i></div>
			    				</c:when>
			    				<c:when test="${error == 'accountDisabled'}">
			    					<div class="alert alert-danger"><i class="ace-icon fa fa-times"> Kullanıcı hesabı aktif değil.</i></div>
			    				</c:when>
			    				<c:when test="${error == 'accessDenied'}">
			    					<div class="alert alert-danger"><i class="ace-icon fa fa-times"> Kullanıcı yetkili değil.</i></div>
			    				</c:when>
			    				<c:when test="${error == 'captchaIsWrong'}">
			    					<div class="alert alert-danger"><i class="ace-icon fa fa-times"> Captcha yanlış.</i></div>
			    				</c:when>
			    				<c:otherwise>
			    				</c:otherwise>
							</c:choose>		
							<!-- j_security_check ldap-->
							<!-- j_spring_security_check datasource -->
							<form action="<%=request.getContextPath()%>/j_spring_security_check" method="post">
								<fieldset>
									<label class="block clearfix">
										<span class="block input-icon input-icon-right">
											<input type="text" class="form-control" placeholder="Username" id="j_username" name="j_username"  />
											<i class="ace-icon fa fa-user"></i>
										</span>
									</label>
	
									<label class="block clearfix">
										<span class="block input-icon input-icon-right">
											<input type="password" class="form-control" placeholder="Password" id="j_password" name="j_password" />
											<i class="ace-icon fa fa-lock"></i>
										</span>
									</label>
									
									<div class="space"></div>
									
									<div class="clearfix">
										<button type="submit" class="width-35 pull-right btn btn-sm btn-primary">
											<i class="ace-icon fa fa-key"></i>
											<span class="bigger-110">Giriş</span>
										</button>
									</div>
	
									<div class="space-4"></div>
								</fieldset>
							</form>				
						</div><!-- /.widget-main -->
					</div><!-- /.widget-body -->
			     </div>
			  </div>
		</div>
     </div><!-- /.col -->
    </div><!-- /.row -->

