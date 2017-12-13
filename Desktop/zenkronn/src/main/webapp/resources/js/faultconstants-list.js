$(document).on('change','input[name="check_all"]',function() {
    $('.idRow').prop("checked" , this.checked);
});


$(document).ready(function() {
	$( "#reset" ).click(function() {
		$('#fullErrorName').val('');
		$('#shortErrorName').val('');
	});
});
function deleteFaultConstants()
{
	var selected = new Array();
	$("input:checkbox[name=checked]:checked").each(function() {
		selected.push($(this).val());
	});
	
	if(selected.length > 0) {
		var recordNumber = selected.length;
		$("#recordNumber").html(recordNumber);
		$("#dialog-form").dialog({
			modal: true,
			position: { my: "center top+25%", at: "center top", of: window},
			title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Delete Fault Constant(s)?</h4></div>",
			title_html: true,
			buttons: [ 
				{
					html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete items",
					"class" : "btn btn-danger btn-xs",
					click: function() {
						$('#deleteFaultConstantIds').val(selected);
						document.getElementById("deleteFaultConstantsForm").submit();
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
