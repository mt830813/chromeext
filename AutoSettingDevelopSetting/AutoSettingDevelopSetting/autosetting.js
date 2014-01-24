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

function InitSelect() {
	var trs = $("[id*='ContentPlaceHolder1_rptAppList_labCrappid_']").parent().parent();

	var select = $("#autoSettingSelect")[0];

	for (var i = 0; i < trs.length; i++) {
		var tr = trs[i];
		var name = tr.childNodes[5].innerText;
		var value = tr.childNodes[3].innerText;
		var option = document.createElement("option");
		option.text = name;
		option.value = value;
		option.tr = tr;
		select.options.add(option);
	}
}

$("#btnExtAutoSetting").click(function () {
	AutoSettingAll();
})

function AutoSettingAll() {
	var select = $("#autoSettingSelect")[0];
	var selectOption = select.selectedOptions[0];
	if (selectOption.value != 0) {
		AutoSetting(selectOption);
	} else {
		for (var i = 1; i < select.options.length; i++) {
			AutoSetting(select.options[i]);
		}
	}
}

function AutoSetting(option) {
	var tr = option.tr;
	var btnAppSetting = $(tr).find("a[id*='cid']");

	var btn = btnAppSetting;
	btn[0].click();

	$("iframe").bind("load", function () {
		$("iframe").unbind("load");
		StartAutoSetting();		
	})
}

function StartAutoSetting() {
	var i = 0;

	var time = 700;

	var handle;

	var selectTemplate = function () {		
		var cDocument = $("iframe")[0].contentDocument;		
		$(cDocument).find("#APPInfo1_btnApply")[0].setAttribute("onclick",function(){});
		
		var select = $(cDocument).find("#APPInfo1_ddlTpl")[0];
		select.selectedIndex = 1;
		$(cDocument).find("#APPInfo1_btnApply")[0].click();
		setTimeout(function () {
			handle = setInterval(btnClickFunction, time);
		}, time * 2);
	}

	var btnClickFunction = function () {
		var cDocument = $("iframe")[0].contentDocument;
		var btn = $(cDocument).find("[id*='btnEnabled']")[i];
		if (btn != undefined) {
			i++;
			btn.click();
		} else {
			clearInterval(handle);
			setValueFunction();
		}
	}

	var setValueFunction = function () {
		var setValue = ["#ctl12_txtTimeLong", "#ctl16_txtTimeLong", "#ctl26_txtTimeLong", "#ctl29_txtTimeLong"];
		var cDocument = $("iframe")[0].contentDocument;
		for (var i = 0; i < setValue.length; i++) {
			$(cDocument).find(setValue[i]).val(0);
		}
		setFont();
	}

	var setFont = function () {
		var cDocument = $("iframe")[0].contentDocument;
		$(cDocument).find("#ctl23_all")[0].click();
		setTimeout(function () {
			var cDocument = $("iframe")[0].contentDocument;
			$(cDocument).find("#ctl23_lbxrollingmachines")[0].selectedIndex = 0
				$(cDocument).find("#ctl23_removebake")[0].click();
			setTimeout(save, time)
		}, time);
	}

	var save = function () {
		var cDocument = $("iframe")[0].contentDocument;
		$(cDocument).find("#btnSave")[0].setAttribute("onclick",function(){})
		$(cDocument).find("#btnSave")[0].click()
	}

	selectTemplate();
}

InitSelect();
