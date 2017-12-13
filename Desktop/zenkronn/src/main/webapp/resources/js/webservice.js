$(document).ready(function(){
	
	$("#createWebServiceButton").click(function() {
		document.getElementById("createWebServiceForm").submit();
	});
	
	$('#nextScheduleTime').datetimepicker({
		format: 'DD/MM/YYYY HH:mm'
	});
	
	$("#insertButton").click(function() 
	{
		var contextPath = $("#contextPath").val();
		var operationName = $("#operationName option:selected").val();
		$("#insertButton").prop("disabled", true).addClass("ui-state-disabled");
		$('<i id="spinner" class="ace-icon fa fa-spinner fa-spin orange bigger-125" style="margin-right: 10px;"></i>').insertBefore('#insertButton');
		$.ajax({
			type : "POST",
			url :  contextPath + "/views/addWebService?&act=insertWebService&operationName="+operationName,
			data : "",
			success : function(result) {
				$("#insertButton").prop("disabled",false).removeClass("ui-state-disabled");
				$( "#spinner" ).remove();
				alertMessage(result);
			},
			error : function() {
				alert('Javascript Error!');
				console.log("Error");
			}
		});
		
	});
	
	$("#cancelButton").click(function() 
	{
		var contextPath = $("#contextPath").val();
		window.location.href = contextPath + "/views/webServiceList?&act=all";
	});
	
	$("#cancelButton.mybutton").click(function() 
	{
		var contextPath = $("#contextPath").val();
		window.location.href = contextPath + "/views/webServiceList?&act=all";
	});
	
	$(document).on('change','input[name="check_all"]',function() {
		$('.idRow').prop("checked" , this.checked);
	});
	
	$("#deleteSelectedButton").click(function() {
		var selected = new Array();
		$("input:checkbox[name=checked]:checked").each(function() {
			selected.push($(this).val());
		});
		if(selected.length > 0) {
			var recordNumber = selected.length;
			$("#recordNumber").html(recordNumber);
			$("#dialog-delete-webservices").dialog({
				modal: true,
				position: { my: "center top+25%", at: "center top", of: window},
				title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Delete Web Service(s)?</h4></div>",
				title_html: true,
				buttons: [ 
					{
						html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete items",
						"class" : "btn btn-danger btn-xs",
						click: function() {
							$('#deleteSelectedWebService').val(selected);
							document.getElementById("deleteWebServiceForm").submit();
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
									window.location.href = contextPath + "/views/webServiceList?&act=all";
								} 
							}
						]
			});
			
		} 
		else 
		{
			$('#errorMessage').text(result);
			$("#dialog-message-error").dialog({
				modal : true,
				title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Error</h4></div>",
				title_html: true,
				position: { my: "center top+25%", at: "center top", of: window},
				buttons: [
							{
								text: "Close",
								"class" : "btn btn-danger btn-xs",
								click: function() {
									$(this).dialog("close");
								} 
							}
						]
			});
			
		}

	}
	
});