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
});
