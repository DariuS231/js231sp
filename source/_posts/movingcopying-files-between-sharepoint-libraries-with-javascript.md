---
title: Moving/copying files between SharePoint libraries with JavaScript
author: Dario Alvarez
tags:
  - JavaScript
  - SharePoint
categories:
  - SharePoint
date: 2016-04-12 10:59:52
---

An easy way to copy or move files with JavaScript between SharePoint libraries within the same site is using the methods **copyTo** and **moveTo** from the SP.File class.

Both functions receive the same first parameter, which is the future URL of the document to be moved/copied, but the second parameter is different.

In the case of the **moveTo** function, it expects an enum value of type [SP.MoveOperations](https://msdn.microsoft.com/en-us/library/office/ee556657%28v=office.14%29.aspx). This parameter determines the kind of operation to execute when copying the file.

<!-- more -->
``` javascript
SP.File.moveTo(newUrl, flags);
```
The options available for the flag value are:

*   SP.MoveOperations.none
*   SP.MoveOperations.overwrite
*   SP.MoveOperations.allowBrokenThickets
*   SP.MoveOperations.bypassApprovePermission

The **copyTo** function expects a bool value that simply indicates whether the file should be overwritten or not in case the file already exist in the destination library.
``` javascript
SP.File.copyTo(strNewUrl, bOverWrite);
```
If the file already exist in the destination library and the _bOverWrite_ value is **false**, an error will occur while executing the instruction. The same will happen with the **moveTo** function when the _SP.MoveOperations.none _enum is passed as the flag parameter.

Here is a simple function that takes the parameters needed to copy or move a file. 

{% gist ff29ef907550086f6631d6f0d720e575 %}

I've tested this code in SharePoint 2010, SharePoint 2013 and SharePoint Online as well.

Hope you like it and find it useful.