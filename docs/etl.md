---
id: etl
title: Data Transformation (ETL)
hide_title: true
sidebar_label: Data Transformation (ETL)
---

# Data Transformation (ETL)

## Overview
The data transformation feature can be used to Extract, Transform, and Load (ETL) data from one place to another. Data flows make it easy to pull data from many different sources of data in order to cleanse, validate, transform, and integrate data into a wide array of databases. 

## Getting Started
From the *Administration > Data Transform* list, click on an existing transformation or *New Data Transform* at the top. This will bring you into the design process for a data transformation. Use the tools and design panel to create your transformation process.

![](/img/etl_list.png)

## Tools
There are three (Container, SQL Task, Data Flow) simple tools you can use to design your transformation. Drag-and-drop any of the following tools from the *Tools* panel into the *Transformation Design* panel. The number order of the tasks will be the order that they are processed.

### Container
Containers can hold *SQL Tasks* or *Data Flows*. Everything inside a container will execute in parallel (i.e. synchronous).

### SQL Task
Use SQL tasks to execute any SQL command. This is commonly used to set database settings or build custom insert/update/delete (CRUD) statements.

### Data Flow
Data flow tasks are used to extract data from a source and load it into a destination.

![](/img/etl_dataflow.png)

#### Name
To change the name/description to something unique, simply click the "Data Flow" text and enter a name.

#### Source
Data transform sources extract data from configured [data sources](administration#data-sources). The drop-down list in the top-left shows existing data sources and also allows you to create a new data source by selecting *Add New*. The "# Rows" drop-down will limit the number of rows returned, allowing you to more efficiently test the SQL and set the columns. The limit is only applied for testing in this window, but does not apply when the transformation is ran later.

Click the *Run* button to test and verify your SQL and/or data results.

> **Important** - You must "Run" the source if you want to do column mapping

![](/img/etl_sqlsource.png)

#### Column Mapping
![](/img/etl_mapping.png)

Click on the arrow to map the source columns to destination columns.
> **Important** - if you do not map the columns, the natural order of the source and destination will be used.

Here are the main options for mapping:
* Order button: automatically map all the columns based on the order of the columns from the source
* Clear button: remove all existing mappings
* Convert: convert data type from source type into destination type
* Enter Value: manually enter a static value as a source column by setting the Source Column Name to "Enter Value"


#### Destination
Configuring the destination allows you to set the table that you would like to load source data into. Checking "Truncate" will execute the `TRUNCATE TABLE TABLENAME;` command, emptying the table rows, prior to loading data.

![](/img/etl_destdiff.png)

If the source and destination database are the same, then an additional "Quick Mode" option is available. This executes the `insert into [DEST] select cols from [SOURCE]` statement rather than chunking data, which is typically much faster.

![](/img/etl_destsame.png)



## Configure (Settings)
While designing an ETL process, you can click on ![](/img/etl_configbtn.png) in the top-right to open the configuration properties. There are three main areas:

1. Success Handling - configuration for what to do when the job runs successfully. *Email Admins on Success* will send an email to all FlexIt users in the *Admin* role. *Email on Success* allows you to enter comma separated email addresses that might differ from the admins. An SMTP email server must be configured ([show me](administration#smtp-email)).
2. Error Handling - similar to *Success Handling*, but also has an option for *Stop on Fail*. This stops the job immediately if any task fails. If this is not checked, individual task failures will still result in a successful job run.
3. Specification - this is the text specification for the current job. This can be used to import/export jobs, which is useful for backups or migrating a job from one environment to another. The specification is in JSON format.


![](/img/etl_config.png)




## Run
There are a few ways to run ETL jobs and tasks. 

### Interactive
Interactive mode allows you to run the entire job or individual tasks with real-time updates on status, rows loaded, etc. You can run individual Data Flow tasks by right-clicking on them in the design pane and selecting *Run*. The entire job can be run by clicking on the *Run* button in the top-right. Both of these will immediately run the tasks and show results in your browser, as shown here:

![](/img/etl_concurrent.png)

### Background
Background mode allows you to run the job in the background, either immediately or scheduled for later. To run the background job, go to the list of jobs and click on the ellipsis:
![](/img/etl_runnow.png)

1.  *Run Now* starts the job immediately and runs it in the background
2.  *Schedule* allows you to set a date/time in the future to run the job ([show me](#schedule))


## History
History shows the status and detail of jobs. To show a history for all jobs, click the *Job History* button at the top of the jobs list page. To show the history for an individual job, there are two methods:

1.  In design mode, click on the ![](/img/etl_historybtn.png) button. 
2.  From the jobs list, click on the ellipsis and select *History*

## Schedule
Jobs can be scheduled to run at a specific time in the future with a recurring pattern. To schedule a job, click the ellipsis to the right of the job and select *Schedule*.

![](/img/flex_schedule.png)

Enter properties to fit your scheduling needs:
* **Disabled** - click this in order to disable the job. The schedule will not be run when disabled, but it will still be available for you to enable later.
* **Type**
  * Daily - run every day at a specific time
  * Weekly - run weekly on selected days and times
  * Monthly - run monthly, e.g. on the 1st day of the month, on the first Monday of the month, etc. 
  * Cron Format - if none of the above options work, then cron format allows you to create any type of pattern possible ([see how](https://github.com/node-schedule/node-schedule#cron-style-scheduling))
* **Start** - date to start the scheduled job
* **End** - last date the job will be scheduled to run. Click *No End Date* below to run forever
* **No End Date** - click this to have the job run forever

## Clone (Backup)
Cloning a data transformation is an easy way to copy the transformation. This can be useful to save backups or create a new transformation from an existing one. In order to clone, go to the list of all data transformations, click on the ellipsis to the right of the transformation, and select `Clone`.
> **Tip** - there are a couple other ways to back up data transformations:
>
> 1. Copy the specification from the transformation [Configuration](#configure-settings) and save in a text file
> 2. Create a backup using the [Admin > Config > Backup and Restore](administration#backup-and-restore) feature

## Extract Data from Oracle BI
You can use Oracle BI (OBIEE) as a source to extract data from. Source data can come from either an existing Oracle BI report or a Logical SQL statement.

### Logical SQL Source

> Reference Guide: https://docs.oracle.com/middleware/12212/biee/BIESQ/toc.htm

Logical SQL must adhere to the Oracle BI syntax. You can get the Logical SQL for a report from the *Advanced* tab, shown here:

![](/img/oracle_logicalsqlreport.png)

You can test run the Logical SQL from Oracle BI administration. Click on *Administration* in the top-right, click *Issue SQL* under *Maintenance and Troubleshooting*, enter your SQL and click *Issue SQL*.

![](/img/oracle_logicalsqladmin.png)

### Report Source

You can select an existing report to extract source data. If the selected report has parameters (i.e. prompts), then you can enter values into the input next to the prompts.

> **Loop** - if there is a limit to the number of rows a report can return, you can use the "Loop" feature. Clicking the loop checkbox sends multiple smaller requests for the data. The example below will send four separate requests to get the data for all four Segment Codes.

![](/img/etl_reportsource.png)

![](/img/etl_biprompts.png)

### Connecting to Oracle BI

Connect to Oracle BI by creating a new [Data Source](administration#data-sources). Similar to other data sources, you give the connection a *name* and enter a *host* and *port*. 

*   **Web Services Path** - defaults to */analytics-ws/saw.dll*
*   **Web Services Version** - enter the version that your Oracle BI installation is using. You can typically verify the web services version by going to the full URL and typing *?wsdl* at the end. For example, https://abcd.fa.us2.oraclecloud.com/analytics-ws/saw.dll?wsdl.
*   **Username** - enter a username to connect with. It's good practice to use a system account here, if possible.
*   **Retry on Fail** - if a connection fails, retry *n* times. Oracle BI web service requests often fail for no apparent reason. This setting can help mitigate the issue by retrying the request if it initially fails.
*   **Use Custom Login** - if two-factor (2FA) or multi-factor authentication (MFA) are used, you may need to use a custom login script. This setting allows you to use the Node JS script *[flexit_install_dir]/config/custom/CustomModule.js* to properly authenticate and allow access to web services and/or the Oracle GO Url. This process uses the [Selenium Web Driver](https://selenium.dev/), a widely-used and secure tool. 
*   **Allow GO Url** - in some cases, the Oracle BI *GO Url* can be faster and more reliable than the Oracle web services. Enable this setting to allow FlexIt to choose which method to use, with the goal of increasing performance and reliability.

![](/img/oracle_datasource.png)
