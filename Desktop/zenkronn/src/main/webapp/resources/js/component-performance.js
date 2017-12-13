
function loadMediatorComponentActions(selectBox)
{
	var contextPath = $("#contextPath").val();
	var actionSelect = $('#actionSelect');
	actionSelect.empty();
	actionSelect.hide();
	actionSelect.append($('<option></option>').val('').html(''));
	$('<img id="loadingPane" src="'+contextPath+'"/resources/img/page_lev_busy.gif" style="margin-top: 3px;float: left;" />').insertBefore('#actionSelect');
	
	var componentName = selectBox.options[selectBox.selectedIndex].value;
	var formData = {componentName:componentName}; //Array 
	
	$.ajax({
	    url : contextPath + "/views/loadMediatorComponentActions",
	    type: "GET",
	    data : formData,
	    success: function(data, textStatus, jqXHR)
	    {
	    	$.each( data, function( key, value ) {
	    		actionSelect.append($('<option></option>').val(value).html(value));
	    	});
	    	actionSelect.show();
			$("#loadingPane").remove();
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	    	alert('Javascript Error!');
			console.log("Error");
	    }
	});
	
	
	

}