---
title: Creating a content type with its document template on SharePoint Online using PowerShell
author: Dario Alvarez
tags:
  - Content Type
  - PowerShell
  - SharePoint
categories:
  - SharePoint
date: 2016-02-22 12:03:16
---

Recently I had a requirement where I needed to create some content types with their own Document Templates using PowerShell.

With the following function I was able to create a content type in a SharePoint Online environment and set up the document template I wanted. The function assumes that the document template has already been uploaded to the site and that the content type hasn't been created yet. 

{% gist 90e091af9dc01137b205 %}

There are two ways of creating a content type in this function:
<!-- more -->
1.  By providing the ID of the parent content type. A new content type will be created inheriting from the provided ID and a its Id will be random.
2.  By providing the ID of the content type that's being created. The provided ID must be properly structured in order to be able to define the parent content type.

{% asset_image Creating-content-type-document-template-SharePoint-Online-PowerShell3-1024x250.png Creating content type document template SharePoint Online PowerShell %}

As you can see, both content types  have the Document content type as a parent. If you pay attention to the provided IDs on the script, you will notice that the first 6 characters of the provided IDs (lines 43,44) are the same. This is because the Content types IDs follow a specific structure and hierarchy, which goes like this:

{% asset_image "Ct Hierarchy.png" Ct Hierarchy %}

You can find more information about the structure of the Content Type IDs [here](https://msdn.microsoft.com/en-us/library/aa543822%28v=office.12%29.aspx).

Finally, after adding the content types to a document library, each content type has its own document template.

{% asset_image Ct Creating-content-type-document-template-SharePoint-Online-PowerShell.png Creating content type document template SharePoint Online PowerShell %}

Hope you like it and find it useful.