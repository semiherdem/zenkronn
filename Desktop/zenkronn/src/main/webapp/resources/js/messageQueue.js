$(document).ready(function(){
	
	$(document).on('change','input[name="check_all"]',function() {
		$('.idRow').prop("checked" , this.checked);
	});
	
	$("#createMessageQueueButton").click(function() {
		document.getElementById("createMessageQueueForm").submit();
	});
	
	$("#insertButton").click(function() {
		document.getElementById("createNewMessageQueueForm").submit();
	});
	
	$("#updateButton").click(function() {
		document.getElementById("updateMessageQueueForm").submit();
	});
	
	$("#cancelButton").click(function() 
	{
		var contextPath = $("#contextPath").val();
		window.location.href = contextPath + "/views/messageQueueList?&act=all";
	});
	
	$("#deleteSelectedButton").click(function() {
		var selected = new Array();
		$("input:checkbox[name=checked]:checked").each(function() {
			selected.push($(this).val());
		});
		if(selected.length > 0) {
			var recordNumber = selected.length;
			$("#recordNumber").html(recordNumber);
			$("#dialog-delete-messageQueue").dialog({
				modal: true,
				position: { my: "center top+25%", at: "center top", of: window},
				title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Delete Message Queue(s)?</h4></div>",
				title_html: true,
				buttons: [ 
					{
						html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete items",
						"class" : "btn btn-danger btn-xs",
						click: function() {
							$('#deleteSelectedMessageQueue').val(selected);
							document.getElementById("deleteMessageQueueForm").submit();
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
	
	$("#dialog-form").dialog({
		autoOpen : false,
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Send Message To Queue</h4></div>",
		title_html: true,
		width : 800,
		modal: true,
		position: { my: "center top+25%", at: "center top", of: window},
		buttons: [ 
			{
				text: "Send",
				"class" : "btn btn-primary btn-xs",
				click: function() {
					var contextPath = $("#contextPath").val();

					$(":button:contains('Save')").prop("disabled", true).addClass("ui-state-disabled");

					$('<img id="loadingPane" src="'+ contextPath+ '/resources/img/page_lev_busy.gif" style="margin-top: 3px;float: left;" />').insertBefore('.ui-dialog-buttonset > button:first');

					var textMessage = $('textarea#textMessage').val();
					var queueId = $("#queueId").val();
					
						$.ajax({
							type : "GET",
							url : contextPath
									+ "/views/sendMessageToQueue?textMessage="+ textMessage +"&queueId="+queueId,
							data : "",
							success : function(result) 
							{
								if(result == "Success")
								{
									$( "#SuccessTable" ).show();
								}
								else
								{
									$( "#ErrorTable" ).show();
								}
								$("#loadingPane").remove();
								$(":button:contains('Save')").prop("disabled",false).removeClass("ui-state-disabled");
							},
							error : function() 
							{
								alert('Javascript Error!');
								console.log("Error");
								$(this).dialog("close");
							}
						});
						// $(this).dialog("close");
				} 
			},
			{
				html: "Cancel",
				"class" : "btn btn-xs",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		],
		close : function() 
		{
			$(this).dialog("close");
		}
	});
	
	$( "#textMessage" ).click(function() {
		$( "#SuccessTable" ).hide();
		$( "#ErrorTable" ).hide();
	});

	
});


function openPopUp(id)
{
	$('#queueId').val(id);
	$('textarea#textMessage').val('');
	$( "#SuccessTable" ).hide();
	$( "#ErrorTable" ).hide();
	$("#dialog-form").dialog("open");
}