$(document).ready(function() {
	
	$("#variableValueTable").hide();
	$("#mappingValueTable").hide();
	$("#variableTree").hide();
	$("#cblist").hide();
	$("#mappingListTable").hide();

	$("#variableNames").on("change",function() {
		var variableName = $("#variableNames").val();
		var instanceId = $("#sampleInstanceId").val();
		var details = $("#details").val();
		var ruleDefinitionId = $("#ruleDefinitionId")
				.val();
		$('#variableValue').val("");
		generateTree(instanceId, variableName, details,ruleDefinitionId);
		if (variableName == "") 
		{
			//$("#variableTree").attr("class","hiddentable");
			$("#variableTree").hide();
			//$("#variableValueTable").attr("class","hiddentable");
			$("#variableValueTable").hide();
		} 
		else
			//$("#variableTree").attr("class","borderless");
			$("#variableTree").show();
		
		refreshValues();
	});

	$("#saveButton").click(function() {
		var selectedNode = $("#selectedNode").text();
		var variable = $("#variableNames option:selected").text();
		var variableType = $("#variableTypes option:selected").val();
		var variableTypeText = $("#variableTypes option:selected").text();

		if (selectedNode != null && $.trim(selectedNode) != "" && variableType != null && $.trim(variableType) != "") 
		{
			addNodeToList(selectedNode,variableType, variable,variableTypeText);
		} 
		else 
		{
			alert("Enter a value");
		}
		refreshValues();
	});
	

	function addNodeToList(selectedNode, variableType,variable, variableTypeText) {
		$('#cblist').show();
		var container = $("#cblist");

		var inputs = container.find(".ruleContainer");
		var id = inputs.length;

		if (id > 0)
			id = $(".ruleContainer").last().attr("id") + 1;

		if (container.attr("class") == "hiddentable") {
			container.attr("class", "");
		}

		$("<tr id=\""+ id + "\" class=\"ruleContainer\"><td class='center'>"
				+ "<input type='hidden' name='selectedNode' id='selectedNode"+ id + "' value='"+ selectedNode+ "' />"
				+ "<input type='hidden' name='variableType' id='variableType"+ id+ "' value='"+ variableType+ "' />"
				+ "<input type='hidden' name='variable' id='variable"+ id+ "' value='"+ variable+ "' />"
				+ "<input type='hidden' name='path' id='path"+ id+ "' value='generatePath' />"
				+ "<label class='position-relative'><input type = 'checkbox' id = '"+ id+ "' class = 'idRow ace' name = 'checked'  /><span class='lbl'></span></label></td>"
				+ "<td>" + variable + "</td>" + "<td>"+ selectedNode + "</td>" + "<td>"
				+ variableTypeText + "</td></tr>").insertBefore("#tablefooter");
		
		//$("#variableValueTable").attr("class", "hiddentable");
		$("#variableValueTable").hide();
	}
	
	$("#addMappingAttrButton").click(function() {
		
		var variable = $("#variableNames option:selected").text();
		var mappingSelectedNode = $("#mappingSelectedNode").text();
		var sqlStatementParam =  $("#mappingSelect option:selected").text();
		addMappingNodeToList(variable, mappingSelectedNode, sqlStatementParam);
	});
	
	function addMappingNodeToList(variable, mappingSelectedNode, sqlStatementParam)
	{
		
		$('#mappingListTable').show();
		var container = $("#mappingListTable");

		var inputs = container.find(".mappingRuleContainer");
		var id = inputs.length;

		if (id > 0)
			id = $(".mappingRuleContainer").last().attr("id") + 1;

		if (container.attr("class") == "hiddentable") {
			container.attr("class", "");
		}
		
		$("<tr id=\""+ id + "\" class=\"mappingRuleContainer\"><td class='center'>"
				+ "<input type='hidden' name='mappingSelectedNode' id='mappingSelectedNode"+ id+ "' value='"+ mappingSelectedNode+ "' />"
				+ "<input type='hidden' name='sqlStatementParam' id='sqlStatementParam" + id + "' value='" + sqlStatementParam + "' />"
				+ "<input type='hidden' name='mappingVariable' id='mappingVariable"+ id + "' value='"+ variable + "' />"
				+ "<input type='hidden' name='path' id='path"+ id + "' value='generatePath' />"
				+ "<label class='position-relative'><input type = 'checkbox' id = '"+ id + "' class = 'idRow ace' name = 'checked'  /><span class='lbl'></span></label></td>"
				+ "<td>" + variable + "</td>" 
				+ "<td>" + mappingSelectedNode + "</td>" 
				+ "<td>" + sqlStatementParam + "</td></tr>").insertBefore("#mappingTablefooter");

		//$("#mappingValueTable").attr("class", "hiddentable");
		$("#mappingValueTable").hide();
	}

	function generateTree(instanceId, variableName, details,ruleDefinitionId) 
	{
		var contextPath = $("#contextPath").val();
		var urlString = "";
		if (details == "details")
			urlString = contextPath + "/views/variableContentByNamefromDB/" + variableName + "/" + ruleDefinitionId;
		else
			urlString = contextPath + "/views/variableContentByName/" + instanceId + "/" + variableName;

		$("#tree").dynatree({
			title : "Variable Tree",
			selectMode : 1,
			fx : null,
			contentType : "application/json; charset=utf-8",
			autoFocus : false,
			initAjax : {
				url : urlString,
				data : {
					mode : "funnyMode"
				}
			},
			onActivate : function(node) {
				$("#echoActive").text(
						node.data.title);
			},
			onDeactivate : function(node) {
				$("#echoActive").text("-");
			},
			strings : {
				loading : "Loading",
				loadError : "Error!"
			},
			onSelect : function(select, node) {
				var selNodes = node.tree.getSelectedNodes();
				var selKeys = $.map(selNodes,function(node) {
						var externalSource = $('input[name=externalSource]:checked').val();
						if(externalSource == "1")
						{
							//$("#mappingValueTable").attr("class","hiddentable");
							$("#mappingValueTable").hide();
							//$("#variableValueTable").attr("class","");
							$("#variableValueTable").show();
							$("#selectedNode").html(node.data.title);
							//$("#nodeValue").html(node.data.key);
						}
						else if(externalSource == "2")
						{
							//$("#mappingValueTable").attr("class","");
							$("#mappingValueTable").show();
							//$("#variableValueTable").attr("class","hiddentable");
							$("#variableValueTable").hide();
							$("#mappingSelectedNode").html(node.data.title);
						}
						else
						{
							alert("HATA!");
						}	
									
				});
			},
			onClick : function(node, event) {
				//$("#variableValueTable").attr("class", "hiddentable");
				$("#variableValueTable").hide();
				if (node.getEventTargetType(event) == "title")
					node.toggleSelect();
			},
			onKeydown : function(node, event) {
				if (event.which == 32) {
					node.toggleSelect();
				}
			},
			cache : false
		});
	}

	var ruleName = $("#ruleName"), ruleDesc = $("#ruleDesc"), allFields = $([]).add(ruleName).add(ruleDesc), tips = $(".validateTips");

	function updateTips(t) {
		tips.text(t).addClass("ui-state-highlight");

		setTimeout(function() {
			tips.removeClass("ui-state-highlight", 1500);
		}, 500);
	}

	function checkLength(o, n, min, max) 
	{
		if (o.val().length > max || o.val().length < min) 
		{
			o.addClass("ui-state-error");
			updateTips("\"Length of " + n + "\"" + " should be between " + min + " and " + max + " characters.");
			return false;
		} 
		else 
		{
			return true;
		}
	}

	$("#dialog-form").dialog({
		autoOpen : false,
		autoSize : true,
		width : 700,
		modal: true,
		position: { my: "center top+25%", at: "center top", of: window},
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Create New Rule Set</h4></div>",
		title_html: true,
		buttons: [ 
			{
				text: "Save",
				"class" : "btn btn-primary btn-xs",
				id: "dialogSaveButton",
				click: function() {
					var contextPath = $("#contextPath").val();

					$(":button:contains('Save')").prop("disabled", true).addClass("ui-state-disabled");
					$('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125" style="margin-right: 10px;"></i>').insertBefore("#dialogSaveButton");

					$('<img id="loadingPane" src="'+ contextPath+ '/resources/img/page_lev_busy.gif" style="margin-top: 3px;float: left;" />').insertBefore('.ui-dialog-buttonset > button:first');

					var bValid = true;
					allFields.removeClass("ui-state-error");
					bValid = bValid && checkLength(ruleName,"Rule Name", 1, 100);
					bValid = bValid && checkLength(ruleDesc,"Rule Description",0, 250);
					if (bValid) 
					{
						var compositeName = $("#compositeName").text();
						var container = $('#cblist');
						var inputs = container
								.find('.ruleContainer');
						var id = inputs.length;
						var abortRelatedInstances = $('#abortRelatedInstances').is(':checked');
						var action = $("#recoveryAction option:selected").val();
						var rules = new Array();
						var instanceId = $("#sampleInstanceId").val();
						var externalSource = $('input[name=externalSource]:checked').val();
						var statement = $("#statement option:selected").val();
						var removalFilters = $("#removalFilters").val(); 
						
						if(externalSource == "1")
						{
							$(".ruleContainer").each(function(index) 
							{
								var selectedNode = $("#selectedNode"+ this.id).val();
								var variable = $("#variable"+ this.id).val();
								var variableType = $("#variableType"+ this.id).val();
								rules[index] = variable + "-" + selectedNode + "-" + variableType;

							});
							if (rules.length == 0) 
							{
								rules = "dummy";
							}
						}
						else if(externalSource == "2")
						{
							$(".mappingRuleContainer").each(function(index) 
							{
								var mappingVariable = $("#mappingVariable"+ this.id).val();
								var mappingSelectedNode = $("#mappingSelectedNode"+ this.id).val();
								var sqlStatementParam = $("#sqlStatementParam"+ this.id).val();
								rules[index] = mappingVariable + "*" + mappingSelectedNode + "*" + sqlStatementParam;

							});
						}
						
						$.ajax({
							type : "GET",
							url : contextPath
									+ "/views/addRuleDefinitionToDB?rules="+ rules +"&action="+action+"&instanceId="+instanceId
									+"&ruleName="+ruleName.val()+"&ruleDesc="+ruleDesc.val()+"&abortRelatedInstances="+abortRelatedInstances
									+"&statement="+statement+"&externalSource="+externalSource+"&removalFilters="+removalFilters,
							data : "",
							success : function(result) 
							{
								$('#dialog-form').dialog('close');
								alertMessage(result);
								$("#cblist").empty();
								$("#mappingListTable").empty();
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
				} 
			},
			{
				text: "Cancel",
				"class" : "btn btn-xs",
				click: function() {
					$( this ).dialog( "close" ); 
				} 
			}

		],
		close : function() 
		{
			allFields.val("").removeClass("ui-state-error");
		}
	});
					
	 $('#abortRelatedInstancesRow').hide();
	 $('#recoveryAction').change(function (){
			
			var optionSelected = $(this).find("option:selected");
			var valueSelected  = optionSelected.val();
			
			if(valueSelected == "3"){
				$('#abortRelatedInstancesRow').show();
			}
			else {
				$('#abortRelatedInstancesRow').hide();
			}
	
	});
			
	$('#sqlStatementList').hide();
	$("input[name='externalSource']").change(function(){
		// $("#mappingValueTable").attr("class","hiddentable");
		 $("#mappingValueTable").hide();
		 //$("#variableValueTable").attr("class","hiddentable");
		 $("#variableValueTable").hide();
		 var val = $("input[name=externalSource]:checked").val();
		 if(val == "1") $('#sqlStatementList').hide();
		 else if(val == "2") $('#sqlStatementList').show();
		 else $('#sqlStatementList').hide();
	});
					 
	$("#statement").on("change",function() {
		 var contextPath = $("#contextPath").val();
		 var statementId = $("#statement option:selected").val();
		 if(statementId != "")
	     {
			 $.ajax({
				type : "GET",
				url :  contextPath + "/views/statementMappingAttributes?statementId="+statementId,
				data : "",
				success : function(result, textStatus, jqXHR) {
					$('#mappingSelect').empty();
					for ( var i = 0; i < result.length; i++) {
						$('#mappingSelect').append($('<option>', {
						    value: result[i],
						    text: result[i]
						}));
						
					}
				},
				error : function() {
					alert('Javascript Error!');
					console.log("Error");
				}
			});
	     }
		 else
		 {
			 $('#mappingSelect').empty();
		 }
		 
	});
	
	
	$("#scheduleJobButton").click(function() 
	{
		var ruleDefinitionId = $("#ruleDefinitionId").val();
		var contextPath = $("#contextPath").val();
		window.location.href = contextPath + '/views/recoverAllCompositeInstancesByFilter?ruleDefinitionID=' + ruleDefinitionId;
	});
	
					
});

$(document).on('change', 'input[name="check_all"]', function() {
	$('.idRow').prop("checked", this.checked);
});

function removalFiltersOperation(filter) {
	var removalFilters = $("#removalFilters").val();
	removalFilters = filter + "," + removalFilters;
	$('#removalFilters').val(removalFilters);
	$("#"+filter).remove();
	
	if(filter == 'compositeDN')
	{
		$("#sqlText").remove();
		$("#sqlRadioButton").remove();
		$("#sqlStatementList").remove();
		$("#variableTR").remove();
		$("#cblist").remove();
		$("#mappingListTable").remove();
		$("#variableTreeTR").remove();
		$('#excelRadioButton').prop('checked', true);
	}
	
}

function refreshValues() {
	$("#selectedNode").html("");
	$("#nodeValue").html("");
	$("#newNodeValue").val("");
}

function deleteSelectedNode() {

	var recordNumber = $('input:checkbox[name=checked]:checked').size();
	
	if(recordNumber > 0 ){
	
	$("#recordNumber").html(recordNumber);
	$("#delete-form").dialog({
		modal: true,
		position: { my: "center top+25%", at: "center top", of: window},
		title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Delete Rule Variable(s)?</h4></div>",
		title_html: true,
		buttons: [ 
			{
				html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete items",
				"class" : "btn btn-danger btn-xs",
				click: function() {
					$("input:checkbox[name=checked]:checked").each(function() {
						var id = $(this).attr("id");
						$("#" + id).empty();
						$("#" + id).remove();
					});
					$('input[name=check_all]').attr('checked', false);
					$(this).dialog("close");
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

function openStackTraceWindow(stackTraceWindowPath, id, domainName, revision, stackTraceContext, compositeName) {
	window.open(stackTraceWindowPath + domainName + "/" + compositeName
			+ "%20[" + revision + "]&type=oracle_soa_composite&soaContext="
			+ stackTraceContext + "/" + id, "SOA eXpress",
			"width=800,height=600");
}

function addRuleDefinitionToDB() {
	
	var externalSource = $('input[name=externalSource]:checked').val();
	if(externalSource == "1")
	{
		var action = $("#recoveryAction option:selected").val();
		var abortRelatedInstances = $('#abortRelatedInstances').is(':checked');
		var container = $('#cblist');
		var inputs = container.find('tr');
		var id = inputs.length - 3;
		
		if(action == '3' && abortRelatedInstances && id > 0)
		{
			alert("To abort related instances, rule set should not contain any variable. Please delete variables to save the rule set. ");
		}
		else
		{
			
			$("#dialog-form").dialog("open");
		}	
	}
	else if(externalSource == "2")
	{
		var container = $('#mappingListTable');
		var inputs = container.find('tr');
		var id = inputs.length - 3;
		$("#dialog-form").dialog("open");
	}
	

}

function modificatedRuleDefinition() {
	var contextPath = $("#contextPath").val();

	var container = $("#cblist");
	var inputs = container.find(".ruleContainer");
	var id = inputs.length;

	var action = $("#recoveryAction option:selected").val();
	var ruleDefinitionId = $("#ruleDefinitionId").val();
	var ruleDefName = $("#ruleDefName").val();
	var ruleDefDesc = $("#ruleDefDesc").val();
	var abortRelatedInstances = $('#abortRelatedInstances').is(':checked');
	var externalSource = $('input[name=externalSource]:checked').val();
	var removalFilters = $("#removalFilters").val(); 
	var rules = new Array();
	
	if (id == 0) 
	{
		rules = "dummy";
	} 
	else 
	{
		$(".ruleContainer").each(function(index) 
		{
			var selectedNode = $("#selectedNode" + this.id).val();
			// var newNodeValue = $("#newNodeValue"+this.id).val();
			var variable = $("#variable" + this.id).val();
			var variableType = $("#variableType" + this.id).val();
			var path = $("#path" + this.id).val();
	
			rules[index] = variable + "-" + selectedNode + "-" + variableType + "-" + path;
		});
		
	}

	if ($.trim(ruleDefDesc) == "") 
	{
		ruleDefDesc = "dummy";
	}

	if ($.trim(ruleDefName) == "") 
	{
		alert('Please set Rule Name');
		return;
	}

	$.ajax({
		type : "GET",
		url : contextPath + "/views/modificatedRuleDefinition?rules="+rules+"&action="+action+"&ruleDefinitionId="+ruleDefinitionId+"&ruleDefName="+ruleDefName
				+"&ruleDefDesc="+ruleDefDesc+"&abortRelatedInstances="+abortRelatedInstances+"&externalSource="+externalSource+"&removalFilters="+removalFilters,
		data : "",
		success : function(result) 
		{
			alertMessageForModification(result);
		},
		error : function() 
		{
			alert('Javascript Error!');
			console.log("Error");
		}
	});
}


function alertMessageForModification(result) {
	var contextPath = $("#contextPath").val();
	
	if (result == "Error") 
	{
		$("#dialog-message-error").dialog({
			modal: true,
			position: { my: "center top+25%", at: "center top", of: window},
			title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Error</h4></div>",
			title_html: true,
			buttons: [ 
				{
					text: "Close",
					"class" : "btn btn-danger btn-xs",
					click: function() {
						$( this ).dialog( "close" ); 
					} 
				}
			]
		});
	} 
	else 
	{
		$("#dialog-message-success").dialog({
			modal: true,
			position: { my: "center top+25%", at: "center top", of: window},
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Success</h4></div>",
			title_html: true,
			buttons: [ 
			{
				text: "OK",
				"class" : "btn btn-primary btn-xs",
				click: function() {
					window.location.href = contextPath + '/views/ruleDefinitionsList?ruleDefinitionId=' + result + '&act=details';
				} 
			}
			]
		});
	}

}


function alertMessage(result) {
	var contextPath = $("#contextPath").val();
	
	if (result == "Error") 
	{
		$("#dialog-message-error").dialog({
			modal: true,
			position: { my: "center top+25%", at: "center top", of: window},
			title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Error</h4></div>",
			title_html: true,
			buttons: [
						{
							text: "Close",
							"class" : "btn btn-danger btn-xs",
							click: function() {
								$( this ).dialog( "close" ); 
							} 
						}
					]
		});
	} 
	else 
	{
		$("#dialog-message-success").dialog({
			modal: true,
			position: { my: "center top+25%", at: "center top", of: window},
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Success</h4></div>",
			title_html: true,
			buttons: [ 
				{
					text: "Schedule Job",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						var recoverRequestType = $("#recoverRequestType").val();
						
						if(recoverRequestType == "1")
						{
							window.location.href = contextPath + '/views/recoverScheduleCompositeInstances?ruleDefinitions=' + result;
						}
						else if(recoverRequestType == "2")
						{
							window.location.href = contextPath + '/views/recoverAllCompositeInstancesByFilter?ruleDefinitionID=' + result;
						}
						else
						{
							window.location.href = contextPath + "/views/";
						}
					} 
				},
				{
					text: "Close",
					"class" : "btn btn-danger btn-xs",
					click: function() {
						window.location.href = contextPath + '/views/ruleDefinitionsList?ruleDefinitionId=' + result + '&act=details';
					} 
				}
			]
		});
	}

}