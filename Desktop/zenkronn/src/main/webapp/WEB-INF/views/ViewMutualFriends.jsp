<%@ page pageEncoding="UTF-8" %>
<%@page import="com.zenkronn.project.util.GeneralKeys"%>
<%@ include file="/resources/common/taglib.jsp"%>
<%@ taglib prefix="tg" tagdir="/WEB-INF/tags"%>


<div class="widget-box light-border transparent">
  		<div class="widget-body">
  		<div class="widget-main">
			<div class="row">
				<i class="fa fa-long-arrow-right" ></i> (${aplUserInfo.name} ${aplUserInfo.surname}) & (${memberInfo.name} ${memberInfo.surname})'s Mutual Friends. 
			</div>
		</div>
	</div>
</div>

<div class="table-header">
				<i class="ace-icon glyphicon glyphicon-list"></i> Friendship List
			</div>
			<table class="table table-striped table-bordered table-hover">
				<thead>
		      		<tr>
						<th>Name</th>
						<th>Surname</th>
						<th>Username</th>			
		      		</tr>
		      	</thead>
		      	<tbody>
		      		<c:forEach items="${mutualFriendsList}" var="item">
	      				<tr id="${item.id}">
							<td>${item.name}</td>
							<td>${item.surname}</td>
							<td>${item.username}</td>						
	      				</tr>
	      			</c:forEach>
		      	</tbody>
	      	</table>