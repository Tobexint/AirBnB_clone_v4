$(function () {
    function updateChecked() {
	let checked = []
	$("input:checked").each(function () {
	    checked.push($(this).attr('data-name'));
	});
	return (checked);
    }
    function amen_ids() {
	let ids = [];
	$("iput:checked").each(function () {
	    ids.push($(this).attr('data-id'));
	});
	return (ids);
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
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, stat) {
	if (data.status == "OK") {
	    $("div#api_status").addClass("available");
	}
	else {
	    $("div#api_status").removeClass("available");
	}
    })
    $.ajax({
	beforeSend: function (xhrObj) {
	    xhrObj.setRequestHeader("Content-Type","application/json");
	},
	type: "POST",
	url: 'http://0.0.0.0:5001/api/v1/places_search/',
	data: "{}",
	success: function (data) {
	    for (let i = 0; i < data.length; i++) {
		let tiBox = $("<div class='title_box'>")
		const h2 = $("<h2>").text(data[i].name);
		const priceDiv = $("<div class='price_by_night'>")
		      .text(data[i].price_by_night);
		tiBox = tiBox.append(h2).append(priceDiv);
		let gue = $("<div class='max_guest'>")
		      .text(data[i].max_guest + " Guest");
		if (data[i].max_guest > 1)
		    gue = $("<div class='max_guest'>")
		    .text(data[i].max_guest + " Guests");
		let nr = $("<div class='number_rooms'>")
		    .text(data[i].number_rooms + " Bedroom");
		if (data[i].number_rooms > 1)
		    nr = $("<div class='number_rooms'>")
		    .text(data[i].number_rooms + " Bedrooms");
		let nb = $("<div class='number_bathrooms'>")
		    .text(data[i].number_bathrooms + " Bathroom")
		if (data[i].number_bathrooms > 1)
		    nb = $("<div class='number_bathrooms'>")
		    .text(data[i].number_bathrooms + " Bathrooms")
		const info = $("<div class='information'>")
		      .append(gue).append(nr).append(nb);
		const des = $("<div class='description'>")
		      .text(data[i].description)
		const art = $("<article>").append(tiBox)
		      .append(info).append(des);
		$("section.places").append(art);
	    }
	}
    })
    $("button").on("click", function () {
	$.ajax({
	    beforeSend: function (xhrObj) {
		xhrObj.setRequestHeader("Content-Type","application/json");
	    },
	    type: "POST",
	    url: 'http://0.0.0.0:5001/api/v1/places_search/',
	    data: JSON.stringify(amen_ids()),
	    success: function (data) {
		for (let i = 0; i < data.length; i++) {
		    let tiBox = $("<div class='title_box'>")
		    const h2 = $("<h2>").text(data[i].name);
		    const priceDiv = $("<div class='price_by_night'>")
		          .text(data[i].price_by_night);
		    tiBox = tiBox.append(h2).append(priceDiv);
		    let gue = $("<div class='max_guest'>")
		        .text(data[i].max_guest + " Guest");
		    if (data[i].max_guest > 1)
			gue = $("<div class='max_guest'>")
		        .text(data[i].max_guest + " Guests");
		    let nr = $("<div class='number_rooms'>")
		        .text(data[i].number_rooms + " Bedroom");
		    if (data[i].number_rooms > 1)
			nr = $("<div class='number_rooms'>")
		        .text(data[i].number_rooms + " Bedrooms");
		    let nb = $("<div class='number_bathrooms'>")
		        .text(data[i].number_bathrooms + " Bathroom")
		    if (data[i].number_bathrooms > 1)
			nb = $("<div class='number_bathrooms'>")
		        .text(data[i].number_bathrooms + " Bathrooms")
		    const info = $("<div class='information'>")
		          .append(gue).append(nr).append(nb);
		    const des = $("<div class='description'>")
		          .text(data[i].description)
		    const art = $("<article>").append(tiBox)
		          .append(info).append(des);
		    $("section.places").append(art);
		}
	    }
	})
    })
});
