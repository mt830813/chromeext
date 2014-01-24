chrome.tabs.onUpdated.addListener(checkForValidUrl);

function checkForValidUrl(tabId, changeInfo, tab) {
	var url = tab.url;
	if (url.toLowerCase().indexOf("http://croller/CRoller.FrontEnd/RollingPlanSubmit.aspx".toLowerCase()) >= 0) {
		var response;
		$.ajax({
			type : "GET",
			url : chrome.extension.getURL("controllerPanel.html"),
			async : false,
			success : function (text) {
				response = text;
			}
		});
		$("body").prepend('<div>' + response + '</div>');
			chrome.tabs.executeScript({
				file : "autosetting.js"
			})
	}
}
