$(function () {
    function updateChecked() {
	let checked = []
	$("input:checked").each(function () {
	    checked.push($(this).attr('data-name'));
	});
	return (checked);
    }
    $('input[type="checkbox"]').change(function () {
	const checkedList = updateChecked();
	let theList = "";
	for (let i = 0; i < checkedList.length; i++) {
	    theList = theList + checkedList[i];
	    if (i < checkedList.length - 1)
		theList = theList + ",";
	}
	$('div.amenities h4').text(theList);
    });
    $.get('http://briancenter.tech/api/v1/status/', function (data, stat) {
	if (data.status == "OK") {
	    $("div#api_status").addClass("available");
	}
	else {
	    $("div#api_status").removeClass("available");
	}
    })
});
