---
id: report
title: Reporting User Guide
hide_title: true
sidebar_label: Reports
---

# Reporting User Guide

## New Analysis

To create a new report, click on the *New Analysis* button in the portal. You'll see a list of Data Models that you have permission to (contact your admin if your data model is not shown). Some users may see the *New SQL Analysis* button, which allows you to write custom SQL to pull report data.

> **Note**: the *Consumer* role does not have access to create new reports, and thus will not see the *New Analysis* or *New SQL Analysis* buttons. Check your role from [My Account](portal.md#header).

One you've selected a data model, you'll be taken to the Report design page.


## Report Page (ad-hoc)

When starting a new report, you'll add fields from the left pane and add filters from the top pane. New reports start in "ad-hoc" mode, meaning that live data is retrieved as you add new fields and filters. You can exit "ad-hoc" mode by clicking the *Builder Page* button in the middle of a new analysis or from the report menu.

![](/img/report/report_page.png)

### Add Fields

From the *Fields* menu on the left, you can add fields by dragging, double-clicking, or right-clicking. As you bring fields into the working area, data will be displayed in a grid. You can visualize (chart) your data by simply clicking the ![](/img/report/viz_button.png) Viz button at the top-right of the grid.

> **Filters** - if you're working with large amounts of data, or want to narrow your results, add report [filters](#filters) before adding fields


### Filters

Filter Group

Filter Configuration
Cascading
Num of Required Filters
Expression


Group

Pivot

Sort
Sort by another field


Aggregate


Calculations


Field (More Settings...)
Hide Field
Drills
Data Type


Save/Save As


Favorite

Load External Data


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



## Builder Page (No Data)

The *Builder Page* allows you to create your report without live (ad-hoc) data. You can add fields, filters, pivots, etc. When you're done building, you can click *Run Report* and start working with the data.

> To always open to the builder page, go to report settings and uncheck *Run Automatically*
