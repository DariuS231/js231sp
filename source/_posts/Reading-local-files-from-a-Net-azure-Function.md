---
title: Reading local files from a .Net Azure Function
date: 2018-07-03 10:36:21
tags:
  - Azure Function
  - C#
  - .Net
categories:
  - Azure Functions
---

At some point when working with Azure functions, you might find yourself in the need of reading the content of some local files located in the same directory of the function itself.

<!-- more -->

I created two functions and uploaded two documents through `Advanced tools (Kudu)` to a folder colled `TextFiles`.

{% asset_image "Reading-local-files-from-a-Net-azure-Function-Local-files.png" "Local files" %}

I found two ways of achieving this:

1. By using an enviroment variable
2. By using the Context of the Function.


## By Function Context
``` csharp
public static HttpResponseMessage Run(HttpRequestMessage req, TraceWriter log, ExecutionContext context)
{
    var filePath = Path.Combine(context.FunctionAppDirectory, "TextFiles", "DummyFileByContext.txt");
 
    var fileContent = System.IO.File.ReadAllText(filePath);
    return  req.CreateResponse(HttpStatusCode.OK, $"File Content: {fileContent}");
}

```

## By Environment Variable
``` csharp
public static HttpResponseMessage Run(HttpRequestMessage req, TraceWriter log)
{
    var home = Environment.GetEnvironmentVariable("HOME", EnvironmentVariableTarget.Process);
    var filePath =  Path.Combine(home, @"site\wwwroot", "TextFiles", "DummyFileByEnvironment.txt");
    
    var fileContent = System.IO.File.ReadAllText(filePath);
    return  req.CreateResponse(HttpStatusCode.OK, $"File Content: {fileContent}");
}
```

The code bellow is a simple setting you can use to avoid using absolute paths.



COSE GOES HERE



Initially, when you create the function, the function method only has two parameters. But by adding the context parameter to the method you should now be able to get additional information from the context of the function.



And that’s it, with this piece of code you can now use relative paths instead of absolutes and not having to worry changing the path when moving between environments.



Hope you like it and find it useful.

``` csharp
public static HttpResponseMessage Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    // parse query parameter
    string name = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "name", true) == 0)
        .Value;

    if (name == null)
    {
        // Get request body
        dynamic data = await req.Content.ReadAsAsync<object>();
        name = data?.name;
    }

    return name == null
        ? req.CreateResponse(HttpStatusCode.BadRequest, "Please pass a name on the query string or in the request body")
        : req.CreateResponse(HttpStatusCode.OK, "Hello " + name);
}
```


``` csharp

private static string GetEnvironmentVariable(string name) => Environment.GetEnvironmentVariable(name, EnvironmentVariableTarget.Process);
private static string GetScriptPath() => Path.Combine(GetEnvironmentVariable("HOME"), @"site\wwwroot");



public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log, ExecutionContext context)
{
    log.Info("C# HTTP trigger function processed a request.");

    Path.Combine(context.FunctionAppDirectory, "Certs", Core.Common.WebConfig.CertFileName);
    // parse query parameter
    string name = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "name", true) == 0)
        .Value;

    if (name == null)
    {
        // Get request body
        dynamic data = await req.Content.ReadAsAsync<object>();
        name = data?.name;
    }

    return name == null
        ? req.CreateResponse(HttpStatusCode.BadRequest, "Please pass a name on the query string or in the request body")
        : req.CreateResponse(HttpStatusCode.OK, "Hello " + name);
}
```