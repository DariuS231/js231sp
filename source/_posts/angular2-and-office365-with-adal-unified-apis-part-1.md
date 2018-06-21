---
title: 'Angular2 and Office365 with ADAL unified APIs [PART 1]'
author: Dario Alvarez
tags:
  - Angular2
  - o365
  - Office365
  - TypeScript
  - unifiedAPIs
categories:
  - Angular2
date: 2015-10-15 14:17:07
photos: 
	- /gallery/posts/office-365-ng2.png
---

After giving a try to Angular2 for my latest post, I wanted to test Angular2 in a more realistic way. As I work with SharePoint on a daily basis, I decided to put Angular2 and office 365 together and see what came out of it.
<!-- more -->
A few months ago I played around with a Microsoft example from github, a simple HTML web application with JavaScript and jQuery code that showed how to connect to an office 365 tenant using the **Azure Active Directory Authentication Library (ADAL)** and how to set it up to make HTTP requests to the Office 365 APIs. So I decided to use the [Office 365 CORS Sample for jQuery](https://github.com/OfficeDev/O365-jQuery-CORS) as a reference and try to make it work the same way with Angular2.

So before starting to code with Angular2, I followed [the instructions](https://github.com/OfficeDev/O365-jQuery-CORS#how-to-run-this-sample) of how to set up the environment to run the sample.

Once I followed the instruction and ran the application to make sure that I was able to get the information out of office 365, I was ready to begin with Angular2 changes.

In this post I will only show how I managed to handle the login/logout of the user with office 365 credential. The next post will show a complete application that retrieves information from Office 365 with the ADAL JavaScript library.

Lets get to it!

First, I changed the structure of the project a little bit.

{% asset_image VisualStudioSolution.png %}

*   I took the css files out of the app folder and put it in a new folder named **content** in the root of the project, and left the app folder only for the files of the angular app.
*   In the app folder, defined the following structure:
    *   Created the services folder for the services of the application
    *   The typings folder contains the typescript definitions(this folder should create by it self when you [install the TypeScript definitions](#settingUpTheEnviroment) needed)
    *   The views filter for all the html templates or views.

Setting up the Angular2 enviroment
----------------------------------

I started by installing Angular2 typescript definitions and its dependencies inside the app folder.

``` 
tsd install angular2 es-promise rx rx-lite es6-shim
```

After executing this script, a new folder called **typings** was created inside the app folder.

HTML and views
--------------

For the html, I did some modification on the **index.html** file and created a new file called **Master-page.html**, which will contain the authentication control. I called it master page because I will use it on the next post as a common header for all the views.

### Index.html

The index.html file only contains the stylesheets links, the JavaScript library references, a **o365-app** tag and the import statement in order to load the Angular2 app code.

{% gist c2cb8ba5c9f281fca7a1 %}

### Master-page.html

The master page will only contain the navigation menu and the login control.

{% gist 6a56aa93eceda5bbaa9a %}

This will also be the container where all the routes of the application will get rendered, that way all the views can have the same aspect and the same authentication control (but this is for the next post).

The important thing to talk about in this page is the click event and the conditional class.

The way to bind events on Angular2 is enclosing the name of the event inside parenthesis () and on the right hand side of the method goes the expression that will be executed every time the event occurs. In this example, I bound two different buttons to the Login and Logout functions included in the Angular2 component.

On the other hand, the way to bind attributes values on Angular2 is enclosing the attribute name inside brackets \[\] and on the right hand side goes the expression to be bound to the attribute.

One of the main differences between ng1 and ng2, is that in ng2 the binding is against properties and not against attributes.

The example in this article is expected to show/hide the items in the list depending on whether the user is authenticated or not with Office 365.

TypeScript Code
---------------

After creating all the Html structure, it was time to work with the angular2 components. First, I'll talk about the ADAL service.

### ADAL TypeScript Definition

Since I was using the ADAL JavaScript library I had to create this typescript definition to prevent the compiler from failing when instantiating the new **AdalAuthenticationContext** object. In this case I created a basic typescript definition with the properties and methods I needed.

{% gist c15667a38fca3d5011f6 %}

I only added the functions and properties I'm using. In case you need to use another function, you just have to add it to the interface.

### Office 365 Adal  Service

I created a service that will handle all the ADAL operation and all the requests to any the office 365 APIs.

{% gist ee7c82299bd483bbff23 %}

First, I added reference to the ADAL TypeScript definition, then import the **Injectable** module from the angular definition and put it as an annotation of the service class. This will allow me to use the service in any other component of the angular app.

The rest of the code is pretty much straightforward,

*   The configuration object as a private property that contains all the options needed for the instantiation of the ADAL authentication context.
*   The authentication context object as a property.
*   The constructor of the class where the ADAL context gets initialized and the callback after login gets handled.
*   The logIn/logOut methods.
*   The rest is just some private properties and read-only properties I use on the [master-page.html](#h3MarterPageFile) for the login control.

### Bootstrap Component

Lastly the Bootstrap component where I just put all the pieces together.

{% gist 5f815ac33c9db91fc75e %}

As you can see, at the beginning I loaded the office 365 service and added it as a **viewBinding** property inside the Component annotation.

I also added a parameter to the constructor type of **o365Adal** and inside the constructor, set the value of this parameter to a property of the class.

### Running the app

Then, after compiling the TypeScript code and tuning the application, it was time to make sure that everything was working properly.

{% asset_image login.png %}

I was able to successfully login to the application using my office 365 credential. As you can see, the name of the logged user appears on the login control, and the log out option is shown after login in.

If you have a c# background as I do, you would like working with TypeScript.

Hope you like it and find it helpful.