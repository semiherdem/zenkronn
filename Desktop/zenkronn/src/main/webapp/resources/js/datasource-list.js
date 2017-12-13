$(document).ready(function() {

	$(document).on('change','input[name="check_all"]',function() {
		$('.idRow').prop("checked" , this.checked);
	});
	
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
	
	$("#cancelButton").click(function() 
	{
		var contextPath = $("#contextPath").val();
		window.location.href = contextPath + "/views/datasourceList?&act=all";
	});
	
	$("#createNewDatasourceButton").click(function() {
		document.getElementById("createNewDatasourceForm").submit();
	});
	
	$("#insertButton").click(function() {
		
		$("#insertButton").prop("disabled", true);
		$('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125" id="spinnerButton" style="margin-right: 10px;"></i>').insertBefore('#insertButton');
		
		var contextPath = $("#contextPath").val();
		var name = $("#name").val();
		var description = $("#description").val();
		var dbConnType = $("#dbConnType").val();
		var dbURL = $("#dbURL").val();
		var dbUser = $("#dbUser").val();
		var dbPassword = $("#dbPassword").val();
		var dbPasswordAgain = $("#dbPasswordAgain").val();
		var jndiName = $("#jndiName").val();

		if(dbConnType == "")
		{
			alert("Please select connection type.");
			return;
		}
		
		if(jndiName == undefined) jndiName = "";
		if(dbURL == undefined) dbURL = "";
		if(dbUser == undefined) dbUser = "";
		if(dbPassword == undefined) dbPassword = "";
		if(dbPasswordAgain == undefined) dbPasswordAgain = "";
		
		if ($.trim(dbPassword) != $.trim(dbPasswordAgain)) 
		{
			alert("DB Password is not equal.");
			return;
		}
		
		$.ajax({
			type : "GET",
			url :  contextPath + "/views/addDatasource?act=addDatasource&name="+name+"&description="+description+
			"&dbConnType="+dbConnType+"&dbURL="+dbURL+"&dbUser="+dbUser+"&dbPassword="+dbPassword+"&dbPasswordAgain="+dbPasswordAgain+
			"&jndiName="+jndiName,
			data : "",
			success : function(result) {
				$("#insertButton").removeAttr("disabled");
				$( "#spinnerButton" ).remove();
				alertMessage(result);
			},
			error : function() {
				alert('Javascript Error!');
				console.log("Error");
			}
		});
		
		
	});
	
	$("#updateButton").click(function() {
	
		$("#updateButton").prop("disabled", true);
		$('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125" id="spinnerButton" style="margin-right: 10px;"></i>').insertBefore('#updateButton');
		
		var contextPath = $("#contextPath").val();
		var id = $("#id").val();
		var name = $("#name").val();
		var description = $("#description").val();
		var dbConnType = $("#dbConnType").val();
		var dbURL = $("#dbURL").val();
		var dbUser = $("#dbUser").val();
		var dbPassword = $("#dbPassword").val();
		var dbPasswordAgain = $("#dbPasswordAgain").val();
		var jndiName = $("#jndiName").val();

		if(dbConnType == "")
		{
			alert("Please select connection type.");
			return;
		}
		
		if(jndiName == undefined) jndiName = "";
		if(dbURL == undefined) dbURL = "";
		if(dbUser == undefined) dbUser = "";
		if(dbPassword == undefined) dbPassword = "";
		if(dbPasswordAgain == undefined) dbPasswordAgain = "";
		
		if ($.trim(dbPassword) != $.trim(dbPasswordAgain)) 
		{
			alert("DB Password is not equal.");
			return;
		}
		
		$.ajax({
			type : "GET",
			url :  contextPath + "/views/updateDatasource?act=updateDatasource&name="+name+"&description="+description+
			"&dbConnType="+dbConnType+"&dbURL="+dbURL+"&dbUser="+dbUser+"&dbPassword="+dbPassword+"&dbPasswordAgain="+dbPasswordAgain+
			"&jndiName="+jndiName+"&id="+id,
			data : "",
			success : function(result) {
				$("#updateButton").removeAttr("disabled");
				$( "#spinnerButton" ).remove();
				alertMessage(result);
			},
			error : function() {
				alert('Javascript Error!');
				console.log("Error");
			}
		});
	
	});
	
	$("#deleteSelectedButton").click(function() {
		var selected = new Array();
		$("input:checkbox[name=checked]:checked").each(function() {
			selected.push($(this).val());
		});
		if(selected.length > 0) {
			var recordNumber = selected.length;
			$("#recordNumber").html(recordNumber);
			$("#dialog-delete-datasource").dialog({
				modal: true,
				position: { my: "center top+25%", at: "center top", of: window},
				title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Delete Datasource?</h4></div>",
				title_html: true,
				buttons: [ 
					{
						html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete items",
						"class" : "btn btn-danger btn-xs",
						click: function() {
							$('#deleteDatasourceIds').val(selected);
							document.getElementById("deleteDatasourcesForm").submit();
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
		if (result == "Success") {
			$("#dialog-message-success").dialog({
				autoSize : true,
				modal: true,
				position: { my: "center top+25%", at: "center top", of: window},
				title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Success</h4></div>",
				title_html: true,
				buttons: [
					{
						text: "Ok",
						"class" : "btn btn-primary btn-xs",
						click: function() {
							window.location.href = contextPath + "/views/datasourceList?&act=all";
						} 
					}
				]

			});
		} else {
			$("#ErrorTable").show();
			$("#ErrorMessage").text(result);
			$("#dialog-message-error").dialog({
				autoSize : true,
				modal: true,
				position: { my: "center top+25%", at: "center top", of: window},
				title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Error</h4></div>",
				title_html: true,
				buttons: [
					{
						text: "Close",
						"class" : "btn btn-danger btn-xs",
						click: function() {
							$( this ).dialog( "close" ); 
						} 
					}
				]
			});
		}

	}
	
	
});