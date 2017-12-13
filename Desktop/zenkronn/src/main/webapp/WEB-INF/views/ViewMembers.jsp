<%@ page pageEncoding="UTF-8" %>
<%@page import="com.zenkronn.project.util.GeneralKeys"%>
<%@ include file="/resources/common/taglib.jsp"%>
<%@ taglib prefix="tg" tagdir="/WEB-INF/tags"%>


<c:url value="/" var="pagedLink">
	<c:param name="action" value="list" />
	<c:param name="<%=GeneralKeys.PAGE_COUNT%>" value="~" />
	<c:param name="<%=GeneralKeys.PAGE_SIZE%>" value="*" />
	<c:param name="sortType" value="${sortType }" ></c:param>
	<c:param name="orderType" value="${orderType }" ></c:param>
</c:url>

<div class="table-header">
				<i class="ace-icon glyphicon glyphicon-list"></i> Friendship List
			</div>
			<table class="table table-striped table-bordered table-hover">
				<thead>
		      		<tr>
						<th>Name</th>
						<th>Surname</th>
						<th>Username</th>
						<c:choose>
							<c:when test="${sortType == 'asc'}">
								<th><a href="<%=request.getContextPath()%>/members?sortType=desc&orderType=friendshipDate" style="text-decoration:none;">Friendship Date</a></th>
							</c:when>
							<c:otherwise>
								<th><a href="<%=request.getContextPath()%>/members?sortType=asc&orderType=friendshipDate" style="text-decoration:none;">Friendship Date</a>
								<c:if test="${orderType == 'friendshipDate' }">
									&nbsp;&nbsp;<img src="<%=request.getContextPath()%>/resources/img/arrow_column_bot.gif" width="5" height="4" alt="" />
								</c:if>
								</th>								
								 									
							</c:otherwise>
						</c:choose>
						
						<th></th>
		      		</tr>
		      	</thead>
		      	<tbody>
		      		<c:forEach items="${membersList}" var="item">
	      				<tr id="${item.id}">
							<td>${item.name}</td>
							<td>${item.surname}</td>
							<td>${item.username}</td>
							<td><fmt:formatDate type = "both"  pattern='dd-MM-yyyy HH:mm' value = "${item.friendshipDate}" /></td>
							<td width="form-control">						
								<a href="<%=request.getContextPath()%>/members?act=removeSelectedMember&memberId=${item.id}" style="text-decoration:none;color: red"><i class="ace-icon glyphicon glyphicon-remove" data-rel="tooltip" data-placement="bottom" title="Remove"></i></a>							 
							</td>
	      				</tr>
	      			</c:forEach>
		      	</tbody>
	      	</table>
<tg:paging pagedLink="${pagedLink}" page="${page}" pageSize="${pageSize }" pagedListHolder="${membersList }" listSize="${listSize }" />