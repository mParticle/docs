---
title: "Error Tracking"
order: 4
---

The mParticle SDK lets you track "errors" and "exceptions". These two terms have slightly different meanings:

* An error is a designed error state in your app, such as a failed login.
* An exception is an error thrown by the app or site.

As with other events, extra attributes can be passed via the Event Info object.

## Log Errors

~~~cs
Dictionary<string, string> errorInfo = new Dictionary<string, string> ();		
errorInfo.Add ("reason", "Invalid username");		

MParticle.Instance.LogError ("Login failed", errorInfo);		
~~~


## Log Exceptions

~~~csharp		
try		
{		
    SomeDangerousMethod ();		
}		
catch (NullReferenceException e)		
{		
    MParticle.Instance.LogException (e);		
}		
~~~


## Breadcrumbs

While debugging a scenario that may lead, or is currently leading to, crashes and/or exceptions, it is often helpful to leave "breadcrumbs" along the way to better understand the context leading to the problem. A breadcrumb is a string explaining what your app code is about to attempt, or what it has just completed, for example "parsing began" or "parsing finished".

The mParticle SDK lets you leave breadcrumbs with the `leaveBreadcrumb` method. You can also include additional custom attributes.

~~~cs		
//fictional method that parses some object		
private void ParseResource (Resource someResource)		
{		
    try		
    {		
        MParticle.Instance.LeaveBreadcrumb ("Parsing began");		

        MParticle.Instance.LeaveBreadcrumb ("parsing title");		
        Par seResourceTitle (someResource);		

        MParticle.Instance.LeaveBreadcrumb ("parsing body");		
        ParseResourceBody (someResource);		

        MParticle.Instance.LeaveBreadcrumb ("parsing footer");		
        ParseResourceFooter (someResource);		

        MParticle.Instance.LeaveBreadcrumb ("parsing finished!");		
    }		
    catch (Exception ex)		
    {		
        MParticle.Instance.LogException (ex);		
    }		
}		
~~~
