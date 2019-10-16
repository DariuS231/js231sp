---
title: Using Certificates for OpenID on Orchard Core Hosted in Azure
author: Dario Alvarez
date: 2019-10-16 14:00:00
tags:
  - Orchard Core
  - Azure
  - Certificate
categories:
  - Orchard Core
photos: 
	- /gallery/posts/Orchard core azure certificate.png
---

Let’s say you are working with an Orchard Core web application Hosted in Azure and want to configure the OpenId feature to use JWT tokens. 

{% asset_image "Orchard core azure certificate 1.png" "Certificate on Azure" %}

Then, assuming you have uploaded your certificate to the SSL settings page of the azure portal, when you navigate to the OpenId configuration page to select the certificate, you realise it isn’t there when it’s supposed to be, under `CurrentUser` > `My` certificate store.

{% asset_image "Orchard core azure certificate 4.png" "NO Certificate" %}

<!-- more -->

If this is the case,  the solution might be to simply add a new entry  to the app settings with the following:

Key: WEBSITE_LOAD_CERTIFICATES
Value: *[Thumbprint of the certificate uploaded to Azure.]*

{% asset_image "Orchard core azure certificate 2.png" "NO Certificate" %}

After saving the changes on the Azure portal, you should be able to select your certificate from drop down in the OpenId settings page.


{% asset_image "Orchard core azure certificate 5.png" "Certificate Found" %}

Hope you find this useful. 