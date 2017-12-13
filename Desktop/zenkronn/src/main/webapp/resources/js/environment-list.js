$(document).ready(function() {

	$('.dbConnTypeDirect').hide();
	$('.dbConnTypeDatasource').hide();

	$('#dbConnType').change(function() {

		var optionSelected = $(this).find("option:selected");
		var valueSelected = optionSelected.val();

		if (valueSelected == "DIRECT") {
			$('.dbConnTypeDirect').show();
			$('.dbConnTypeDatasource').hide();
		} else if (valueSelected == "DATASOURCE") {
			$('.dbConnTypeDatasource').show();
			$('.dbConnTypeDirect').hide();
		} else {
			$('.dbConnTypeDirect').hide();
			$('.dbConnTypeDatasource').hide();
		}

	});

	$("#createNewEnvironmentButton").click(function() {
		document.getElementById("createNewEnvironmentForm").submit();
	});

	$("#insertButton").click(function() {
		
		$("#insertButton").prop("disabled", true).addClass("ui-state-disabled");
		$('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125" style="margin-right: 10px;"></i>').insertBefore('#insertButton');
		
		var contextPath = $("#contextPath").val();
		var envName = $("#envName").val();
		var envDesc = $("#envDesc").val();
		var dbConnType = $("#dbConnType").val();
		var dbURL = $("#dbURL").val();
		var dbUser = $("#dbUser").val();
		var dbPassword = $("#dbPassword").val();
		var dbPasswordAgain = $("#dbPasswordAgain").val();
		var datasource = $("#datasource").val();
		var soaURL = $("#soaURL").val();
		var soaUser = $("#soaUser").val();
		var soaPassword = $("#soaPassword").val();
		var soaPasswordAgain = $("#soaPasswordAgain").val();
		var soaAdminURL = $("#soaAdminURL").val();
		var soaDomain = $("#soaDomain").val();
		var soaAdminServerName = $("#soaAdminServerName").val();
		var metricsEnabled = $('#metricsEnabled').is(':checked');
		var retryAction = $('#retryAction').val();
		var abortAction = $('#abortAction').val();
		var replayAction = $('#replayAction').val();
		var rethrowAction = $('#rethrowAction').val();
		var continueAction = $('#continueAction').val();
		var notificationInstanceLimit = $('#notificationInstanceLimit').val();
		var notificationEmails = $('#notificationEmails').val();
		var notificationInstanceLimitICM = $('#notificationInstanceLimitICM').val();
		var notificationEmailsICM = $('#notificationEmailsICM').val();
		var messageDelayTime = $('#messageDelayTime').val();
		var isDefault = $('#isDefault').is(':checked');
		
		if(metricsEnabled) metricsEnabled = 1;
		else metricsEnabled = 0;
		
		if(isDefault) isDefault = "TRUE";
		else isDefault = "FALSE";
		
		if(datasource == undefined) datasource = "";
		if(dbURL == undefined) dbURL = "";
		if(dbUser == undefined) dbUser = "";
		if(dbPassword == undefined) dbPassword = "";
		if(dbPasswordAgain == undefined) dbPasswordAgain = "";
		
		if ($.trim(dbPassword) != $.trim(dbPasswordAgain)) {
			alert("DB Password is not equal.");
			return;
		}
		if ($.trim(soaPassword) != $.trim(soaPasswordAgain)) {
			alert("SOA Password is not equal.");
			return;
		}
		var targetEnvNodeArray = new Array();
		$(".targetEnvNodeContainer").each(function(index) {
					var soaUrl = $("#soaUrl"+ this.id).val();
					var soaAdminServerName = $("#soaAdminServerName"+ this.id).val();
					targetEnvNodeArray[index] = soaUrl+ "**"+ soaAdminServerName;

		});
		
		if(targetEnvNodeArray.length <= 0){
			alert("Please Add At Least One Target Environment Node.");
			return;
		}

		$.ajax({
			type : "GET",
			url :  contextPath + "/views/insertEnvironment?&act=insert&envName="+envName+"&envDesc="+envDesc+
			"&dbConnType="+dbConnType+"&dbURL="+dbURL+"&dbUser="+dbUser+"&dbPassword="+dbPassword+"&dbPasswordAgain="+dbPasswordAgain+
			"&datasource="+datasource+"&soaURL="+soaURL+"&soaUser="+soaUser+"&soaPassword="+soaPassword+"&soaPasswordAgain="+soaPasswordAgain+
			"&metricsEnabled="+metricsEnabled+"&soaAdminURL="+soaAdminURL+"&soaDomain="+soaDomain+"&soaAdminServerName="+soaAdminServerName+"&targetEnvNodeArray="+targetEnvNodeArray+
			"&retryAction="+retryAction+"&abortAction="+abortAction+"&replayAction="+replayAction+"&rethrowAction="+rethrowAction+"&continueAction="+continueAction+
			"&notificationInstanceLimit="+notificationInstanceLimit+"&notificationEmails="+notificationEmails+"&notificationInstanceLimitICM="+notificationInstanceLimitICM+
			"&notificationEmailsICM="+notificationEmailsICM+"&messageDelayTime="+messageDelayTime+"&isDefault="+isDefault,
			data : "",
			success : function(result) {
				alertMessage(result);
			},
			error : function() {
				alert('Javascript Error!');
				console.log("Error");
			}
		});
		
		
	});
	
	$(document).on('change','input[name="check_all"]',function() {
		$('.idRow').prop("checked" , this.checked);
	});
	
	$("#deleteSelectedButton").click(function() {
		var contextPath = $("#contextPath").val();
		var selected = new Array();
		$("input:checkbox[name=checked]:checked").each(function() {
			selected.push($(this).val());
		});
		if(selected.length > 0) {
			var recordNumber = selected.length;
			$("#recordNumber").html(recordNumber);
			$("#dialog-delete-environment").dialog({
				modal: true,
				position: { my: "center top+25%", at: "center top", of: window},
				title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Delete Environment(s)?</h4></div>",
				title_html: true,
				buttons: [ 
					{
						html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete items",
						"class" : "btn btn-danger btn-xs",
						click: function() {
							$.ajax({
								type : "GET",
								url :  contextPath + "/views/environmentList?deleteEnvironmentIds="+selected+"&act=deleteSelectedEnvironments",
								data : "",
								success : function(result) {
									window.location.href = contextPath + "/views/environmentList?&act=all";
								},
								error : function() {
									alert('Javascript Error!');
									console.log("Error");
								}
							});
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
	});
	
	$(".updateTD #updateButton").click(function() {
		
		$(".updateTD #updateButton").prop("disabled", true).addClass("ui-state-disabled");
		$('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125" style="margin-right: 10px;"></i>').insertBefore('.updateTD #updateButton');
		
		var contextPath = $("#contextPath").val();
		var targetEnvId = $("#targetEnvId").val();
		var envName = $("#envName").val();
		var envDesc = $("#envDesc").val();
		var dbConnType = $("#dbConnType").val();
		var dbURL = $("#dbURL").val();
		var dbUser = $("#dbUser").val();
		var dbPassword = $("#dbPassword").val();
		var dbPasswordAgain = $("#dbPasswordAgain").val();
		var datasource = $("#datasource").val();
		var soaURL = $("#soaURL").val();
		var soaUser = $("#soaUser").val();
		var soaPassword = $("#soaPassword").val();
		var soaPasswordAgain = $("#soaPasswordAgain").val();
		var soaAdminURL = $("#soaAdminURL").val();
		var soaDomain = $("#soaDomain").val();
		var soaAdminServerName = $("#soaAdminServerName").val();
		var metricsEnabled = $('#metricsEnabled').is(':checked');
		var retryAction = $('#retryAction').val();
		var abortAction = $('#abortAction').val();
		var replayAction = $('#replayAction').val();
		var rethrowAction = $('#rethrowAction').val();
		var continueAction = $('#continueAction').val();
		var notificationInstanceLimit = $('#notificationInstanceLimit').val();
		var notificationEmails = $('#notificationEmails').val();
		var notificationInstanceLimitICM = $('#notificationInstanceLimitICM').val();
		var notificationEmailsICM = $('#notificationEmailsICM').val();
		var messageDelayTime = $('#messageDelayTime').val();
		var isDefault = $('#isDefault').is(':checked');
		
		if(metricsEnabled==true) metricsEnabled = 1;
		else metricsEnabled = 0;
		
		if(isDefault) isDefault = "TRUE";
		else isDefault = "FALSE";

		if(datasource == undefined) datasource = "";
		if(dbURL == undefined) dbURL = "";
		if(dbUser == undefined) dbUser = "";
		if(dbPassword == undefined) dbPassword = "";
		if(dbPasswordAgain == undefined) dbPasswordAgain = "";

		if ($.trim(dbPassword) != $.trim(dbPasswordAgain)) {
			alert("DB Password is not equal");
			return;
		}
		if ($.trim(soaPassword) != $.trim(soaPasswordAgain)) {
			alert("SOA Password is not equal");
			return;
		}
		
		var targetEnvNodeArray = new Array();
		$(".targetEnvNodeContainer").each(function(index) {
			var soaUrl = $("#soaUrl"+ this.id).val();
			var soaAdminServerName = $("#soaAdminServerName"+ this.id).val();
			var flag = $("#flag"+ this.id).val();
			targetEnvNodeArray[index] = soaUrl+ "**"+ soaAdminServerName+"**"+flag;

		});
		
		if(targetEnvNodeArray.length <= 0){
			alert("Please Add At Least One Target Environment Node.");
			return;
		}
		
		$.ajax({
			type : "GET",
			url :  contextPath + "/views/updateEnvironment?envId="+targetEnvId+"&act=updateEnvironment&envName="+envName+"&envDesc="+envDesc+
			"&dbConnType="+dbConnType+"&dbURL="+dbURL+"&dbUser="+dbUser+"&dbPassword="+dbPassword+"&dbPasswordAgain="+dbPasswordAgain+
			"&datasource="+datasource+"&soaURL="+soaURL+"&soaUser="+soaUser+"&soaPassword="+soaPassword+"&soaPasswordAgain="+soaPasswordAgain+
			"&metricsEnabled="+metricsEnabled+"&soaAdminURL="+soaAdminURL+"&soaDomain="+soaDomain+"&soaAdminServerName="+soaAdminServerName+"&targetEnvNodeArray="+targetEnvNodeArray+
			"&retryAction="+retryAction+"&abortAction="+abortAction+"&replayAction="+replayAction+"&rethrowAction="+rethrowAction+"&continueAction="+continueAction+
			"&notificationInstanceLimit="+notificationInstanceLimit+"&notificationEmails="+notificationEmails+"&notificationInstanceLimitICM="+notificationInstanceLimitICM+
			"&notificationEmailsICM="+notificationEmailsICM+"&messageDelayTime="+messageDelayTime+"&isDefault="+isDefault,
			data : "",
			success : function(result) {
				alertMessage(result);
			},
			error : function() {
				alert('Javascript Error!');
				console.log("Error");
			}
		});
		
		
	});
	
	$(".updateTD #cancelButton").click(function() 
	{
		var contextPath = $("#contextPath").val();
		window.location.href = contextPath + "/views/environmentList?&act=all";
	});
	
	$("#addNewTargetEnvNodeButton").click(function() 
	{
		var dialog = $( "#dialog-create-new-target-env-node" ).removeClass('hide').dialog({
		
	        width: 600,
	        title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Add New Node</h4></div>",
			title_html: true,
			modal: true,
			position: { my: "center top+25%", at: "center top", of: window},
			buttons: [ 
				{
					text: "Add",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						var soaUrl = $("#soaUrl").val();
						var soaAdminServerName = $("#soaAdminServerName").val();
						
						if($.trim(soaUrl) == "")
						{	
							alert("SOA Url is required.");
							return;
						}
						if($.trim(soaAdminServerName) == "")
						{
							alert("SOA Admin Server Name is required.");
							return;
						}
						addToList(soaUrl, soaAdminServerName);
						$(this).dialog("close");
						refresh();
					} 
				},
				{
					text: "Cancel",
					"class" : "btn btn-xs",
					click: function() {
						$( this ).dialog( "close" ); 
					} 
				}
			]
		});

		
	});
	
	$("#cancelButton").click(function() 
	{
		var contextPath = $("#contextPath").val();
		window.location.href = contextPath + "/views/environmentList?&act=all";
	});

	
});

function changeFlag(index){
	var contextPath = $("#contextPath").val();
	var imgSrc = $("#flagImage"+index).prop('src');
	
	if(imgSrc.indexOf("green") > 0 ){
		$("#flagImage"+index).hide();
		$("#reFlagImage"+index).show();
		$("#flag"+index).val('0');
	}
	else if(imgSrc.indexOf("red") > 0 ){
		$("#flagImage"+index).hide();
		$("#reFlagImage"+index).show();
		$("#flag"+index).val('1');
	}
		
}

function reChangeFlag(index){
	var contextPath = $("#contextPath").val();
	var imgSrc = $("#reFlagImage"+index).prop('src');
	
	if(imgSrc.indexOf("green") > 0 ){
		$("#flagImage"+index).show();
		$("#reFlagImage"+index).hide();
		$("#flag"+index).val('0');
	}
	else if(imgSrc.indexOf("red") > 0 ){
		$("#flagImage"+index).show();
		$("#reFlagImage"+index).hide();
		$("#flag"+index).val('1');
	}
		
}

function refresh(){
	$("#soaUrl").val("");
	$("#soaAdminServerName").val("");
}

function addToList(soaUrl, soaAdminServerName)
{
	
	var container = $("#targetEnvNodeList");
	var inputs = container.find(".targetEnvNodeContainer");
	var id = inputs.length;

	if (id > 0)
		id = $(".targetEnvNodeContainer").last().attr("id") + 1;

	if (container.attr("class") == "hiddentable") {
		container.attr("class", "");
	}
	
	$("<tr id=\""+ id + "\" class=\"targetEnvNodeContainer\"><td class='center'><input type='hidden' id='soaUrl"+ id+"' value='"+ soaUrl+ "' />"
		+ "<input type='hidden' id='soaAdminServerName"+id+"' value='"+ soaAdminServerName+"'/>"
		+ "<label class='position-relative'><input type = 'checkbox' id = '"+ id+ "' class = 'idRow ace' name = 'checked'  /><span class='lbl'></span></label></td>"
		+ "<td>" + soaUrl + "</td>" 
		+ "<td colspan='2'>"+ soaAdminServerName + "</td>" 
		+ "</tr>").insertBefore("#tablefooter");
}

function deleteSelectedNode() {

	var recordNumber = $('input:checkbox[name=checked]:checked').size();
	
	if(recordNumber > 0 ){
	
	$("#recordNumber").html(recordNumber);
	$("#dialog-delete-environment").dialog({
		modal: true,
		position: { my: "center top+25%", at: "center top", of: window},
		title_html: true,
		buttons: [ 		          		  
			{
				html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete items",
				"class" : "btn btn-danger btn-xs",
				click: function() {
					$("input:checkbox[name=checked]:checked").each(function() {
						var id = $(this).attr("id");
						$("#" + id).empty();
						$("#" + id).remove();
					});
					$('input[name=check_all]').attr('checked', false);
					$(this).dialog("close");
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

function alertMessage(result) {
	var contextPath = $("#contextPath").val();

	if (result == "Success") 
	{
		$("#dialog-message-success").dialog(
		{
			modal: true,
			position: { my: "center top+25%", at: "center top", of: window},
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Success</h4></div>",
			title_html: true,
			buttons: [ 
				{
					text: "OK",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						window.location.href = contextPath + "/views/environmentList?&act=all";
					} 
				}
			]
		});
	} 
	else 
	{
		$("#failureMessage").html(result + " Failure, please try again later.");	
		$("#dialog-message-error").dialog({
			modal: true,
			position: { my: "center top+25%", at: "center top", of: window},
			title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Error</h4></div>",
			title_html: true,
			buttons: [
						{
							text: "Close",
							"class" : "btn btn-danger btn-xs",
							click: function() {
								window.location.href = contextPath + "/views/environmentList?&act=all"; 
							} 
						}
					]
		});
	}

}