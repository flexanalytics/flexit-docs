---
id: saml
title: Set up SAML single sign-on in Okta
sidebar_label: SAML in Okta
---

The first step in configuring an application to support SAML based Single Sign-On from Okta is to set up an application in Okta.

In SAML terminology, what you will be doing here is configuring Okta (your SAML Identity Provider or “SAML IdP”), with the details of your application (the new SAML Service Provider or “SAML SP”).

Here is how to set up a SAML application in Okta:

> **Important**: If you are using the Developer Console you will first need to switch to the Classic UI. If you see Developer Console in the top left, click it and select Classic UI to switch.

1.  Log in to your Okta organization as a user with administrative privileges. If you don’t have an Okta organization, you can [create a free Okta Developer Edition organization](https://developer.okta.com/signup/).
2.  Click on the Applications link in the upper navigation bar
3.  Click on the green Create New App button
4.  In the dialog that opens, select the “SAML 2.0” option, then click the green “Create” button. If you do not see this option, make sure you are in the Classic UI (see Note above).
![](https://i1.wp.com/flexitanalytics.com/wp-content/uploads/2019/05/okta_flexit_new.png)

5.  In Step 1 “General Settings”, enter “FlexIt Analytics” in the “App name” field
![](https://i0.wp.com/flexitanalytics.com/wp-content/uploads/2019/05/okta_flexit_generalsettings.png)

6.  Upload the FlexIt app logo, then click the green Next button.
![](https://i1.wp.com/flexitanalytics.com/wp-content/uploads/2019/05/X.png)

7.  In Step 2 “Configure SAML,” section A “SAML Settings”, paste the URL below into the “Single sign on URL” and “Audience URI (SP Entity ID)” fields. The FlexIt URL will be in the form of protocol://servername:port/auth/callback, for example: https://carbon1:3030/auth/callback
![](https://i1.wp.com/flexitanalytics.com/wp-content/uploads/2019/05/okta_flexit_samlsettingsgeneral.png)

8.  In the “Attribute Statements” section, add three attribute statements. In the “Group Attribute Statements”, add one statement:
    1.  Attribute Statements
        *   “User.FirstName” set to “user.firstName”
        *   “User.LastName” set to “user.lastName”
        *   “User.email” set to “user.email”
    2.  Group Attribute Statements
        *   “Groups” set to “Starts with” text of “FlexIt”
    3.  Click Next to continue
    ![](https://i1.wp.com/flexitanalytics.com/wp-content/uploads/2019/05/okta_flexit_generalattributes.png)

9.  In Step 3 “Feedback”, select “I’m an Okta customer adding an internal app”, and “This is an internal app that we have created,” then click Finish.
![](https://i2.wp.com/flexitanalytics.com/wp-content/uploads/2019/05/okta_flexit_finish.png)

10.  The “Sign On” section of your newly created “FlexIt Analytics” application appears. Click on “View Setup Instructions” 
![](https://i1.wp.com/flexitanalytics.com/wp-content/uploads/2019/05/okta_flexit_ipmetadata.png)

11.  Keep this page open in a separate tab or browser window. You will return to this page later in this guide and copy the 3 settings into the FlexIt Configuration
![](https://i0.wp.com/flexitanalytics.com/wp-content/uploads/2019/05/okta_flexit_samlconfig.png)

12.  Log in to FlexIt as an Administrator, click on “Configuration” under Administration, then click “Authentication”
![](https://i2.wp.com/flexitanalytics.com/wp-content/uploads/2019/05/flexit_config_auth.png)

13.  Select the “SAML 2.0” type from the drop-down and map the items from step 10 above into the FlexIt configuration
![](https://i2.wp.com/flexitanalytics.com/wp-content/uploads/2019/05/flexit_config_authmap.png)

14.  In the FlexIt configuration, the “User Attribute Statements” and “Group Attribute Statements” should match the names used in step 7 above. Note the following options:
    *   “Sync Provider Groups?” defaults to “none”. Set it to “seed” if you want FlexIt to automatically assign the user group ONLY on the first login. Set it to “sync” if you always want FlexIt to use the Okta groups. If you use “seed” or “sync”, FlexIt will automatically assign the Okta group “FlexIt Admin” to the “Admin” role, “FlexIt Author” to the “Author” role, and “FlexIt Consumer” to the “Consumer” role. Note that the Okta group names must be assigned to the FlexIt Analytics application and exactly match FlexIt [Admin, Author, Consumer].
    *   “Default Group” defaults to “none”. If a user is assigned to the FlexIt Analytics application in Okta, but is not part of any Okta groups, you can automatically assign them either as a “Consumer” or “Author” in FlexIt.
15.  Click “Save” to finish the configuration in FlexIt. Okta SAML 2.0 authentication is now enabled.
