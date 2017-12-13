$(document).ready(function() {
	
	$('form#searchForm').submit(function(e){
		$("#searchButton").prop("disabled", true).addClass("ui-state-disabled");
		$('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125" style="margin-right: 10px;"></i>').insertBefore('#searchButton');
	});

	$(document).on('change', 'input[name="check_all"]', function() {
		$('.idRow').prop("checked", this.checked);
	});
	
});

function recoverAllMessagesByFilter() {
	$("#act").val("recoverAllMessagesByFilter");
	document.getElementById("searchForm").submit();
}

function recoverSelectedMessages() {

	var selected = new Array();
	$("input:checkbox[name=checked]:checked").each(function() {
		selected.push($(this).val());
	});

	if (selected.length > 0) {
		$('#recoverSelectedMessageIdsForSchedule').val(selected);
		document.getElementById("recoverSelectedMessagesForm").submit();
	}
}