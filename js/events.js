function encodeTaskProperties(task) {
	return {
		name: encodeURIComponent(task.name),
		note: encodeURIComponent(task.note)
	}
}

function triggerActionUrl( url ) {
	document.body.insertAdjacentHTML('afterEnd', '<iframe src="'+url+'" style="display:none">');
}

var senders = {
	app: function(config, encodedTask) {
		triggerActionUrl('thehitlist:///inbox/tasks?method=POST&title='+encodedTask.name+'&notes='+encodedTask.note);
	}
}

var actions = {
	createTask: function(taskInfo) {
		var sender = localStorage.sender || "app";
		senders[ sender ](localStorage, encodeTaskProperties(taskInfo));
		return true;
	}
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

	var responseData = false;

	if (actions[ request.method ]) {
		responseData = actions[ request.method ](request.params);
	}

	sendResponse( responseData );
});
