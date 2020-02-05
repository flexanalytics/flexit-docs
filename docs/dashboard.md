---
id: dashboard
title: Dashboards
hide_title: true
sidebar_label: Dashboards
---

# Building Dashboards

![](/img/dashboard/dashboard.png)

## New Dashboard

To create a new dashboard, click on the *![](/img/portal/btn_new_dashboard.png)* button in the portal. Now you can select a layout template with predefined cards, or build the dashboard from scratch, as shown below.

![](/img/dashboard/layouts.png)

> **Note**: the *Consumer* role does not have access to create new dashboards, and thus will not see the *New Dashboard* button. Check your role from [My Account](portal.md#user).

## Dashboard Design

To build a dashboard, add [Cards](#cards) to the design work area and then add widgets (charts, tables, etc.) to each card. You can move cards by dragging them, or you can resize them by dragging their edges.

![](/img/dashboard/design.png)

### Toolbar

The toolbar allows you to save the dashboard, add it to your favorites, as well as add [Cards](#cards) and [Filter Panels](#filter-panel). When not in design mode, you'll have to click *Edit* in the toolbar to enter design mode.

*![](/img/dashboard/toolbar.png)*

### Cards

Cards are panels that hold charts, tables, and other widgets on your dashboard. If you selected a layout template when you first created the dashboard, then blank cards will already be in the design work area. Otherwise, you'll need to add cards from the Toolbar.

Blank cards look like this:

*![](/img/dashboard/card.png)*

#### Add Content

Click the *![](/img/dashboard/card_addcontent.png)* button in the middle of the card to add new content to the card. You can always edit the content in the future from the [Card Toolbar](#card-toolbar) edit button.

Clicking the *Add* or *Edit* buttons will open the Card Designer (shown below), which allows you to design content from a *![](/img/portal/btn_new_analysis.png)* or search existing content. When searching existing content, double-click the report to open it for designing. Once you're done designing your content, click *Done* and it will be added to the dashboard.

![](/img/dashboard/card_designer.png)

> **Important** - when you use existing content on a dashboard card, any modifications will *NOT* affect the existing report. Also, any modifications to the existing report will not affect the dashboard content item.

#### Card Toolbar

The card toolbar appears in the top-right of a card when you hover your cursor over the card. The options available are:
* *![](/img/dashboard/card_newwindow.png)* - opens the card in a new window/tab
* *![](/img/dashboard/card_snap.png)* - snap fit-to-space expands the card until it bumps into other cards
* *![](/img/dashboard/card_edit.png)* - edit the card content, or add new content
* *![](/img/dashboard/card_delete.png)* - removes the card from the dashboard

### Filter Panel

Filter panels are cards that contain *global* filters. Global filters are applied to the data in every card on the dashboard. Like regular cards, filter panels can be resized and moved to anywhere on the dashboard.

![](/img/dashboard/filter_panel.png)

## Using Dashboards

When running dashboards, you are no longer in [Design Mode](#dashboard-design). Although you can no longer move, resize, or edit cards, there are many interactions available.

In the top-right of each card, you can change to any type of visualization, shown here:

*![](/img/dashboard/viz_selector.png)*

You can also click the *![](/img/dashboard/card_newwindow.png)* New Window button in the [card toolbar](#card-toolbar), which opens the card in a new tab.

You can also change metrics, series, x-axis, and more from the title. In the example below, you can click on *Total Medals* and change it to *Gold Medals* to see a different metric:

*![](/img/dashboard/changedata.png)*

Lastly, you can interact with the visualization just like any other report by hovering, clicking, and so on.

