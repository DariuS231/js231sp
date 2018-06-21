---
title: Changing the Access Requests Settings of a SharePoint Online site with JavaScript (JSOM)
author: Dario Alvarez
tags:
  - JSOM
  - SharePoint
categories:
  - SharePoint
date: 2016-07-12 15:08:28
---

Recently I got a requirement from a client that wanted to be able to modify the **Access Requests Settings **of a SharePoint online site to:

*   Prevent users from Sharing the site and individual files and folders.
*   Prevent users from inviting others to the site members group.
*   Prevent non authorized users from sending access requests.

{% asset_image Changing-the-Access-Requests-Settings-of-a-SharePoint-Online-site-with-JavaScript1.png "Changing the Access Requests Settings of a SharePoint Online site with JavaScript"%}

This needed to be done with the JavaScript Object Model and the code I used to meet this requirement is the following. 
<!-- more -->
{% gist df4727f0a20f571802c846c4c7991e92 %} 

I had to split the logic into two requests. On the first request, I obtained the web and the group of users who had been given contribute permissions to the Web site.

``` javascript
var web = ctx.get_web();
var meGroups = web.get_associatedMemberGroup();
ctx.load(web);
ctx.load(meGroups);
```

On the second request, I set the configurations over the web and groups objects:

*   Prevent users from Sharing the site and individual files and folders by setting the [**Members Can Share**](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.client.web.memberscanshare.aspx) property of the current web to **false**.

``` javascript    
web.set_membersCanShare(false);
```

*   Prevent non authorized users from sending access requests by setting the **[Allow Members Edit Membership](https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.group.allowmemberseditmembership.aspx)** property of the groups given contribute permission to **false**.

``` javascript
meGroups.set_allowMembersEditMembership(false);
```

*   Prevent users from inviting others to the site members group by setting the [**Request Access Email**](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.client.web.requestaccessemail.aspx) property of the current web to **string empty('')**.

``` javascript
web.set_requestAccessEmail('');
```

Finally, after executing the script within the site and opening the **Access Requests Settings **modal windows, you can see that all of the options are now unchecked. 

{% asset_image Changing-the-Access-Requests-Settings-of-a-SharePoint-Online-site-with-JavaScript2.png "Changing the Access Requests Settings of a SharePoint Online site with JavaScript2"%}

Hope you like it and find it helpful.