---
title: Reading local files from a .Net Azure Function
date: 2018-07-03 10:36:21
tags:
  - Azure Function
  - C#
  - .Net
categories:
  - Azure Functions
photos:
    - /gallery/posts/Reading-local-files-from-a-Net-azure-Function.png
---

When working with Azure Functions, you might find yourself in the need of reading the content of some local files located in the same directory of the function your are working on.

I found two ways of achieving this without having to hard-code the full path of the file you are trying to read, the two options are:

1. By using the Context of the Function.
2. By using an Environment Variable

<!-- more -->

For the post, I created two functions `ReadFileByContext` and `ReadFileByVariable`.

{% asset_image "Reading-local-files-from-a-Net-azure-Function-Functions.png" "Local files" %}

And also, uploaded two documents through `Advanced tools (Kudu)` to a folder called `Files`.

{% asset_image "Reading-local-files-from-a-Net-azure-Function-Local-files.png" "Local files" %}


## By Function Context

Initially, when you create a function from Visual Studio or from Azure portal, you get a very basic structure of a function thats receives two parameters.

Something like this:

``` csharp
public static HttpResponseMessage Run(HttpRequestMessage req, TraceWriter log)
```

The trick is to add a third parameter of type `ExecutionContext` to the function. With the `context` parameter you can get the `FunctionAppDirectory` property path and the value of this property should be `D:\home\site\wwwroot`.

With this value you only need to put together the rest of the paths and read the content of the file.

``` csharp
public static HttpResponseMessage Run(HttpRequestMessage req, TraceWriter log, ExecutionContext ctx)
{
    var filePath = Path.Combine(ctx.FunctionAppDirectory, "Files", "DummyFileByContext.txt");
 
    var fileContent = System.IO.File.ReadAllText(filePath);
    return  req.CreateResponse(HttpStatusCode.OK, $"File Content: {fileContent}");
}
```

Here is a screenshot of the response when calling the Azure function.

{% asset_image "Reading-local-files-from-a-Net-azure-Function-byContext-result.png" "Read By Context" %}

## By Environment Variable

For this approach only you need get the value of the `HOME` Environment Variable. and the value should `D:\home`.

``` csharp
Environment.GetEnvironmentVariable("HOME", EnvironmentVariableTarget.Process);
```

With the value of the variable just concatenate the rest of the path and you should be good to go.

``` csharp
public static HttpResponseMessage Run(HttpRequestMessage req, TraceWriter log)
{
    var home = Environment.GetEnvironmentVariable("HOME", EnvironmentVariableTarget.Process);
    var filePath =  Path.Combine(home, @"site\wwwroot\Files", "DummyFile_ReadByVariable.txt");
    
    var fileContent = System.IO.File.ReadAllText(filePath);
    return  req.CreateResponse(HttpStatusCode.OK, $"File Content: {fileContent}");
}
```

Here is a screenshot of the response when calling the Azure function.

{% asset_image "Reading-local-files-from-a-Net-azure-Function-byVariable-result.png" "Read By Variable" %}


Thats it! With this approach you will forget about hard-coded paths and the best of everything is that it also work on local environments when working with Visual Studio in you development machine.


Hope you like it and find it useful.