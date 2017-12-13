
function showCompositeDetails(compositeName, domainName, revision, deploymentTime, mode, state) {
	
	compositeName = (compositeName != "" ? compositeName : "N/A");
	domainName = (domainName != "" ? domainName : "N/A");
	revision = (revision != "" ? revision : "N/A");
	deploymentTime = (deploymentTime != "" ? deploymentTime : "N/A");
	mode = (mode != "" ? mode : "N/A");
	state = (state != "" ? state : "N/A");

	$("#compositeNameDD").html(compositeName);
	$("#domainNameDD").html(domainName);
	$("#revisionDD").html(revision);
	$("#modeDD").html(mode);
	$("#stateDD").html(state);
	$("#deploymentTimeDD").html(deploymentTime);
	
	var dialog = $( "#dialogComposite" ).removeClass('hide').dialog({
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Composite Details</h4></div>",
		title_html: true,
        width:'auto',
        modal: true,
        position: { my: "center top+25%", at: "center top", of: window},
		buttons: [ 
			{
				text: "OK",
				"class" : "btn btn-primary btn-xs",
				click: function() {
					$( this ).dialog( "close" ); 
				} 
			}
		]
	});
	
}

function showCompositeInstanceDetails(instanceId, compositeName, domainName, revision, parentId, conversationId, ECID, title, sourceType,
		currentActionType, creationDate, modificationDate) {
	
	instanceId = (instanceId != "" ? instanceId : "N/A");
	compositeName = (compositeName != "" ? compositeName : "N/A");
	domainName = (domainName != "" ? domainName : "N/A");
	revision = (revision != "" ? revision : "N/A");
	parentId = (parentId != "" ? parentId : "N/A");
	conversationId = (conversationId != "" ? conversationId : "N/A");
	ECID = (ECID != "" ? ECID : "N/A");
	title = (title != "" ? title : "N/A");
	sourceType = (sourceType != "" ? sourceType : "N/A");
	currentActionType = (currentActionType != "" ? currentActionType : "N/A");
	creationDate = (creationDate != "" ? creationDate : "N/A");
	modificationDate = (modificationDate != "" ? modificationDate : "N/A");
	
	$("#instanceIdDD").html(instanceId);
	$("#compositeNameDD").html(compositeName);
	$("#domainNameDD").html(domainName);
	$("#revisionDD").html(revision);
	$("#conversationIdDD").html(conversationId);
	$("#ECIDDD").html(ECID);
	$("#titleDD").html(title);
	$("#sourceTypeDD").html(sourceType);
	$("#currentActionTypeDD").html(currentActionType);
	$("#creationDateDD").html(creationDate);
	$("#modificationDateDD").html(modificationDate);
	
	var dialog = $( "#dialogCompositeInstances" ).removeClass('hide').dialog({
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Composite Instance Details</h4></div>",
		title_html: true,
        width:'auto',
        modal: true,
        position: { my: "center top+25%", at: "center top", of: window},
		buttons: [ 
			{
				text: "OK",
				"class" : "btn btn-primary btn-xs",
				click: function() {
					$( this ).dialog( "close" ); 
				} 
			}
		]
	});

}

function showComponentDetails(componentName, implementationType, compositeName, deploymentTime, compositeDN) {
	
	componentName = (componentName != "" ? componentName : "N/A");
	implementationType = (implementationType != "" ? implementationType : "N/A");
	compositeName = (compositeName != "" ? compositeName : "N/A");
	deploymentTime = (deploymentTime != "" ? deploymentTime : "N/A");
	compositeDN = (compositeDN != "" ? compositeDN : "N/A");
	
	$("#componentNameDD").html(componentName);
	$("#implementationTypeDD").html(implementationType);
	$("#compositeNameDD").html(compositeName);
	$("#deploymentTimeDD").html(deploymentTime);
	$("#compositeDNDD").html(compositeDN);

	var dialog = $( "#dialogComponent" ).removeClass('hide').dialog({
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Component Details</h4></div>",
		title_html: true,
        width:'auto',
        modal: true,
        position: { my: "center top+25%", at: "center top", of: window},
		buttons: [ 
			{
				text: "OK",
				"class" : "btn btn-primary btn-xs",
				click: function() {
					$( this ).dialog( "close" ); 
				} 
			}
		]
	});
	
}

function showComponentInstanceDetails(instanceId, compositeInstanceId, componentName, implementationType, ECID, conversationId, compositeName, compositeDN, creationDate,
		modificationDate, status, state) {
	
	instanceId = (instanceId != "" ? instanceId : "N/A");
	compositeInstanceId = (compositeInstanceId != "" ? compositeInstanceId : "N/A");
	componentName = (componentName != "" ? componentName : "N/A");
	implementationType = (implementationType != "" ? implementationType : "N/A");
	ECID = (ECID != "" ? ECID : "N/A");
	conversationId = (conversationId != "" ? conversationId : "N/A");
	compositeName = (compositeName != "" ? compositeName : "N/A");
	compositeDN = (compositeDN != "" ? compositeDN : "N/A");
	creationDate = (creationDate != "" ? creationDate : "N/A");
	modificationDate = (modificationDate != "" ? modificationDate : "N/A");
	status = (status != "" ? status : "N/A");
	state = (state != "" ? state : "N/A");
	
	$("#instanceIdDD").html(instanceId);
	$("#compositeInstanceIdDD").html(compositeInstanceId);
	$("#componentNameDD").html(componentName);
	$("#implementationTypeDD").html(implementationType);
	$("#ECIDDD").html(ECID);
	$("#conversationIdDD").html(conversationId);
	$("#compositeNameDD").html(compositeName);
	$("#compositeDNDD").html(compositeDN);
	$("#creationDateDD").html(creationDate);
	$("#modificationDateDD").html(modificationDate);
	$("#statusDD").html(status);
	$("#stateDD").html(state);
	
	var dialog = $( "#dialogComponentInstances" ).removeClass('hide').dialog({
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Component Instance Details</h4></div>",
		title_html: true,
        width:'auto',
        modal: true,
        position: { my: "center top+25%", at: "center top", of: window},
		buttons: [ 
			{
				text: "OK",
				"class" : "btn btn-primary btn-xs",
				click: function() {
					$( this ).dialog( "close" ); 
				} 
			}
		]
	});
	
}


function showMessageDetails(ECID, componentName, partnerLink, operationName, convId, messageGUID)
{

	ECID = (ECID != "" ? ECID : "N/A");
	componentName = (componentName != "" ? componentName : "N/A");
	partnerLink = (partnerLink != "" ? partnerLink : "N/A");
	operationName = (operationName != "" ? operationName : "N/A");
	convId = (convId != "" ? convId : "N/A");
	
	$("#ECIDDD").html(ECID);
	$("#componentNameDD").html(componentName);
	$("#partnerLinkDD").html(partnerLink);
	$("#operationNameDD").html(operationName);
	$("#convIdDD").html(convId);
	$("#messageGUIDDD").html(messageGUID);
	
	var dialog = $( "#dialogInvokeCallbackMessageDetails" ).removeClass('hide').dialog({
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> Invoke Callback Message Details</h4></div>",
		title_html: true,
        width:'auto',
        modal: true,
        position: { my: "center top+25%", at: "center top", of: window},
		buttons: [ 
			{
				text: "OK",
				"class" : "btn btn-primary btn-xs",
				click: function() {
					$( this ).dialog( "close" ); 
				} 
			}
		]
	});

}


