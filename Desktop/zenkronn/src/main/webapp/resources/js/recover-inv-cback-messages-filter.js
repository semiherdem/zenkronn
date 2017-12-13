$(document).ready(function() {
	
	$('#nextScheduleTime').datetimepicker({
		format: 'DD/MM/YYYY HH:mm'
	});

	$('#dailyTime').timepicker({
		minuteStep: 1,
		showMeridian: false
	}).next().on(ace.click_event, function(){
		$(this).prev().focus();
	});
	
	$('#weeklyTime').timepicker({
		minuteStep: 1,
		showMeridian: false
	}).next().on(ace.click_event, function(){
		$(this).prev().focus();
	});
	
	$(".daysOfWeekCKBox").click(function(){
		 var checkedVals = $('.daysOfWeekCKBox:checkbox:checked').map(function() {
			    return this.value;
		}).get();
		
		$("input[id=daysOfWeek]").val(checkedVals);
	});
});