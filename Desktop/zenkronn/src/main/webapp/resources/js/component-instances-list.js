$(document).ready(function()
{
	$('form#searchForm').submit(function(e){
		$("#searchButton").prop("disabled", true).addClass("ui-state-disabled");
		$('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125" style="margin-right: 10px;"></i>').insertBefore('#searchButton');
	});
	
	$("#fault").dialog(
	{
		autoOpen : false,
		autoResize : true,
		modal: true,
		position: { my: "center top+25%", at: "center top", of: window},
		width : 740,
		height : 320,
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Fault List</h4></div>",
		title_html: true,
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
	
	$( "#reset" ).click(function() {
		$('#compositeInstanceId').val('');
		$('#compositeName').val('');
		$('#startDate').val('');
		$('#endDate').val('');
		$('#implType').val('');
		$('#state').val('');
		$('#faultName').val('');
		$('#faultMessage').val('');
	});
});

function getFaultList(implType, id, contextPath) 
{
	
	if(implType == "bpel")
	{
		var resultString = "";

		$.ajax({
			type: "GET",
			url: contextPath + "/views/bpelComponentInstanceFault/" + id,
			data: "",
			dataType: "json",
			success: function(result, textStatus, jqXHR)
			{
				for (var i = 0; i < result.length; i++)
				{
					var faultName = result[i].faultName;
					var faultMessage = result[i].faultMessage;
					var faultType = result[i].faultType;

					resultString = resultString + "<table>" +
						"<tr><th>Fault Name</th>" +
						"<td>" + faultName + "</td>" +
						"</tr><tr><th>Fault Type</th>" +
						"<td>" + faultType + "</td>" +
						"</tr><th colspan=\"2\">Fault Message</th></tr><tr>" +
						"<td colspan=\"2\"><textarea class='form-control' rows=\"15\" cols=\"140\">" + faultMessage + "</textarea></td>" +
						"</tr></table><br/><br/>";
				}
				
				if(resultString == ""){
					resultString = resultString + "<div class='alert alert-danger align-center'><i class='ace-icon fa fa-times'>No fault.</i></div>"; 
				}
				
				$("#fault").dialog("open");
				$("#fault").html(resultString);

			},
			error: function()
			{
				alert('Error occurred, cannot complete request!');
				console.log("Error");
			}
		});
	}
	else if (implType == "mediator")
	{
		var resultString = "";

		$.ajax({
			type: "GET",
			url: contextPath + "/views/mediatorComponentInstanceFault/" + id,
			data : "",
			dataType : "json",
			success : function(result, textStatus, jqXHR)
			{
				for (var i = 0; i < result.length; i++)
				{
					var faultName = result[i].faultName;
					var faultMessage = result[i].faultMessage;
					var faultType = result[i].faultType;

					resultString = resultString + "<table>" +
						"<tr><th>Fault Name</th>" +
						"<th>" + faultName + "</th>" +
						"</tr><tr><th>Fault Type</th>" +
						"<td>" + faultType + "</td>" +
						"</tr><th colspan=\"2\">Fault Message</th></tr><tr>" +
						"<td colspan=\"2\"><textarea class='form-control' rows=\"15\" cols=\"140\">" + faultMessage + "</textarea></td>" +
						"</tr></table><br/><br/>";
				}
				
				if(resultString == ""){
					resultString = resultString + "<div class='alert alert-danger align-center'><i class='ace-icon fa fa-times'>No fault.</i></div>"; 
				}
				$("#fault").dialog("open");
				$("#fault").html(resultString);
				
			},
			error : function()
			{
				alert('Error occurred, cannot complete request!');
				console.log("Error");
			}
		});
	}
}

function openStackTraceWindow(stackTraceWindowPath, id, domainName, revision, stackTraceContext, compositeName){ 
	window.open(stackTraceWindowPath+domainName+"/"+compositeName+"%20["+revision+"]&type=oracle_soa_composite&soaContext="+stackTraceContext+"/"+id, "SOA eXpress","width=800,height=600");
}