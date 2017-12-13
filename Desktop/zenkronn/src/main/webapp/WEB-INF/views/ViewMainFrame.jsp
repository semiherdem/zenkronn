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

<div class="widget-box light-border transparent">
  		<div class="widget-body">
  		<div class="widget-main">
			<div class="row">
				<i class="fa fa-long-arrow-right" ></i> ZENKRONN
			</div>
		</div>
	</div>
</div>


<div class="table-header">
				<i class="ace-icon glyphicon glyphicon-list"></i> Members List
			</div>
			<table class="table table-striped table-bordered table-hover">
				<thead>
		      		<tr>
						<th>Name</th>
						<th>Surname</th>					
						<th class="col-md-2">Add & Remove</th>
						<th>Mutual Friends</th>
		      		</tr>
		      	</thead>
		      	<tbody>
		      		<c:forEach items="${membersList}" var="item">
	      				<tr id="${item.id}">
							<td>${item.name}</td>
							<td>${item.surname}</td>							
							<td width="form-control">
								<c:choose>
									  <c:when test="${item.inList == false}">
									    <a href="<%=request.getContextPath()%>?act=addToFriendshipList&memberId=${item.id}" style="text-decoration:none;"><i class="ace-icon glyphicon glyphicon-plus" data-rel="tooltip" data-placement="bottom" title="Add"></i></a>
									  </c:when>
									 <c:otherwise>
										<a href="<%=request.getContextPath()%>?act=removeSelectedMember&memberId=${item.id}" style="text-decoration:none;color: red"><i class="ace-icon glyphicon glyphicon-remove" data-rel="tooltip" data-placement="bottom" title="Remove"></i></a>							 
									 </c:otherwise>
								</c:choose>
								
							</td>
							<td>
								<a href="<%=request.getContextPath()%>/mutualFriends?memberId=${item.id}" style="text-decoration:none;"><input class="my-tooltip-link tooltip-info pull-left" type="image" name="SelectButton" value=" " src="<%=request.getContextPath()%>/resources/img/application_cascade.png" title="Click to show mutual friends." /></a>			
							</td>
	      				</tr>
	      			</c:forEach>
		      	</tbody>
	      	</table>
<tg:paging pagedLink="${pagedLink}" page="${page}" pageSize="${pageSize }" pagedListHolder="${membersList }" listSize="${listSize }" />