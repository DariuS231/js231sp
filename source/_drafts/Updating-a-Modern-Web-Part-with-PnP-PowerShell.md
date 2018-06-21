---
title: Updating a Modern Web Part with PnP-PowerShell
tags:
---

With the SharePoint modern experience becoming more and more relevant, new challenges come along. In this case I needed to update an specific web part with   https://msdn.microsoft.com/en-us/pnp_powershell/pnp-powershell-overview#installation  

Connect-PnPOnline –Url "https://heathrowccdev.sharepoint.com/teams/TestingNewSite/SubChanges/" –Credentials (Get-Credential)

$page = Get-PnPClientSidePage -Identity "SubChanges asdasdas asda"

$wp = $page.Controls | Where { $_.Title -eq "Embed"}

$wp.PropertiesJson = '{"embedCode":"<iframe width=\\"100%\\" height=\\"90px\\" 
                     src=\\"https://heathrowccdev.sharepoint.com/teams/TestingNewSite/SubChanges/SitePages/PrivacyLevel.aspx?isDlg=1\\"></iframe>","shouldScaleWidth":false}'

$page.Save()

Write-Host $page