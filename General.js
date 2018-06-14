/*
    Other libraries required for this to work:
    JQuery
    Alertify
*/

//#region AJAX
/*
*	These functions are intended to be used when making AJAX calls
* 	Make sure you have a 'loader' div that is displayed when making ajax calls i.e. a progress bar or spinning cirlce or whatever happens to make you happy
*/

function beforeAjaxCallFunction() 
{
	$("#loader").css("visibility", "visible");
}

function onSuccessAjax() 
{
	$("#loader").css("visibility", "hidden");
}

//function that handles all server calls
/*
*	inData = JSON Object
*	what = "Get/Put/Post/Delete"
*	apiName = 'api/Name' = set to null and use the other parameter if you're not using ASP.NET MVC
* 	asyncFlag = true/false (optional, defaults to false)
* 	callBackFunction = any function that is called when the ajax call returns. (optional)
*	timeOutAmount = default 20000
*	beforeSendFunction = called before making the ajax call. Typically used to display a busy icon
*	onSuccessFunction = called when an ajax call is successfull
* 	incomingURL = any url which to make the ajax call to
*
*	RETURNS an array in the format ["true/false", "JSON STRING"] provided the server returns a delimited string in the format "boolean|JSON String OR Message";
*/
var serverAddress = "http://localhost/";
function makeAjaxCall(inData, what, apiName, asyncFlag,
		callbackFunction, timeOutAmount, beforeSendFunction, onSuccessFunction, incomingURL) 
{

	if (checkExists(timeOutAmount) == false)
	{
		timeOutAmount = 20000;
	}

	var tempUrl;

	if (checkExists(incomingURL) == false)
	{
		tempUrl == serverAddress;
	}
	else tempUrl = incomingURL;

	var result;

	if (checkExists(asyncFlag) == false)
		asyncFlag = false;

	outputToConsole("Making " + what + " call on " + tempUrl + "Data: ", "makeAjaxCall", 46);
	console.log(inData);

	if (asyncFlag == false) 
	{ //Synchronous Requests with no callback
		if (what == "Get") 
		{
			$.ajax({
				type: "GET",
				url: tempUrl,
				contentType: "application/json;",
				dataType: "json",
				async: asyncFlag,
				timeout: timeOutAmount, // sets timeout to 3 seconds
				error: function (xhr, ajaxOptions, thrownError) {
					ajaxRequest_serverError(xhr, ajaxOptions, thrownError);
				},
				beforeSend: function () {
					if (beforeSendFunction != undefined || beforeSendFunction != null)
						beforeSendFunction();
				},
				success: function (msg) {
					result = msg.split("|");
					if (onSuccessFunction != undefined || onSuccessFunction != null) onSuccessFunction();
					return result;
				}
			});
		}
		else if (what == "GetID") {

			$.ajax({
				type: "GET",
				url: tempUrl,
				contentType: "application/json;",
				dataType: "json",
				async: asyncFlag,
				timeout: timeOutAmount, // sets timeout to 3 seconds
				error: function (xhr, ajaxOptions, thrownError) {
					ajaxRequest_serverError(xhr, ajaxOptions, thrownError);
				},
				beforeSend: function () {
					if (beforeSendFunction != undefined || beforeSendFunction != null)
						beforeSendFunction();
				},
				success: function (msg) {
					result = msg.split("|");
					if (onSuccessFunction != undefined || onSuccessFunction != null) onSuccessFunction();
					return result;
				}
			});

		}
		else if (what == "Post") {

			$.ajax({
				type: "POST",
				url: tempUrl,
				data: { data: JSON.stringify(inData) },
				contentType: "application/json;",
				dataType: "json",
				async: asyncFlag,
				timeout: timeOutAmount, // sets timeout to 3 seconds
				error: function (xhr, ajaxOptions, thrownError) {
					ajaxRequest_serverError(xhr, ajaxOptions, thrownError);
				},
				beforeSend: function () {
					if (beforeSendFunction != undefined || beforeSendFunction != null)
						beforeSendFunction();
				},
				success: function (msg) {
					result = msg.split("|");
					if (onSuccessFunction != undefined || onSuccessFunction != null) onSuccessFunction();
					return result;
				}
			});
		}
		else if (what == "Put") {
			$.ajax({
				type: "PUT",
				url: tempUrl,
				data: { data: JSON.stringify(inData) },
				contentType: "application/json;",
				dataType: "json",
				async: asyncFlag,
				timeout: timeOutAmount, // sets timeout to 3 seconds
				error: function (xhr, ajaxOptions, thrownError) {
					ajaxRequest_serverError(xhr, ajaxOptions, thrownError);
				},
				beforeSend: function () {
					if (beforeSendFunction != undefined || beforeSendFunction != null)
						beforeSendFunction();
				},
				success: function (msg) {
					result = msg.split("|");
					if (onSuccessFunction != undefined || onSuccessFunction != null) onSuccessFunction();
					return result;
				}
			});
		}
		else if (what == "Delete") {
			$.ajax({
				type: "DELETE",
				url: tempUrl,
				contentType: "application/json;",
				dataType: "json",
				async: asyncFlag,
				timeout: timeOutAmount, // sets timeout to 3 seconds
				error: function (xhr, ajaxOptions, thrownError) {
					ajaxRequest_serverError(xhr, ajaxOptions, thrownError);
				},
				beforeSend: function () {
					if (beforeSendFunction != undefined || beforeSendFunction != null)
						beforeSendFunction();
				},
				success: function (msg) {
					result = msg.split("|");
					if (onSuccessFunction != undefined || onSuccessFunction != null) onSuccessFunction();
					return result;
				}
			});
		}

		
	}
	else //async call with a callback
	{
		if (what == "Get") {
			$.ajax({
				type: "GET",
				url: tempUrl,
				contentType: "application/json;",
				dataType: "json",
				async: asyncFlag,
				timeout: timeOutAmount, // sets timeout to 3 seconds
				error: function (xhr, ajaxOptions, thrownError) {
					ajaxRequest_serverError(xhr, ajaxOptions, thrownError);
				},
				beforeSend: function () {

					if (beforeSendFunction != undefined || beforeSendFunction != null)
						beforeSendFunction();
				},
				success: function (msg) {
					result = msg.split("|");
					if (onSuccessFunction != undefined || onSuccessFunction != null) onSuccessFunction();
					callbackFunction(result);
				}
			});
		}
		else if (what == "GetID") {

			$.ajax({
				type: "GET",
				url: tempUrl,
				contentType: "application/json;",
				dataType: "json",
				async: asyncFlag,
				timeout: timeOutAmount, // sets timeout to 3 seconds
				error: function (xhr, ajaxOptions, thrownError) {
					ajaxRequest_serverError(xhr, ajaxOptions, thrownError);
				},
				beforeSend: function () {
					if (beforeSendFunction != undefined || beforeSendFunction != null)
						beforeSendFunction();
				},
				success: function (msg) {
					result = msg.split("|");
					if (onSuccessFunction != undefined || onSuccessFunction != null) onSuccessFunction();
					callbackFunction(result);
				}
			});

		}
		else if (what == "Post") {

			$.ajax({
				type: "POST",
				url: tempUrl,
				data: { data: JSON.stringify(inData) },
				contentType: "application/json;",
				dataType: "json",
				async: asyncFlag,
				timeout: timeOutAmount, // sets timeout to 3 seconds
				error: function (xhr, ajaxOptions, thrownError) {
					ajaxRequest_serverError(xhr, ajaxOptions, thrownError);
				},
				beforeSend: function () {
					if (beforeSendFunction != undefined || beforeSendFunction != null)
						beforeSendFunction();
				},
				success: function (msg) {
					result = msg.split("|");
					if (onSuccessFunction != undefined || onSuccessFunction != null) onSuccessFunction();
					callbackFunction(result);
				}
			});
		}
		else if (what == "Put") {
			$.ajax({
				type: "PUT",
				url: tempUrl,
				data: { data: JSON.stringify(inData) },
				contentType: "application/json;",
				dataType: "json",
				async: asyncFlag,
				timeout: timeOutAmount, // sets timeout to 3 seconds
				error: function (xhr, ajaxOptions, thrownError) {
					ajaxRequest_serverError(xhr, ajaxOptions, thrownError);
				},
				beforeSend: function () {
					if (beforeSendFunction != undefined || beforeSendFunction != null)
						beforeSendFunction();
				},
				success: function (msg) {
					result = msg.split("|");
					if (onSuccessFunction != undefined || onSuccessFunction != null) onSuccessFunction();
					callbackFunction(result);

				}
			});
		}
		else if (what == "Delete") {
			$.ajax({
				type: "DELETE",
				url: tempUrl,
				contentType: "application/json;",
				dataType: "json",
				async: asyncFlag,
				timeout: timeOutAmount, // sets timeout to 3 seconds
				error: function (xhr, ajaxOptions, thrownError) {
					ajaxRequest_serverError(xhr, ajaxOptions, thrownError);
				},
				beforeSend: function () {
					if (beforeSendFunction != undefined || beforeSendFunction != null)
						beforeSendFunction();
				},
				success: function (msg) {
					result = msg.split("|");
					if (onSuccessFunction != undefined || onSuccessFunction != null) onSuccessFunction();
					callbackFunction(result);
				}
			});
		}
	}
}

//error function if ajax fails
function ajaxRequest_serverError(xhr, ajaxOptions, thrownError) 
{
	outputToConsole(xhr.status, 'ajaxRequest_serverError', 0);
	outputToConsole(xhr.responseText, 'ajaxRequest_serverError', 0);
	outputToConsole(thrownError, 'ajaxRequest_serverError', 0);
	if (onSuccessFunction != undefined || onSuccessFunction != null) onSuccessFunction();
	alertify.error("Oops! <br/> Something went wrong on the server. Error Code: " + xhr.status);
}

/*
*	generic function that checks the results of a returned ajax call and returns true/false.
* 	outputs a message if request failed. 
*/
function checkResult_ItemReturned(result, message)
{
	if(result[0] == "true")
	{
		return true;
	}
	else 
	{
		outputToConsole(result[1], "checkResult", 0);

		if (checkExists(message) == true)
		{
			alertify.error(message);
		}
		else
		{
			alertify.error("There was an error on the server. Please try again later.");
		}
		
		return false;
	}
}

/*
*	generic function that checks the results of a returned ajax call and returns true/false as well as outputs a message
*/
function checkResult_NoReturn(result, message)
{
	if (result[0] == "true") {
		alertify.success(result[1]);
		return true;
	}
	else {
		outputToConsole(result[1], "checkResult", 0);

		if(checkExists(result[2]) == true)
		{
			alertify.error(result[2]);
		}
		else if (checkExists(message) == true) {
			alertify.error(message);
		}
		else
		{
			alertify.error("There was an error on the server. Please try again later.");
		}

		return false;
	}
}

/*
*	Generic function that outputs results in a modal and shows the modal
* 	the incoming results must have a JSON object containing an object  called searchItems that contain properties ID and ToString 
* 	Returns a JSON Array of searchedItems
*/
function genericSearchFormCallBack(result, modalID, searchResultsInputID)
{
	if(checkExists(modalID) == false)
	{
		modalID = "modalSearchResults";
	}

	if(checkExists(searchResultsInputID) == false)
	{
		searchResultsInputID = "results";
	}

	if(result[0] == "true")
	{
		var searchedItems = JSON.parse(result[1]).searchedItems;

		$('#' + searchResultsInputID).empty();

		if (searchedItems.length == 0) 
		{
			$("#" + searchResultsInputID).append("<option value=''>No results found.</option>");
		}
		else {
			for (var k = 0; k < searchedItems.length; k++) {
				var html = '<option value="' + k + '">' + searchedItems[k].ToString + '</option>';

				$("#" + searchResultsInputID).append(html);
			}
		}
		
		$("#" + modalID).modal('show');
		return searchedItems;
	}
	else 
	{
		alertify.error("Failed to search for item. Something went wrong on the server.");
		outputToConsole(result[1], genericSearchFormCallBack, 0);
	}
	return [];
}
//#endregion

//#region JQUERY ON LOAD
var loader = '<div id="loader" class="loaderWrapper"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>';

$(document).ready(function ()
{
	$('body').append(loader);

	//alertify.message("Test");
});

//#endregion

//#region Generic Functions

//generic function to output a message to the console
function outputToConsole(console_message, callername, linenumber) 
{

    if (callername == undefined || callername == null)
        callername = "No Source";

    if (linenumber == undefined || linenumber == null)
        linenumber = 0;

    var date = new Date();
    var month = parseInt(date.getMonth()) + 1;
    var today = date.getFullYear() + "/" + month + "/" + date.getDate() + " @ "
        + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + 0;

    console.log(today + "  (" + callername + ", " + linenumber + "): \n" + console_message);
}

//checks the page name and returns boolean if you're on the specified page or not
function checkPage(pagename) 
{
    var href = window.location.href;
    var pos = -1;
    pos = href.indexOf(pagename);

    if (pos > 0) //if we are on the page 
    {
        return true;
    } else {
        return false;
    }
}

//function that gets the current url and fetches the value of the input parameter
function getParameterByName(name, url) 
{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//generic function to output an alert to the user
function alertErrorMessage(message, exception)
{
    console.log(exception);
    alertify.alert('Error', message);
}

//generic function to output json object to pdf
function genericPrint(url, obj)
{
    var w = window.open(url);
    w.passed_obj = obj;
    w.print();
}

//generic sort function
function predicatBy(prop, order) 
{
	if (order == "asc") 
	{
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }
	else 
	{
        return function (a, b) {
            if (a[prop] < b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }
}

/*
*	Validates a date 
*	incomingDate = a date string without a time element and assumed order of day, month, year
*	token = which token is used i.e. a "/" or "-" etc.
* 	RETURNS [boolean, ISO Date String, JSON Date]
*/
function validateDateFormat(inComingDate, token)
{
	if (checkExists(inComingDate) == true && inComingDate.trim().length > 0)
	{
		var correctDate;
		var res3;

		if (checkExists(token) == false) 
		{
			res3 = inComingDate.split("/");
		}
		else {
			res3 = inComingDate.split(token);
		}

		if (res3.length == 3) {
			var d = res3[0];
			var n = res3[2] + "-" + res3[1] + "-" + d + "T00:00:00Z";
			var new_date = new Date(n);
			correctDate = new_date.toISOString();
			var trueDate = new Date(parseInt(res3[2]), parseInt(res3[1]) - 1, parseInt(res3[0]));

			return [true, correctDate, trueDate];
		}
	}
	return [false, ""];
}

/*
*	Sorts a list of objects 
*	prop = name of property
*	tableName = clears a HTML table
* 	RETURNS [boolean, ISO Date String, JSON Date]
*/
var asc = true;
function genericSort(prop, tableName, items, callBackFunction) 
{
	if(checkExists(tableName) == true)
	{
		$("#" + tableName).html("");
	}

	if (asc == false) {
		items.sort(predicatBy(prop, "desc"));
		asc = true;
	}
	else if (asc == true) {
		items.sort(predicatBy(prop, "asc"));
		asc = false;
	}

	if (callBackFunction != undefined) callBackFunction();
}

//Rounds a number to the specified number of digits
function roundTo(n, digits) 
{
	if (digits === undefined) {
		digits = 0;
	}

	var multiplicator = Math.pow(10, digits);
	n = parseFloat((n * multiplicator).toFixed(11));
	return Math.round(n) / multiplicator;
}

//Check whether the item exists and returns a boolean
function checkExists(item)
{
	if (typeof item === 'undefined' || item === null || item.length <= 0)
	{
		return false;
	}
	else
	{
		return true;
	}
}

/*
*	Generic function that populates a select
*	dropdownID = id of the select
*	items = A JSON array of objects. Note the properties ID and ToString are used to populate the select
*	noResultsText = Outputs this text if the Array is empty
*	useID = a boolean that indidates whether the ID property must be used as the option value instead of the index
*/
function genericPopulateDropdown(dropdownID, items, noResultsText, useID)
{
	if (items.length > 0)
	{
		$("#" + dropdownID).html("");
		$("#" + dropdownID).append('<option value="-1">Select One</option>');

		for (var k = 0; k < items.length; k++)
		{
			var html = "";

			if (checkExists(useID) == true && useID == true)
			{
				html = '<option value="' + items[k].ID + '">' + items[k].ToString + '</option>';
			}
			else
			{
				html = '<option value="' + k + '">' + items[k].ToString + '</option>';
			}

			$("#" + dropdownID).append(html);
		}
	}
	else
	{
		if (checkExists(noResultsText) == true)
		{
			$("#" + dropdownID).append("<option value='-1'>" + noResultsText + "</option>");
		}
		else 
		{
			$("#" + dropdownID).append("<option value='-1'>No Results Found</option>");
		}
	}
}


//Regex validation to check whether the incoming string only contains numbers
function validateNumber(number)
{
	var only_nums_pattern = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
	var res = only_nums_pattern.test(number);
	return res;
}

//#endregion












