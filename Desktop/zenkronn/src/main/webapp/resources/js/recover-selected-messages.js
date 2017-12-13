$(document).ready(function() {

	$('#scheduleDate').datetimepicker({
		 format: 'DD/MM/YYYY HH:mm'
	});
	
	$("#scheduleJobButton").click(function() {
		var name = $("#name").val();
		var desc = $("#desc").val();
		var operation = "";
		var selected = $("input[type='radio'][name='operation']:checked");
		if (selected.length > 0) 
		{
			operation = selected.val();
		}
		var scheduleDate = $("#scheduleDate").val();
		var contextPath = $("#contextPath").val();
		var recoverSelectedMessageIdsForSchedule = $("#recoverSelectedMessageIdsForSchedule").val();
		
		$.ajax({
			type : "GET",
			url :  contextPath + "/views/recoverSelectedMessages?&act=recoverSelectedMessages&name="+name+"&desc="+desc+"&operation="+operation+"&scheduleDate="+scheduleDate+
			"&recoverSelectedMessageIdsForSchedule="+recoverSelectedMessageIdsForSchedule,
			data : "",
			success : function(result) 
			{
				window.location.href = contextPath + "/views/batchRecoverMonitoring?act=all";
			},
			error : function() 
			{
				alert('Javascript Error!');
				console.log("Error");
			}
			
		});
		
	});
});