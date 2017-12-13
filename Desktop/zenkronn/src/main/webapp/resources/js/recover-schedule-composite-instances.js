$(document).ready(function() {

	$("#downloadExcelFileButton").click(function() {
		document.getElementById("downloadExcelFileForm").submit();
	});
	
	$("#suspendButton").click(function() {
		$("#mainForm").unbind('submit').submit();
		document.getElementById("suspendBatchJobForm").submit();
	});
	
	$("#resumeButton").click(function() {
		$("#mainForm").unbind('submit').submit();
		document.getElementById("resumeBatchJobDefinitionForm").submit();
	});

	$("#downloadModifiedExcelFileButton").click(function() {
		document.getElementById("downloadModifiedExcelFileForm").submit();
	});
	
	$(".daysOfWeekCKBox").click(function(){
		 var checkedVals = $('.daysOfWeekCKBox:checkbox:checked').map(function() {
			    return this.value;
		}).get();
		
		$("input[id=daysOfWeek]").val(checkedVals);
	});

	$("#approveJobButton").click(function() {

		$("#dialog-approve-form").dialog({
			height : 140,
			modal: true,
			position: { my: "center top+25%", at: "center top", of: window},
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Approve Job</h4></div>",
			title_html: true,
			
			buttons: [ 
						{
							text: "Approve",
							"class" : "btn btn-primary btn-xs",
							click: function() {
								//document.getElementById("approveJobForm").submit();
								var contextPath = $("#contextPath").val();
								var batchJobDefinitionId = $("#batchJobDefinitionId").val();
								var batchJobId = $("#batchJobId").val();
								$.ajax({
									type : "GET",
									url :  contextPath + "/views/recoverScheduleCompositeInstances?&action=approveJob&batchJobDefinitionId="+batchJobDefinitionId+"&batchJobId="+batchJobId,
									data : "",
									success : function(result) {
										window.location.href = contextPath + "/views/batchRecoverMonitoring?act=all";
									},
									error : function() {
										alert('Javascript Error!');
										console.log("Error");
									}
									
								});
							} 
						},
						{
							text: "Cancel",
							"class" : "btn btn-primary btn-xs",
							click: function() {
								$( this ).dialog( "close" ); 
							} 
						}
					]
		});
	});
	
	$("#batchJobInstanceInformationDialog").dialog({
		autoOpen : false,
		autoResize : true,
		modal: true,
		position: { my: "center top+25%", at: "center top", of: window},
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Instance Information</h4></div>",
		title_html: true,
		 width: 500,
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

});

function batchJobInstanceInformation(id) {
	var contextPath = $("#contextPath").val();

	$.ajax({
		type : "GET",
		url : contextPath + "/views/batchJobInstanceInformation/" + id,
		data : "",
		success : function(result) {
			
			var text = "";
			
			if(result == "")
			{
				text = "<div class='alert alert-danger align-center'><i class='ace-icon fa fa-times'></i>No information.</div>";
			}
			else
			{
				
				text = "<table class='table table-striped table-bordered table-hover'><thead><tr><th>Status</th><th>Count</th><th>Percentage</th></tr></thead><tbody>";
				
				for (var i = 0; i < result.length; i++) {
					var status = result[i].status;
					var count = result[i].count;
					var percentage = result[i].percentage;

					if (status == "1")
						status = "Not Started.";
					else if (status == "2")
						status = "Failed.";
					else if (status == "3")
						status = "Success.";
					else if (status == "4")
						status = "Suspended.";
					else if (status == "5")
						status = "Not Processed.";
					else if (status == "6")
						status = "Refaulted.";
					else
						status = "N/A";

					text = text + "<tr><td>" + status + "</td>"
							+ "<td>" + count + "</td>"
							+ "<td>" + percentage + "%</td></tr>";
				
				}
			}

			text = text + "</tbody></table>";
			$("#batchJobInstanceInformationDialog").dialog("open");
			$("#batchJobInstanceInformationDialog").html(text);
		},
		error : function() {
			alert("error");
		}
	});

}

