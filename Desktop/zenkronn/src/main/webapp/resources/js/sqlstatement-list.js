$(document).ready(function() {
	
	$(document).on('change','input[name="check_all"]',function() {
		$('.idRow').prop("checked" , this.checked);
	});
	
	$("#createNewSqlStatementButton").click(function() {
		document.getElementById("createNewSqlStatementForm").submit();
	});
	
	$("#cancelButton").click(function() 
	{
		var contextPath = $("#contextPath").val();
		window.location.href = contextPath + "/views/sqlStatement?&act=all";
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
			$("#dialog-delete-sqlStatement").dialog(
			{
				modal: true,
				position: { my: "center top+25%", at: "center top", of: window},
				title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Delete SQL Statement(s)?</h4></div>",
				title_html: true,
				buttons: [ 
					{
						html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete items",
						"class" : "btn btn-danger btn-xs",
						
						click: function() {
							$('#deleteSelectedSqlStatements').val(selected);
							document.getElementById("deleteSqlStatementsForm").submit();
						} 
					}
					,
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
	
	$("#validateButton").click(function() 
	{
		$('#act').val("validateStatement");
		document.getElementById("statementForm").submit();
	});
	
	$("#insertButton").click(function() 
	{
		document.getElementById("addSqlStatementForm").submit();
	});
	
	$("#testButton").click(function() 
	{
		var paramListSize = $("#paramListSize").val();
		$("#act").val("testStatement");
		var typeList = new Array();
		var testValueList = new Array();

		for (var i = 0; i < paramListSize; i++) 
		{
			var type = $("#typeListSelect"+i+" option:selected").val();
			var testValue = $("#testValue"+i).val();
			typeList.push(type);
			testValueList.push(testValue);
		}
		$("#typeList").val(typeList);
		$("#testValueList").val(testValueList);
		document.getElementById("testStatementForm").submit();
	});
});