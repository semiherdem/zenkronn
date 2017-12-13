<%@tag import="org.w3c.dom.ls.LSInput"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ attribute name="pagedLink" required="true" type="java.lang.String"%>
<%@ attribute name="page" required="true" type="java.lang.Integer"%>
<%@ attribute name="pageSize" required="true" type="java.lang.Integer"%>
<%@ attribute name="pagedListHolder" required="true" type="java.util.List"%>
<%@ attribute name="listSize" type="java.lang.Integer"%>
<%@ attribute name="inMemorySorting" type="java.lang.Boolean"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<script>
	$(document).ready(function() {
		
		$("#pageCount").change(function() {
			var url = $("#pageCount").val();
			$(location).attr('href', url);

		});

	});
</script>


<%
	double totalPageDouble = (double)listSize.intValue() / pageSize.intValue();
	totalPageDouble = Math.ceil(totalPageDouble);
	Double d = new Double(totalPageDouble);
	int totalPage = d.intValue();
%>

<c:set value="<%=totalPage %>" var="totalPageVar" />

<div class="row">
	<div class="col-sm-8 align-right" style="right : 3%;">
		<!-- div class="center"-->
			<ul class="pagination">
				<c:choose>
					<c:when test="${listSize > 0 && page > 0}">
						<li>
							<a href="<%=pagedLink.replace("~", String.valueOf(0)).replace("*", String.valueOf(pageSize))%>">
								&lt;&lt;<!-- First -->
							</a>
						</li>
					</c:when>
					<c:otherwise>
						<li class="disabled">
							<a href="#">
								&lt;&lt;<!-- First -->
							</a>
						</li>
					</c:otherwise>
				</c:choose>
				<c:choose>
					<c:when test="${page > 0 }">
						<li>
							<a href="<%=pagedLink.replace("~", String.valueOf(page - 1)).replace("*", String.valueOf(pageSize))%>">
								&lt; <!-- Previous -->
							</a>
						</li>
					</c:when>
					<c:otherwise>
						<li class="disabled">
							<a href="#">
								&lt; <!-- Previous -->
							</a>
						</li>
					</c:otherwise>
				</c:choose>		
				<c:choose>
		   			<c:when test="${listSize > 0 }">
		      			<li>
							<a href="#">Page ${page + 1} / ${totalPageVar }</a>
						</li>
		   			</c:when>
		   			<c:otherwise>
		      			<li>
							<a href="#">Page ${page + 1}</a>
						</li>
		   			</c:otherwise>
				</c:choose>
				<c:choose>
					<c:when test="${fn:length(pagedListHolder) >= pageSize && (page + 1) != totalPageVar}">
						<li>
							<a href="<%=pagedLink.replace("~", String.valueOf(page + 1)).replace("*", String.valueOf(pageSize))%>">
								&gt; <!-- Next -->
							</a>
						</li>
					</c:when>
					<c:otherwise>
						<li class="disabled">
							<a href="#">
								&gt; <!-- Next -->
							</a>
						</li>
					</c:otherwise>
				</c:choose>
				<c:choose>
					<c:when test="${listSize > 0 && fn:length(pagedListHolder) >= pageSize && (page + 1) != totalPageVar}">
						<li>
							<c:choose>
								<c:when test="${inMemorySorting eq true }">
									<% 
										int value; 
										if( (listSize.intValue()/ pageSize.intValue()) * pageSize.intValue() == listSize.intValue())
										{
											value = (listSize / pageSize) -1;
										} 
										else 
										{
											value = listSize / pageSize;
										}
									%>
									<a href="<%=pagedLink.replace("~",String.valueOf(value)).replace("*", String.valueOf(pageSize))%>">
										&gt;&gt; <!-- Last -->
									</a>
								</c:when>
								<c:otherwise>
									<% 
										int value; 
										if( (listSize.intValue()/ pageSize.intValue()) * pageSize.intValue() == listSize.intValue())
										{
											value = (listSize / pageSize) -1;
										} 
										else 
										{
											value = listSize / pageSize;
										}
									%>
									<a href="<%=pagedLink.replace("~",String.valueOf(value)).replace("*", String.valueOf(pageSize))%>">
										&gt;&gt; <!-- Last -->
									</a>
								</c:otherwise>
							</c:choose>
						</li>
					</c:when>
					<c:otherwise>
						<li class="disabled">
							<a href="#">
								&gt;&gt; <!-- Last -->
							</a>
						</li>
					</c:otherwise>
				</c:choose>
			</ul>
			<ul style="list-style-type: none; margin-right: 13%;">
				<li>
					<c:if test="${listSize > 0}">
						<small>Total ${listSize} rows.</small>
					</c:if>
				</li>
			</ul>
			
		<!--/div--> <!-- center div -->
	</div>
	<div class="col-sm-4 align-right" style="margin: 20px 0;">
		<c:if test="${fn:length(pagedListHolder) > 0}">
			<select id="pageCount" name="mySelect" style="vertical-align: middle;" >
				<option disabled="disabled" value="<%=pagedLink.replace("~", String.valueOf(page)).replace("*", "10")%>" <% if(pageSize == 10){ %>selected="selected"<%} %> >10</option>
				<option disabled="disabled" value="<%=pagedLink.replace("~", String.valueOf(page)).replace("*", "30") %>" <% if(pageSize == 30){ %>selected="selected"<%} %> >30</option>
				<option value="<%=pagedLink.replace("~", String.valueOf(page)).replace("*", "100") %>" <% if(pageSize == 100){ %>selected="selected"<%} %> >100</option>
			</select> items/page
		</c:if>
	</div>
</div>








