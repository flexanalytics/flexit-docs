---
id: install
title: Installation
hide_title: true
sidebar_label: Installation
---

# Installation

## Before you begin

### Download FlexIt

You need to have the FlexIt installer for the applicable operating system. If you have not already downloaded the FlexIt installer, please download now:

<a class="button button--outline button--primary button--lg" href="https://flexitanalytics.com/download">Download FlexIt</a>

### System Requirements

**Operating System**
*   Windows (Server or Personal)
*   Linux
*   Mac OS X is not currently supported

**Database Server**

The FlexIt server needs a database to store content. By default, it comes with an enterprise-level PostgreSQL database, but you can change this to any of the following supported databases.
*   MySQL
*   Microsoft SQL Server
*   Oracle
*   PostgreSQL

## Install FlexIt

Installing FlexIt is quick and easy.

1.  Download the installer if you have not already done so: [Download Now](https://flexitanalytics.com/download/)
2.  Locate the downloaded FlexIt installer executable, often in your “Downloads” folder
3.  Run the executable as “administrator” privileges
    > **Linux Only** – in some instances, you may need to mark the .run file as executable and run as root with the sudo command:
    > ```
    > chmod +x flexit-2018.09.01-linux-x64-installer.run
    > sudo ./flexit-2018.09.01-linux-x64-installer.run
    > ```

4.  You should now see the setup screen

    ![](https://i0.wp.com/flexitanalytics.com/wp-content/uploads/2018/05/setup1.jpg)

5.  If you want to use a different database than the included Postgres DB, or change other config options, then go to “Customized Setup” below. Otherwise you can click “Next” through the rest of the screens.
6.  At the last step, you’ll see a URL link to open FlexIt. You can click that link or paste it into your preferred browser.
    > **Note:** The default URL is http://localhost:3030
    
## Customized Setup

If you want to customize your FlexIt installation and configuration, here are your options as you progress through the setup process

1.  **Installation Directory** – you can change this setting to install FlexIt Analytics anywhere you would like.
2.  **Configure FlexIt Analytics** – this is where you set port, service name, and content database (described below)

    ![](https://i0.wp.com/flexitanalytics.com/wp-content/uploads/2018/05/setup_configure.jpg)

    *   **FlexIt Analytics Port**: this is the port that FlexIt runs on. If another process is using this port, the installer will force you to pick another port.
    > You can change the port later from [Administration > Configuration > Server Settings](administration#server-settings) or enable HTTPS ([see how](administration#https)).
    *   **Windows Service Name** (Windows only): when the machine you install FlexIt on restarts, the Windows Service makes sure that FlexIt is also up and running.
    *   **Install Postgres Database**: FlexIt needs a database to store content (i.e. reports, dashboards, users, etc.). If you want to use the default PostgreSQL 10 database server (high performing enterprise-level), leave this checked and select a port (default: 5433). If you do not check this, FlexIt will ask you to configure another database later. As mentioned above, that database must be one of the following: Microsoft SQL Server, PostgreSQL, MySQL, or Oracle.

3.  **Finish** – click “Next” on the rest of the screens and finish the installation

## Managing FlexIt (Post Installation)

### Modify Configuration

You can modify the FlexIt configuration from within the web application as an Admin at any point, as shown below. The database you chose to store content can be configured under “Content Database”. The server port and other settings can be configured under “Server Settings”. For detailed documenation on these and other configuration settings, see the [Administration](administration.md) guide

![](https://i1.wp.com/flexitanalytics.com/wp-content/uploads/2018/05/flexit_admin_config.jpg)


### Start/Stop FlexIt Server

> **Windows Only** - it is best to use the Windows Service to start and stop FlexIt. The service starts both the FlexIt server and the default PostgreSQL server (if installed)

You can start or stop the FlexIt service manually using scripts in the “[FlexIt Install Directory]/bin” directory.

Start FlexIt by running the `start_flexit` script

Stop FlexIt by running the `stop_flexit` script

### Modify Windows Service

In Windows installations, FlexIt comes with the NSSM service manager executable so that you can easily customize or remove the FlexIt Windows Service. You can use NSSM.exe in any documented way to add/remove/modify any service. In most instances, this is not necessary since FlexIt automatically creates a new service on installation and removes that same service on uninstallation.

### Default PostgreSQL Database

The default database where FlexIt stores content (users, reports, dashboards, etc.) is a PostgreSQL database. This is a highly-scalable enterprise-level database that can be used in a production environment. It is installed under the “[FlexIt Install Directory]/pgsql” directory and by default uses a trust account setting. If you decide to modify or migrate your Content Database at any time, you can change the settings in FlexIt under “Administration -> Configuration -> Content Database”, shown below:

![](https://i2.wp.com/flexitanalytics.com/wp-content/uploads/2018/09/flexit_admin_content.jpg)

### Uninstalling FlexIt

In the directory that FlexIt was installed, run the “uninstall” executable.

> **Important** - this will remove FlexIt, the default PostgreSQL database, and all other content. Make sure you have backed up everything if you may want to restore it in the future.

## Upgrade Installation

If you are upgrading to a newer version and already have FlexIt installed, you have a few options:

1.  Separate “Stand-alone” instance
2.  Overwrite the existing installation
3.  Migrate from existing to new installation
