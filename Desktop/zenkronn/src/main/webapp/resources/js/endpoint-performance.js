
function loadEndpointNames(selectBox)
{
	var contextPath = $("#contextPath").val();
	var endpointNameSelect = $('#endpointNameSelect');
	var metricName = $('#metricName');
	endpointNameSelect.empty();
	endpointNameSelect.hide();
	var operationNameSelect = $("#operationNameSelect");
	operationNameSelect.empty();
	
	endpointNameSelect.append($('<option></option>').val('').html(''));
	$('<img id="loadingPaneEndPoint" src="'+contextPath+'"/resources/img/page_lev_busy.gif" style="margin-top: 3px;float: left;" />').insertBefore('#endpointNameSelect');
	$('<img id="loadingPaneMetricName" src="'+contextPath+'"/resources/img/page_lev_busy.gif" style="margin-top: 3px;float: left;" />').insertBefore('#metricName');
	
	var endpointMessageType = selectBox.options[selectBox.selectedIndex].value;
	var formData = {endpointMessageType:endpointMessageType}; //Array 
	
	$.ajax({
	    url : contextPath + "/views/loadEndpointNames",
	    type: "GET",
	    data : formData,
	    success: function(data, textStatus, jqXHR)
	    {
	    	$.each( data, function( key, value ) {
	    		endpointNameSelect.append($('<option></option>').val(value).html(value));
	    	});
	    	endpointNameSelect.show();
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	    	alert('Javascript Error!');
			console.log("Error");
	    }
	});
	
//	Metric name'i doldur.
	
	metricName.empty();
	metricName.append($('<option></option>').val('').html(''));
	if(endpointMessageType == 1 || endpointMessageType == 3)
	{
		metricName.append($('<option></option>').val('average').html('Average[sec]'));
		metricName.append($('<option></option>').val('minimum').html('Minimum[sec]'));
		metricName.append($('<option></option>').val('maximum').html('Maximum[sec]'));
		metricName.append($('<option></option>').val('count').html('Count'));
	}
	else if(endpointMessageType == 2 || endpointMessageType == 4)
	{
		metricName.append($('<option></option>').val('count').html('Count'));
	}
	
	$("#loadingPaneEndPoint").remove();
	$("#loadingPaneMetricName").remove();
	
}

function loadOperationNames(selectBox)
{
	var contextPath = $("#contextPath").val();
	var operationNameSelect = $('#operationNameSelect');
	operationNameSelect.empty();
	operationNameSelect.hide();
	
	operationNameSelect.append($('<option></option>').val('').html(''));
	$('<img id="loadingPane1" src="'+contextPath+'"/resources/img/page_lev_busy.gif" style="margin-top: 3px;float: left;" />').insertBefore('#operationNameSelect');
	
	var endpointName = selectBox.options[selectBox.selectedIndex].value;
	var endpointMessageType = $("#endpointMessageTypeList").val();
	var formData = {endpointName:endpointName, endpointMessageType:endpointMessageType}; //Array 
	
	$.ajax({
	    url : contextPath + "/views/loadOperationNames",
	    type: "GET",
	    data : formData,
	    success: function(data, textStatus, jqXHR)
	    {
	    	$.each( data, function( key, value ) {
	    		operationNameSelect.append($('<option></option>').val(value).html(value));
	    	});
	    	operationNameSelect.show();
			$("#loadingPane1").remove();
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	    	alert('Javascript Error!');
			console.log("Error");
	    }
	});
}
