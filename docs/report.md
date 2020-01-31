---
id: report
title: Reporting User Guide
hide_title: true
sidebar_label: Reporting User Guide
---

# Reporting User Guide

## New Analysis

To create a new report, click on the *New Analysis* button in the portal. You'll see a list of [Data Models](datamodeling.md) that you have permission to (contact your admin if your data model is not shown). Some users may see the [*New SQL Analysis*](#sql-report) button, which allows you to write custom SQL to pull report data.

> **Note**: the *Consumer* role does not have access to create new reports, and thus will not see the *New Analysis* or *New SQL Analysis* buttons. Check your role from [My Account](portal.md#user).

One you've selected a data model, you'll be taken to the Report design page.


## Report Design (ad-hoc)

When starting a new report, you'll add fields from the left pane and add filters from the top pane. New reports start in "ad-hoc" mode, meaning that live data is retrieved as you add new fields and filters. You can exit "ad-hoc" mode by clicking the [*Builder Page*](#builder-page) button in the middle of a new analysis or from the report menu.

![](/img/report/report_page.png)

### Add Fields

From the *Fields* menu on the left, you can add fields by dragging, double-clicking, or right-clicking. As you bring fields into the working area, data will be displayed in a grid/table. You can visualize (chart) your data by simply clicking the ![](/img/report/viz_button.png) Viz button at the top-right of the grid.

When fields are already on a report, you can add new fields to specific areas of the grid or visualization by dragging, shown below:

![](/img/report/field_drag.gif)

> **Filters** - if you're working with large amounts of data, or want to narrow your results, add report [filters](#filters) before adding fields

### Filters

Add filters to narrow your search and focus your data exploration. They also improve performance on large data sets. The *![](/img/report/add_filter.png)* button is a quick way to search all your fields and apply a filter to a selected field, regardless of whether or not the field is displayed on in the report grid and/or visualization. Filters can be applied to fields with data types of text/string, numeric, or date/time. Depending on the data type, the filter will have different options. 



#### Filter data types

**Text/string**

The text/string filter will allow you to include/exclude selected items or filter items that start with, end with, or contain certain text.

![](/img/report/filter_text.png)

**Numeric**

The numeric filter will allow you to include/exclude values in a certain range (leaving to/from blank sets the range to min/max).

![](/img/report/filter_numeric.png)

**Date/time**

The date filter allows you to include/exclude a range of dates, or filter a specified number of days/weeks/months/years from the current date.

![](/img/report/filter_date.png)


#### Filter Configuration

You can access more advanced filtering features from the [Builder Page](#builder-page). 

To configure individual filters, hover over a filter and click the *Configuration* button (labeled *1* below). For report-level filter configuration, click the *Configuration* button in the top-right of the filter panel (labeled *2* below).

![](/img/report/filter_config.png)

Individual filter configuration allows you to modify the following attributes:
* Label - the text that displays next to the filter
* Description - text or html that appears when you hover over the *info* icon next to a filter
* Use Value - if you want to use a different value than is displayed. e.g. filter on Country Code, but display Country Title
* Display Value - display a different value than is used for the filter
* Multiple - for dropdown lists, allow a single selection or multiple
* UI Type - *dropdown* shows a list of values, *manual* allows you to enter free-form text, *checkbox* shows values in a checkbox or radio button, *expression* allows you to enter an expression (e.g. *Year = year(current_date)*).
* Required - is a filter selection required to run the report
* Locked - can the filter be removed from the report
* No Cascade - is the list of values dependent on other report filters
* Defaults - default values to show on the report
* Sort - for dropdown lists, display values in ascending or descending order
* Sort By - sort display values by another field
* Hide - do not show the filter on reports. The filter is still applied.
* Prefilters - apply a filter to the filter so only select values are shown.

Report-level filter configuration allows you to modify the following attributes:
* Filter Cascading - filter values in dropdown will be based on all other report filters. For example, if a report on olympics data has a filter for *Country=USA*, then a new filter for *Athlete* will only show values for *USA*. If an individual filter has *No Cascade* enabled, then filter cascading will not apply for that filter. 
* Number of Required Filters - users must have at least this many filters on a report. This is typically used to prevent users from accidentally running reports with no filters, often on larger data sets.
* Expression - allows for building of complex filter expression

![](/img/report/filter_report.png)

#### Filter Group

From the [Builder Page](#builder-page), when you click on the *Add Filter* button, you'll see an option for *Add Filter Group...*, as shown here:

![](/img/report/filter_addgroup.png)

This feature allows you to create a prompt where each item is a filter. For example, instead of having a user select a date range, you could create a filter group with three individual filters for *Past month*, *Past 6 months*, and *Past 12 months*. This makes it quicker/easier for the user, but also makes it so they can't accidentally select the wrong dates. Here's what the resulting filter will look like to the user:

![](/img/report/filter_group.png)


### Grid

The data grid/table is like a spreadsheet in your browser and is a great way to explore your data before you chart/visualize. Similar to Excel, you can pivot, group, sort, filter, aggregate (i.e. sum, avg, count, etc.), calculate, and much more.

#### Group

Grouping allows you to organize data in sets that can be aggregated and expanded/collapsed for quickly exploring your data. Grouping is typically done on string/text or date types, but numbers can also be grouped if they're configured as *dimensions* that do not aggregate.

To group, click or right-click on the column/field or column header and select *Group*, as shown below. You can un-group a column by clicking or right-clicking and selecting *Remove Group*.

![](/img/report/group.gif)

#### Pivot

Pivoting a field displays the values at the top, from left to right as columns. To pivot, click or right-click on the column/field or column header and select *Pivot*, as shown below. You can remove the pivot by clicking or right-clicking and selecting *Remove Pivot*.

![](/img/report/pivot.gif)

#### Sort

You can sort a field/column a few different ways:
1. Click the column header, once for ascending, again for descending, and once more to remove the sort
2. Right-click the column or column header and select *Sort Ascending/Descending/None*
3. You can sort by another field that is not displayed on the report. Simply right-click the column, select *More Settings...*, and select a field from *Sort by Other Field*.

#### Aggregate

All columns can be aggregated by simply right-clicking the column, going to *Aggregate* and then selecting the type of aggregation that you would like to do (i.e. sum, avg, count, etc.). Numbers/measures and text/dimensions will allow different types of aggregation.

If columns are grouped, then aggregated columns will show summaries at each grouping level as well as the bottom of the report (hide the total footer from [Grid Configuration](#grid-configuration)). If you'd like to to complex aggregations and/or change aggregation types at different grouping levels, then you can select *Advanced...* as the aggregate type from the context-menu or [Field Configuration](#field-configuration)

The example below shows how to do an *Advanced Aggregation* and set different aggregation types at grouping levels. It counts distinct Athlete Names and gives a sum for totals (you can rename the column by setting the label in [Field Configuration](#field-configuration)):

![](/img/report/advanced_aggregation.gif)

#### Calculations



#### Field Configuration

Field (More Settings...)
Hide Field
Drills
Data Type

Re-order columns


Save/Save As


Favorite

Load External Data


#### Grid Configuration

Grid
    Export Data
    Fit Columns
    Auto-size
    Suppress Zeros
    Summary Footer
    Groups Expanded
    Conditional Formatting


Charts (Visualization)


Admin
    View SQL


Report Settings
    Report ID
    Run Automatically
    Change Data Model
    Specification


Import/Export Report from specification



## Builder Page

The *Builder Page* allows you to create your report without live (ad-hoc) data. You can add fields, prompts/filters, pivots, etc. When you're done building, you can click *Run Report* and start working with the data. 

> To always open to the builder page, go to report settings and uncheck *Run Automatically*

### Prompts

Prompts are filters displayed on the Builder Page that allow users to narrow the data results before the report is run. For example, a car sales report might prompt the user to select *Year*, *Make*, and *Car Model*. This helps users focus their data results, but also ensures that reports run faster by querying less data. Prompts can be added to the Builder Page with no selections made, or they can also have some default selections.

## SQL Report

