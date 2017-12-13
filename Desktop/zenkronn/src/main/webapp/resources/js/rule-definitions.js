$(document).ready(function() {

	$(document).on('change', 'input[name="check_all"]', function() {
		$('.idRow').prop("checked", this.checked);
	});
	
	
	$( "#reset" ).click(function() {
		$('#ruleName').val('');
		$('#compositeName').val('');
		$('#createdBy').val('');
		$('#actionSelect').val('');
		$('#startDate').val('');
		$('#endDate').val('');
	});

	$('form#searchForm').submit(function(e){
		$("#searchButton").prop("disabled", true).addClass("ui-state-disabled");
		$('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125" style="margin-right: 10px;"></i>').insertBefore('#searchButton');
	});


});

function deleteRuleDefinitions() {
	
	var selected = new Array();
	$("input:checkbox[name=checked]:checked").each(function() {
		selected.push($(this).val());
	});
	
	if (selected.length > 0) {
	
		var recordNumber = selected.length;
		$("#recordNumber").html(recordNumber);
		$("#dialog-form").dialog({
			title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Delete Rule Sets?</h4></div>",
			title_html: true,
			modal: true,
			position: { my: "center top+25%", at: "center top", of: window},
			buttons: [
				{
					html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete items",
					"class" : "btn btn-danger btn-xs",
					click: function() {
						$('#deleteRuleDefinitionIds').val(selected);
						document.getElementById("deleteRuleDefinitionsForm").submit();
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
