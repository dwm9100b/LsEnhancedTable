Mar 6, Here we go again! This is ANOTHER major update... 

eht_final

•Ability to sort on multiple columns
•Easily Toggle Ascending, Descending, or no sort
•Columns show their individual position in the sort order
•Filtering on individual columns
•Filter on Strings, Numerics and Dates
•Popup filter dialog
•Filtering can be disabled if not needed
•Can be configured for batch processing
•Batch mode can also be dynamically toggled
•Compatible with latest LightSwitch update

Lets start by having you go up to http://github.com/dwm9100b/EnhancedTable and grab the latest code for this project. Make sure you right click on the downloaded zip, go to properties, and click on the Unblock button before unzipping.

As usual though, I'll go thru a step by step process on how we got to the project you just downloaded. We've made this so easy its going to be hard to resist. So lets get to it...
1.Create a new LightSwitch HTML Project
2.Lets name it: EnhancedTable
3.We're going to use an external data source
4.Select the OData Service option
5.Use the following endpoint:◦http://services.odata.org/northwind/northwind.svc

6.Uncheck the 'as read-only'
7.Under authentication, select none
8.When prompted to Choose your Entities◦Select Order
◦Expand Order, Related Entities
◦Select Employee

9.Name the data source: Northwind
10.Click on finish, save your project

That's all we'll have to do with the 'Server' part of this project. The rest of the tutorial will be with the HTML Client.
1.Right click on your HTML Client project
2.Select Manage NuGet Packages
3.Select the Online packages
4.Search and install Lo-Dash◦Lo-Dash is an awesome, lightweight alternative to Underscore.js. They've even included a ton of extras. Highly recommend that you check it out!

5.Right click on the Content folder
6.Add, Existing Item
7.Navigate to the downloaded project
8.Under its HTML Client Content folder, select itgLsEnhancedTable.css
9.Right click on your Scripts folder
10.Add, Existing Item
11.Navigate to the downloaded project again
12.From its Scripts folder, select itgLsEnhancedTable.js
13.Add all 3 files to your HTML Client default.htm◦itgLsEnhancedTable.css
◦Lo-Dash.js
◦itgLsEnhancedTable.js


Great! That's all the pre-work needed. Now lets go create our screens.
1.Right click on your Screens folder
2.Select Add Screen
3.Lets use the new "Common Screen Set"
4.Screen Data, Select Northwind.Orders
5.Once LightSwitch does its magic, you'll land on BrowseOrders
6.Change the default Tile List for Orders to a Table
7.Drag over some additional Order properties◦Freight
◦ShipName
◦ShipCity
◦Employee

8.Expand the Employee, change to a row layout
9.Drag the Employee Last Name up under Ship City
10.Delete the rest of the row layout for employee
11.Change the Display Name for Last Name to Employee Last Name

Here is how the screen should look by now
eht_BrowseOrdersScreen_Base


12.Good time to do a full build and test run your app. Test the out of the box functionality.◦Notice you'll only able to sort a single column at a time
◦Also the Search only supports strings
◦Not able to search on multiple columns
◦Unable to remove the Search input once its displayed


Ok, enough of that. Lets supercharge this table!

We start off by creating a few local properties via the Add Data Item. Uncheck the "Is Required" on all you create.
1.Type: String, Name: ColumnName
2.Type: String, Name: Operator1
3.Type: String, Name: Value1
4.Type: String, Name: Concat
5.Type: String, Name: Operator2
6.Type: String, Name: Value2

The following new Local Properties need to have a Choice List. So for each one:
•Operator1
•Concat
•Operator2
1.Over in Properties
2.Click on Choice List
3.Add a single value, "a"

We dynamically load choices, hence the reason for just a single value so LightSwitch will initialize the control

Great! Now lets go create our Filter popup
1.Add Popup
2.Leave as default Rows Layout
3.Change the name to: FilterPopup
4.Case sensitive!
5.In order, drag the following local properties into this popup◦ColumnName
◦Operator1
◦Value1
◦Concat
◦Operator2
◦Value2

6.Change Column Name to be a Text control
7.In properties for each, change Label Position to None

You should have a screen that looks as so
eht_BrowseOrdersScreen_WithFilterProperties

8.In your popup, add a new group, change it to Columns Layout
9.Add a button into this group◦Write my own method
◦Method name: SetColumnFilter
◦Change its Display Name to "Set"

10.Add another button into this group◦Write my own method
◦Method name: ClearColumnFilter
◦Change its Display Name to "Clear"


Here is how your final layout of your popup should be

eht_BrowseOrdersScreen_FinalPopup

Before we go wiring this all up, lets add a couple of main screen buttons to really show the flexibility
1.Up at the Command Bar for the Order List Tab
2.Add a new Button◦Write my own method
◦Method name: ClearAll
◦Change your icon

3.Add a new Button◦Write my own method
◦Method name: ExecuteBatch
◦Change your icon

4.Add a new Button◦Write my own method
◦Method name: ToggleBatch
◦Change your icon


Done with the screen, here is a picture of how the final layout

eht_BrowseOrdersScreen_FinalLayout

Go ahead and save your solution and do a build.

Now on to the code, this will be the painless side of it.
1.Click on the Orders Table control
2.Edit PostRender Code
3.Add the following code into its method[code language="javascript"]
// Store our enhanced table as part of our contentItem
contentItem.enhancedTable = new itgLs.EnhancedTable({
    element: element,
    contentItem: contentItem
});

[/code]


This is the bare minimum you need to do. Go do a build and run your app. Couple of things
•Multi column sort works
•Click on the Column name to toggle direction
•Notice the position number as you add more columns
•Notice as you remove a column sort, positions adjust
•Filter popup will display, but we've not wired it up yet

Ok cool eh?

Lets go wire some things up
1.Double click on your ClearAll button
2.Add the following code to its execute method
[code language="javascript"]
// Get our table
var table = screen.findContentItem("Orders").enhancedTable;

// Clear all the sorts and filters
table.clearAll();

// If we are not in batch mode, reQuery
if (!table.getBatchMode()) table.reQuery();

[/code]

3.Double click on your ExecuteBatch button
4.Add the following code to its method
[code language="javascript"]
// Get our table
var table = screen.findContentItem("Orders").enhancedTable;

// Execute the sort/filter settings
table.reQuery();
[/code]

5.Double click on your ToggleBatch button
6.Add the following code to its method
[code language="javascript"]
// Get our table
var table = screen.findContentItem("Orders").enhancedTable;

// Toggle batch mode
table.setBatchMode(!table.getBatchMode());
[/code]

7.Edit PostRender Code for popup button SetColumnFilter
8.Add the following code to its method
[code language="javascript"]
 // A check mark icon with text at the bottom
 itgLs.ui.convertToIconicButton(element, contentItem, "accept");
[/code]

9.Edit PostRender Code for popup button ClearColumnFilter
10.Add the following code to its method
[code language="javascript"]
// A minus icon with text at the bottom
itgLs.ui.convertToIconicButton(element, contentItem, "remove");
[/code]

11.Double click on your popup button SetColumnFilter
12.Add the following code to its execute method
[code language="javascript"]
// Get our table
var table = screen.findContentItem("Orders").enhancedTable;

// Call our set filter function for this column only
table.setColumnFilter();

// Close the popup
table.closeFilterPopup();

[/code]

13.Double click on your popup button ClearColumnFilter
14.Add the following code to its execute method
[code language="javascript"]
// Get our table
var table = screen.findContentItem("Orders").enhancedTable;

// Call our clear filter function for this column only
table.clearColumnFilter();

// Close the popup
table.closeFilterPopup();
[/code]


Not too many lines of code now is it? Would be great if someone out there creates a screen template!

So there you have it... Go ahead and run the app and test away
•Test multi column filtering
•Add sorting into the mix
•Toggle Batch
•Set up your filter and sorts
•Then Execute the batch
•Try the one click clear all, less server trips!

You can pass the following properties when you create the EnhancedTable

filterPopupName
 : Name of the filter popup
 : Defaults to FilterPopup

filterPopupColumnName
 : Name of the ColumnName property
 : Defaults to ColumnName

filterPopupOperatorName1
 : Name of Operator1 property
 : Defaults to Operator1

filterPopupOperatorName2
 : Name of Operator2 property
 : Defaults to Operator2

filterPopupConcatName
 : Name of the Concat property
 : Defaults to Concat

filterPopupValueName1
 : Name of the Value1 property
 : Defaults to Value1

filterPopupValueName2
 : Name of the Value2 property
 : Defaults to Value2

batchMode
 : True/False
 : Defaults to false

filterDisabled
 : True/False
 : Defaults to false

So whats missing and left to do?


Validations on the filter input boxes
Ability to dynamically change the input boxes to a native control
Anything else I forgot... :)

