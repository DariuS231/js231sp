---
title: Chrome SP Dev Tool
author: Dario Alvarez
tags:
  - Google Chrome Extension
  - SharePoint
categories:
  - Chrome Extension
date: 2017-01-24 11:47:49
photos: 
    - /gallery/posts/SPChromeDevTool.png
---

After some time working with SharePoint, I noticed that there are certain SharePoint functionalities that I would like to have direct and quick access to, instead of going trough several clicks to find and/or execute them. For some of these functionalities, the only option was to code my way to achieve what I needed to do, therefore, I decided to develop a Chrome extension that would provide a direct access to those particular functionalities. 

The name of the application is "**Chrome SP Dev Tools**". It is a combination of tools meant to help both SharePoint users and developers.

The idea came after I found [this GitHub repository](https://github.com/rlv-dan/SpPropertyBag.js) that provides a nice user interface for managing Web Property Bags from a bookmarklet and thought it would be nice to have it in a Chrome Extension instead.

Originally, the application was targeted to developers and it was supposed to be a one-option tool - a property bag CRUD operations tool. Then I thought of other things that would be nice to have, such as a list of all lists and libraries including the hidden ones, a list of site and web features, and a lists of custom actions; that's how the application came to life.

Here's a brief look at the available tools in the application currently.

<!-- more -->

Property Bags
-------------

Property bags are the main reason why I decided to develop this extension in the first place. I was working a lot with Web Property Bags and needed an easy and quick way to **View**, **Create**, **Update** and **Delete** them.

There's a section for managing property bags inside the Chrome SP Dev Tools extension. If this option is selected, a modal dialog appears on the current SharePoint site, showing a list of all the web property bags.

{% asset_image Web-Property-bags.png Web Property bags %}

Each property bag can be updated or deleted. There's also an option to create new properties by using the small form located at the bottom of the modal dialog.

Site lists
----------

Another common task that as a SharePoint developer I constantly find myself doing is going to the "Site Content" page to check some list or library.

This option lists all the **hidden** or **visible** lists and libraries of the current site, with the following options:

*   Total count of item in the list
*   Link to the default view
*   Link to the lists settings page
*   Link to the New item form (if available)
*   Link to the permissions page

By default, the modal shows only the **hidden** lists, but all list can be shown just by clicking the "Show all" check box.

{% asset_image Site-lists.png Site Lists %}

Web Custom Actions and Site Custom Actions
------------------------------------------

I find Custom actions to be very useful when I want to add a new JavaScript file reference or small piece of code to the page, but there is no user interface that lists all the existing custom actions.

This tool provides an user interface with a list of the web/site custom actions and the possibility of creating, modifying  or deleting any custom action.

{% asset_image Web-Custom-Actions.png Web Custom Actions %}

The functionality and Look and Feel is the same for both **Site** and **Web** Custom actions  and, at the moment, it is only working with _**Script Block**_ and **_Script Source_** custom actions.

{% asset_image Site-Custom-Actions.png Site Custom Actions%}

Features
--------

Another direct access I've always wanted is to the features page. Even better, have both Web and Site features in a same location.

This tools lists all the features of the current site, the status of each feature and the option to activate or deactivate the feature from the same panel.

{% asset_image Features.png Features %}

Another useful option in this tool is the search box. It is very convenient to filter the features list when looking for a particular one.

Google Extension
----------------

[This](https://chrome.google.com/webstore/detail/chrome-sp-dev-tools/efhiadiopfkjpdihdmlccoffnpdblkho) is the link of the extension on the Google Chrome Web Store. It is totally free.

Code
----

The application was completely written with Typescript, using React and UI-Fabric for the user interface.

The source code is [here](https://github.com/DariuS231/ChromeSPDevTools). Feedback and new ideas for new options on the tools are welcome.

Collaborators
-------------

A big shout out to [@bencernuda](https://twitter.com/BenCernuda), [@jquintozamora](https://twitter.com/jquintozamora) and [@spcfran](https://twitter.com/spcfran) for all the help and collaboration in the project.

Hope you like it and find it helpful.