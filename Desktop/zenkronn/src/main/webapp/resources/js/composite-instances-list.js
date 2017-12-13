
function openStackTraceWindow(stackTraceWindowPath, id, domainName, revision, stackTraceContext, compositeName) {
	window.open(stackTraceWindowPath + domainName + "/" + compositeName + "%20[" + revision + "]&type=oracle_soa_composite&soaContext=" 
			+ stackTraceContext + "/" + id, "SOA eXpress", "width=800,height=600");
}

function openCompositeInstanceFaultsWindow(compositeInstanceFaultsWindowPath, domainName, compositeName, revision, soaContext) {
	window.open(compositeInstanceFaultsWindowPath + domainName + "/" + compositeName + "%20[" + revision + "]&type=oracle_soa_composite&soaContext=" + soaContext
			+ "&currentTab=faults", "SOA eXpress", "width=800,height=600");
}

function expand(ECID, id, contextPath, compositeInstanceState) {
	var state = $("#" + id + "state").val();

	$("#" + id + "icon").attr("src", contextPath + "/resources/img/page_lev_busy.gif");
	$("#" + id + "icon").attr('onclick', '').unbind('click');

	if (state == "expand") {
		$.ajax({
			type : "GET",
			url : contextPath + "/views/relatedCompositeInstancesByECID/"
					+ ECID,
			data : "",
			dataType : "json",
			success : function(result, textStatus, jqXHR) 
			{
				var resultString = "";

				for ( var i = 0; i < result.length; i++) 
				{
					var name = result[i].name;
					var instanceId = result[i].id;
					var state = result[i].state;
					var currentActionName = result[i].currentActionName;
					var parentId = result[i].parentId;
					var conversationId = result[i].conversationId;
					var ecid = result[i].ecid;
					var title = result[i].title;
					var dn = result[i].dn;
					var sourceType = result[i].sourceType;
					var currentActionType = result[i].currentActionType;
					var creationDate = result[i].creationDate;
					var modificationDate = result[i].modificationDate;
					var domainName = result[i].domainName;
					var stackTraceContext = result[i].stackTraceContext;
					var revision = result[i].revision;
					var soaContext = result[i].soaContext;
					var stackTraceWindowPath = result[i].stackTraceWindowPath;
					var compositeInstanceFaultsWindowPath = result[i].compositeInstanceFaultsWindowPath;
					var stateIconPath = result[i].stateIconPath;
					var toolTipText = result[i].toolTipText;
					var faultCode = result[i].faultCode;
					
					if(parentId != null)
					{
						resultString = resultString + "<tr id='" + id
							+ i + "'><td></td>" 
							+ "<td class='center'><img class='my-tooltip-link tooltip-info' src= '" +contextPath +"/resources/icon/childnode.png'/></td>"
							+ "<td><a onclick=\"openStackTraceWindow( '" + stackTraceWindowPath + "' , '" + instanceId + "' , '" + domainName + "' , '"
							+ revision + "' , '" + stackTraceContext + "' , '" + name + "' )\" href=\"#\" style=\"color: blue;\"  >" + instanceId + "</a></td><td>" + name
							+ "</td>";
		
						resultString = resultString + "<td class='center'><input type='image' class='my-tooltip-link tooltip-info' title = " + toolTipText + " src=\"" + contextPath
						+ "/resources/statusIcon/" + stateIconPath + "  \" /></td>";
		
						resultString = resultString
							+ "<td>" + creationDate + "</td>" + "<td>" + faultCode + "</td>"
							+ "<td>" + "<form method=\"get\" action = \"" + contextPath + "/componentInstancesList/\">" + "<input class='my-tooltip-link tooltip-info' type='hidden' name='compositeInstanceId' value='"
							+ instanceId + "' />" + "<input type=\"hidden\" name=\"act\" value=\"inMemoryPaging\" />"
							+ "<input class='my-tooltip-link tooltip-info' type='image' name='SelectButton' value=\" \" src=\"" + contextPath
							+ "/resources/img/application_cascade.png\" style=\"float: left;\" alt=\"Component Instance List\" />"
							+ "</form>" + "&nbsp;&nbsp;&nbsp;" + "<input class='my-tooltip-link tooltip-info' type=\"image\"  class=\"detailsButton\" value=\" \" src = \""
							+ contextPath + "/resources/img/information.png\" style=\"clear: both;\" alt=\"Details\" onclick=\"showCompositeInstanceDetails('"
							+ parentId + "', '" + conversationId + "', '" + ecid + "', '" + title + "', '"
							+ dn + "', '" + sourceType + "', '" + currentActionType + "', '" + creationDate + "', '" + modificationDate + "' )\" />&nbsp;&nbsp; " 
							+ "&nbsp;<input class='my-tooltip-link tooltip-info' type='image' src= '" +contextPath +"/resources/icon/page_go.png' title='Click to view input message.' onclick=\"displayInputMessage('"+id+"');\" />" + "</td></tr>";
					}

				}

				$("#" + id).after(resultString);
				$("#" + id + "size").val(result.length);
				$("#" + id + "icon").attr("src", contextPath + "/resources/icon/collapse.png");
				$("#" + id + "state").val("collapse");

				$("#" + id + "icon").bind(
				{
					click : function() {
						expand(ECID, id, contextPath, compositeInstanceState);
					}
				});
			},
			error : function() {
				alert('Hata Oluştu!');
				console.log("Error");
			}
		});
		} 
		else if (state == "collapse") 
		{
			var size = $("#" + id + "size").val();
			for ( var i = 0; i < size; i++) 
			{
				$("#" + id + i).remove();
			}

			$("#" + id + "size").val(0);
			$("#" + id + "icon").attr("src",contextPath + "/resources/icon/expand.png");
			$("#" + id + "state").val("expand");
			$("#" + id + "icon").bind({
				click : function() {
					expand(ECID, id, contextPath, compositeInstanceState);
					}
				});
		}
}

$(document).on('change', 'input[name="check_all"]', function() {
	$('.idRow').prop("checked", this.checked);
});

function purgeCompositeInstance() {
	var selected = new Array();
	$("input:checkbox[name=checked]:checked").each(function() {
		selected.push($(this).val());
	});

	if (selected.length > 0) {

		var recordNumber = selected.length;
		$("#recordNumber").html(recordNumber);
		$("#dialog-form").dialog(
		{
			modal: true,
			position: { my: "center top+25%", at: "center top", of: window},
			title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Delete Composite Instances?</h4></div>",
			title_html: true,
			buttons: [
				{
					html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete items",
					"class" : "btn btn-danger btn-xs",
					click: function() {
						$('#compositeInstanceIds').val(selected);
						document.getElementById("purgeCompositeInstancesForm").submit();
					} 
				},
				{
					html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; Cancel",
					"class" : "btn btn-xs",
					click: function() {
						$( this ).dialog( "close" );
					}
				}

			]
		});
	}

}

function displayFaultList(id) {
	var faultName = $("#faultName" + id).val();
	var faultType = $("#faultType" + id).val();
	var faultMessage = $("#faultMessage" + id).val();
	
	var resultString = "<table>"
			+ "<tr><th>Fault Name</th>"
			+ "<td>" + faultName + "</td>" + "</tr><tr><th>Fault Type</th>"
			+ "<td>" + faultType + "</td>" + "</tr><th colspan=\"2\">Fault Message</th></tr><tr>"
			+ "<td colspan=\"2\"><textarea class=\"form-control\" rows=\"15\" cols=\"140\">" + faultMessage + "</textarea></td>" + "</tr></table><br/><br/>";

	$("#displayFaultListDialog").dialog("open");
	$("#displayFaultListDialog").html(resultString);
}

function displayInputMessage(instanceId)
{

	var contextPath = $("#contextPath").val();
	$.ajax({
		type : "GET",
		url : contextPath
				+ "/views/inputMessage?instanceId="+ instanceId,
		data : "",
		success : function(result) 
		{
			var payloadMessage = result.payloadMessage;
			var dialog = $( "#inputMessageDialog" ).removeClass('hide').dialog({
				
		        width:'auto',
		        title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Input Message</h4></div>",
				title_html: true,
				modal: true,
				position: { my: "center top+25%", at: "center top", of: window},
				buttons: [ 
					{
						text: "OK",
						"class" : "btn btn-primary btn-xs",
						click: function() {
							$( this ).dialog( "close" ); 
						} 
					}
				]
			});
			
			$("#inputMessageTextArea").val(payloadMessage);
		},
		error : function() 
		{
			alert('Javascript Error!');
			console.log("Error" + instanceId);
			$(this).dialog("close");
		}
	});

}
