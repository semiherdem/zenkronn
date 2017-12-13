$(document).ready(function() {
	
	$('form#searchForm').submit(function(e){
		$("#searchButton").prop("disabled", true).addClass("ui-state-disabled");
		$('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125" style="margin-right: 10px;"></i>').insertBefore('#searchButton');
	});

});
