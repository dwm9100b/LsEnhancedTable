/// <reference path="~/GeneratedArtifacts/viewModel.js" />
/// <reference path="../../Scripts/itgLsEnhancedTable.js" />


myapp.BrowseOrders.Orders_postRender = function (element, contentItem) {

	// Store our enhanced table as part of our contentItem so we can get at it
	contentItem.enhancedTable = new itgLs.EnhancedTable({
		element: element,
		contentItem: contentItem
	});

};
myapp.BrowseOrders.ClearAll_execute = function (screen) {

	// Get our table
	var table = screen.findContentItem("Orders").enhancedTable;

	// Clear all the sorts and filters
	table.clearAll();

	// If we are not in batch mode, reQuery
	if (!table.getBatchMode()) table.reQuery();

};
myapp.BrowseOrders.ExecuteBatch_execute = function (screen) {

	// Get our table
	var table = screen.findContentItem("Orders").enhancedTable;

	// Execute the sort/filter settings
	table.reQuery();

};
myapp.BrowseOrders.ToggleBatch_execute = function (screen) {

	// Get our table
	var table = screen.findContentItem("Orders").enhancedTable;

	// Toggle batch mode
	table.setBatchMode(!table.getBatchMode());

};
myapp.BrowseOrders.SetColumnFilter_postRender = function (element, contentItem) {

	// Check mark icon, keep text at the bottom
	itgLs.ui.convertToIconicButton(element, contentItem, 'accept');

};
myapp.BrowseOrders.ClearColumnFilter_postRender = function (element, contentItem) {

	// Minus icon, keep text at the bottom
	itgLs.ui.convertToIconicButton(element, contentItem, 'remove');

};
myapp.BrowseOrders.SetColumnFilter_execute = function (screen) {

	// Get our table
	var table = screen.findContentItem("Orders").enhancedTable;

	// Call our set filter function for this column only
	table.setColumnFilter();

	// Close the popup
	table.closeFilterPopup();

};
myapp.BrowseOrders.ClearColumnFilter_execute = function (screen) {

	// Get our table
	var table = screen.findContentItem("Orders").enhancedTable;

	// Call our clear filter function for this column only
	table.clearColumnFilter();

	// Close the popup
	table.closeFilterPopup();

};