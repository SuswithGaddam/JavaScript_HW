// Get references to the tbody element, input fields and buttons
var tbody = document.querySelector("tbody");
var datetimeInput = document.querySelector("#datetime");
var cityInput = document.querySelector("#city");
var stateInput = document.querySelector("#state");
var countryInput = document.querySelector("#country");
var shapeInput = document.querySelector("#shape");
//var commentsInput = document.querySelector("#comments");
var searchButton = document.querySelector("#search");
var submitButton = document.querySelector("#submit");
var resetButton = document.querySelector("#reset");

// Add an event listener to the buttons, call handle***ButtonClick when clicked
searchButton.addEventListener("click", handleSearchButtonClick);
resetButton.addEventListener("click", handleResetButtonClick);

// Set filteredData to dataSet initially
var filteredDataSet = data;

// Function to load the data to the tbody
function loadTable() {
  tbody.innerHTML = "";

  for (var i = 0; i < filteredDataSet.length; i++) {
    // Get the current sighting object and its fields
    var data = filteredDataSet[i];
    var fields = Object.keys(data);

    // Create a new row in the tbody, set the index to be i + startingIndex
    var row = tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell and set its inner text to be the current value at the current address's field
      var field = fields[j];
      var cell = row.insertCell(j);
      cell.innerText = data[field];
    }
  }
  console.log("Data loaded to table: " + filteredDataSet.length)
}
// Render the table for the first time on page load
loadTable();

function handleResetButtonClick() {
    // loadTable();   
   // Clearing the input fields
   datetimeInput.value = "";
   cityInput.value = "";
   stateInput.value = "";
   countryInput.value = "";
   shapeInput.value = "";


}

function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

// Search the existing UFO info
function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDatetime = datetimeInput.value.trim().toLowerCase();
  var filterCity = cityInput.value.trim().toLowerCase();
  var filterState = stateInput.value.trim().toLowerCase();
  var filterCountry = countryInput.value.trim().toLowerCase();
  var filterShapes = getSelectValues(shapeInput);
  
  // Set filteredDataSet to an array of all addresses whose "state" matches the filter
  filteredDataSet = data.filter(function(data) {
    var dateDatetime = String(data.datetime).toLowerCase();
    var cityField = String(data.city).toLowerCase();
    var stateField = String(data.state).toLowerCase();
    var countryField = String(data.country).toLowerCase();
    var shapeField = String(data.shape).toLowerCase();

    var goodRecord = 
    (filterDatetime.length === 0 || dateDatetime === filterDatetime) &&
    (filterCity.length === 0 || cityField.includes(filterCity)) &&
    (filterState.length === 0 || stateField === filterState) &&
    (filterCountry.length === 0 || countryField.includes === filterCountry) &&
    (filterShapes.length === 0 || filterShapes.includes(shapeField));
    
    return goodRecord;
  });
  console.log("filtered: " + filteredDataSet.length);
  loadTable();
  handleResetButtonClick();
}