$(document).ready(function() {	
	
	$('#datetimePickerStartDate').datetimepicker({
		 format: 'DD/MM/YYYY'
	});
	$('#datetimePickerStartDate1').datetimepicker({
		format: 'DD/MM/YYYY'
	});
	
	$('#damageReportStartDate').datetimepicker({
		format: 'DD/MM/YYYY'
	});
	
	$.mask.definitions['~']='[+-]';
	$('.input-mask-date').mask('99/99/9999');
	$('.input-mask-phone').mask('(999) 999-9999');
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title: function(title) {
			var $title = this.options.title || '&nbsp;'
			if( ("title_html" in this.options) && this.options.title_html == true )
				title.html($title);
			else title.text($title);
		}
	}));
	
});
