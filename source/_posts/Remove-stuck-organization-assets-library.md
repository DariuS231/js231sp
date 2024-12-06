---
title: Removing a Stuck Organization Assets Library in SharePoint
date: 2024-12-05 15:37:15
tags:
  - SharePoint
  - PnP PowerShell
  - Org Assets Library
categories:
  - SharePoint
---

If you’ve ever found yourself stuck with an organization assets library in SharePoint that won’t go away, even after the site it was created on has been deleted, you’re in the right place. Normally, you’d use the `Remove-PnPOrgAssetsLibrary` command, but it needs the `-LibraryUrl` parameter, which we can’t get if the site is gone. Don’t worry – I’ve got a solution for you. Let’s walk through it together!
<!-- more -->
### Steps to Remove the Stuck Library

Here is the code to do that:

```powershell
$orgAssetsLib = Get-PnPOrgAssetsLibrary -ErrorAction SilentlyContinue
$orgAssetLibIds = @()

if ($null -ne $orgAssetsLib.ListId -and $null -eq $orgAssetsLib.LibraryUrl) {
    $orgAssetLibIds += $orgAssetsLib.ListId
} elseif ($null -ne $orgAssetsLib.OrgAssetsLibraries -and $orgAssetsLib.OrgAssetsLibraries.Count -gt 0) {
    $orgAssetLibIds = $orgAssetsLib.OrgAssetsLibraries | Where-Object { $_.LibraryUrl -eq $null } | Select-Object -ExpandProperty ListId
}

foreach ($orgAssetLibId in $orgAssetLibIds) {
    Write-Host "Removing org assets library " $orgAssetLibId
    $data = @{ listId = $orgAssetLibId }
    Invoke-PnPSPRestMethod -Method Post -Url "/_api/Microsoft.Online.SharePoint.TenantManagement.Office365Tenant/RemoveFromOrgAssets" -Content $data
    Write-Host "Removed org assets library " $orgAssetLibId
}
```

### Explanation

1. **Retrieve Organization Assets Library Information**: We use `Get-PnPOrgAssetsLibrary` to get information about the organization assets libraries and create an empty array.

2. **Handle Single and Multiple Libraries**: PowerShell converts an array with a single element into the object itself rather than an array. We check if the command returned only one Org Assets Library object and put the ID of the library inside the array we created previously. Otherwise, we select the IDs of all the libraries and put them in the array. Notice how in both cases we only take the libraries with an empty `LibraryUrl`. This indicates that it is a library lost in limbo.

3. **Remove Libraries**: Iterate through the IDs and call the `/_api/Microsoft.Online.SharePoint.TenantManagement.Office365Tenant/RemoveFromOrgAssets` endpoint with the ID of the broken Organization Asset Library to remove it.

And that’s it! By following these steps, you can successfully remove that pesky organization assets library, even if the original site is long gone. This method bypasses the need for the `-LibraryUrl` parameter, keeping your SharePoint environment clean and tidy.

Feel free to reach out if you have any questions or run into any issues.

Hope you find this useful.