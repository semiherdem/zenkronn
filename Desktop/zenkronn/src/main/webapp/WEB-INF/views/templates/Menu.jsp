<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="java.util.List"%>
<%@page import="com.zenkronn.project.data.MenuDO"%>
<%@page import="javax.servlet.http.HttpServletRequest"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page pageEncoding="UTF-8" %>
<%

StringBuffer requestURL = (StringBuffer)request.getAttribute("requestURL");
String url = "";
if(requestURL != null)
{
	url = requestURL.toString();
}
	

%>

<c:set var="activeLink" value="<%=url %>" ></c:set>

<div class="sidebar responsive" id="sidebar">

	<div class="sidebar-shortcuts" id="sidebar-shortcuts"></div>
	<!-- /.sidebar-shortcuts -->

	<ul class="nav nav-list">
	

		<li id="Search" class="active open"><a href="#" class="dropdown-toggle"> <i
				class="menu-icon fa fa-caret-right"></i> <span class="menu-text">Menu</span>
				
		</a> <b class="arrow"></b>
			<ul class="submenu">
									<c:forEach var="searchMenuListData" varStatus="status"
						items="${searchMenuList}">
						<li <c:if test="${ fn:contains(activeLink, searchMenuListData.link) }">class='active'</c:if>><a
							href="<%=request.getContextPath()%>/${searchMenuListData.link}"> 
								<i class="menu-icon fa fa-caret-right"></i>
								${searchMenuListData.displayName}
						</a></li>
					</c:forEach>
				
			</ul></li>
		
	</ul>


</div>
<!-- /.sidebar -->


