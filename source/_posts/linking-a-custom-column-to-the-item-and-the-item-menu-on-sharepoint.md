---
title: Linking a custom column to the Item and the Item Menu on SharePoint
author: Dario Alvarez
tags:
  - JavaScript
  - SharePoint
  - SPField
categories:
  - SharePoint
date: 2016-04-20 16:09:55
---

Sometimes, you might want to link a custom column to a SharePoint list item and item menu rather than the default Title column. This post will show how to link any column to a SharePoint item and to achieve it using JavaScript and the SharePoint Client Object Model.
<!-- more -->
There are four properties from the **SPField** class that need to be modified in order to link the column to the item and the item menu; these properties are:

For Linking the Field to the Item's Display Form

*   **LinkToItemAllowed** a [ListItemMenuState](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spfield.listitemmenustate.aspx) type property that indicates whether the field/column **_can_** be linked to the list item's display form. The values available for this property are _Allowed_, _Required_ and _Prohibited, _defaulted to _Allowed._
    
*    **LinkToItem** a bool type property that indicates whether the field **_should_** show a link to the list item's display form when displayed in a list view. The value for the **LinkToItemAllowed** property must be _Allowed_ or _Required._
    
For Linking the Field to the Item's Drop Down menu

*   **ListItemMenuAllowed** a [ListItemMenuState](https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spfield.listitemmenustate.aspx) type property that indicates whether the field/column, **_can_** be linked to the list item's drop down menu. The values available for this property are _Allowed_, _Required_ and _Prohibited, _defaulted to _Allowed._
    
*   **ListItemMenu**  a bool type property that indicates whether the field **_should_** show a link to the list item's drop down menu when displayed in a list view. The value for the **ListItemMenuAllowed** property must be _Allowed_ or _Required._
    
Unfortunately, there is not a straight way for setting the value of those properties using the JavaScript SharePoint Library, but I was able to link the column to the item by modifying the schemaXml of the file I wanted to link.

First, I looked for the current Xml structure of the field. Then, added the four new attributes to the xml and, finally, set the new Xml structure to the field.
 
{% gist e66fdf634be355a593008bf6c5496b8c %}

I wasn't using jQuery this time, so I had my own function in order to convert the xml string to an xml object.

``` Javascript
function parseXml(xmlStr){
    if (window.DOMParser){
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlStr,"text/xml");
    } else { // Internet Explorer
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); xmlDoc.loadXML(xmlStr);
    }
    return xmlDoc ;
}
```

After using the above piece of code on my Share Point Online environment, it resulted to two columns linked to the items's display form and drop down menu, the **Title** Column and my Single Line of Text field called **Js231SPColumn**.

a. Linked to the Item's display Form.
{% asset_image SP-Field-Linked-to-Item-on-SharePoint.png SP Field Linked to Item on SharePoint %}

b. Linked to the Item's drop down menu.

{% asset_image SP-Field-Linked-to-Menu-on-SharePoint.png SP Field Linked to Menu on SharePoint %}

This should also work on an On-premise environment and it can be applied to any type of field, but I wouldn't recommend using it with lookup fields, user fields and taxonomy fields as it breaks the view of the value, as shown in the following image

{% asset_image SP-Field-Linked-to-Menu-on-SharePoint-Taxonomy-lookup-person-hyperlink.png SP Field Linked to Menu on SharePoint Taxonomy lookup person hyperlink %}

In the case of the Hyperlink or Image field, I wouldn't recommend it either as when you click on it, it will take you to the Item's display form instead of the field link.

And that's it, an easy and fast way to link a field to the item and drop down menu.

Hope you like it and find it useful.