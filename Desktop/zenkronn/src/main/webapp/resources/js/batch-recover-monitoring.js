$(document).ready(function() {
	
	$('form#searchForm').submit(function(e)
	{
		$("#searchButton").prop("disabled", true).addClass("ui-state-disabled");
		$('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125" style="margin-right: 10px;"></i>').insertBefore('#searchButton');
	});
	
	$("#batchJobInstanceInformationDialog").dialog({
		autoOpen : false,
		autoResize : true,
		width : 400,
		modal: true,
		position: { my: "center top+25%", at: "center top", of: window},
		buttons : {
			Close : function() {
				$(this).dialog("close");
			}
		}
	});
	
	$( "#reset" ).click(function() 
	{
		$('#batchJobName').val('');
		$('#createdBy').val('');
		$('#approvedBy').val('');
		$('#batchJobEnvNameSelect').val('');
		$('#batchJobStatusSelect').val('');
		$('#startDate').val('');
		$('#endDate').val('');
	});

	$(document).on('change', 'input[name="check_all"]', function() {
		$('.idRow').prop("checked", this.checked);
	});

	$("#deleteButton").click(function() {
		var arrayOfStatus = new Array();

		var selected = new Array();
		$("input:checkbox[name=checked]:checked").each(function() {
			var value = $(this).val();
			selected.push(value);
		});

		for (var i = 0; i < selected.length; i++) 
		{
			var status = $("#batchJobTable #" + selected[i]).text().trim();
			arrayOfStatus[i] = $.trim(status);
		}

		if (arrayOfStatus.indexOf('Running.') > -1) 
		{
			$("#dialog-form-running").dialog({
				title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Delete Recovery Jobs</h4></div>",
				title_html: true,
				modal: true,
				position: { my: "center top+25%", at: "center top", of: window},
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
			
			return;
		}

		if(selected.length > 0) {
			var recordNumber = selected.length;
			$("#recordNumber").html(recordNumber);
			$("#dialog-form").dialog({
				modal: true,
				position: { my: "center top+25%", at: "center top", of: window},
				title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Delete Recovery Jobs?</h4></div>",
				title_html: true,
				buttons: [ 
					{
						html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete items",
						"class" : "btn btn-danger btn-xs",
						click: function() {
							$('#deleteBatchJobDefitionIds').val(selected);
							document.getElementById("deleteBatchJobDefinitionsForm").submit();
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
});

