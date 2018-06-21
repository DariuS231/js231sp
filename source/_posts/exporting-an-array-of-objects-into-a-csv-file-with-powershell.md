---
title: Exporting an array of objects into a csv file with PowerShell
author: Dario Alvarez
tags:
  - CSV
  - PowerShell
categories:
  - PowerShell
date: 2015-12-02 11:02:38
---

I find very useful being able to output data in csv files when working with PowerShell, and this is a very simple way of doing it.

{% gist 1c29a89bbdb828b348ac %} 

Apart from specifying the name of the output file, I used followind parameters:
<!-- more -->
*   The **-encoding** Parameter, to specify the -encoding for the exported CSV file and that way avoid encoding problems
*   The **-NoTypeInformation** parameter to remove the type information from the CSV file that goes by the default in the first line of the file.

There are other available parameters and yo can see all of them [here](https://technet.microsoft.com/en-us/library/hh849932.aspx).

From this example you can get creative and add as many columns as you want and the type of column you prefer.

Hope you like it and find it helpful.