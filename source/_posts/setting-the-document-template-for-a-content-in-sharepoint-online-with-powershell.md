---
title:
  Setting the document template for a content type in SharePoint Online with
  PowerShell
author: Dario Alvarez
tags:
  - Content Type
  - Document Template
  - PowerShell
  - SharePoint
categories:
  - SharePoint
date: 2016-03-04 14:05:53
---

In my previous post, apart from creating a content type using PowerShell, I also showed a way of setting the document template of the content type. In that scenario I used a document template already uploaded into a normal SharePoint document library.

In this post, I'm going to demostrate another way to set the document template of a content type in SharePoint online using PowerShell.

The difference between this approach and the one I used in my previous post is basically that this time the document will be uploaded to the "\_cts" folder. This means that the document template will be directly related to a site’s content types, whereas in the past example the document template could be in any site's library.

<!-- more -->
{% gist ef7c3dd613b8aea82dcd %}

Basically the script uploads the document template to a folder with the name of the content type within the "\_cts" folder and then sets up the document template of the Content Type with the name of the recently uploaded file.

After running the script, the document templates are successfully added to the Content Types.

{% asset_image Setting-the-document-template-for-a-content-in-SharePoint-Online-with-PowerShell.png Setting the document template for a content in SharePoint Online with PowerShell %}

This approach is specially useful when working with the Content Type Hub as the propagation of the content types propagates the document template as well. Also, it is a a safer approach as there is no risk that the document  could be removed  by mistake, nor the library where it resides would be deleted. 

Hope you like it and find it useful.