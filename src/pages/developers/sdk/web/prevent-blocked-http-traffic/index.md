---
title: Preventing Blocked HTTP Traffic with CNAME
order: 11.9
---

Browsers and ad-blocking technologies sometimes block mParticle tags and event collection endpoints. To prevent blocking and ensure maximum data collection, configure a first-party domain for event collection, and use it instead of the SDK default `mparticle.com` domain.

To prevent this blocked HTTP traffic, create a custom subdomain and point that DNS record to mParticle. Traffic is less likely to be blocked because the domain matches the same root domain in the address bar. 

Use this process to create a custom subdomain and point the DNS record to mParticle:

1. Choose a subdomain and provide this to mParticle.  For example, `mp.mydomain.com` or `mparticle.mydomain.com`. To contact mParticle, visit [the mParticle Support site](https://support.mparticle.com/) and submit a request.
2. In order for mParticle to obtain an SSL certificate, the certificate provider must prove domain ownership. mParticle provides a DNS record to be inserted into the customer's public DNS server.  This might either be a TXT or CNAME record.  
3. Once step 2 is complete, mParticle Operations verifies the domain and obtains the SSL certificate.
4. mParticle provides the CNAME value to you, and you point your chosen subdomain from step 1 to this value.  
5. mParticle uses Fastly as our CDN and edge delivery network.  In the event that the customer is also a Fastly customer, and the root domain in question (`mydomain.com` in this example) has been configured previously, Fastly will need to obtain permission from the account owner or authorized point of contact prior to allowing mParticle to complete provisioning.  In this case, an additional TXT DNS record will need to be created.  Further details will be provided by mParticle at such time.
6. Update your SDK configuration snippets to include the relevant custom CNAME endpoints for uploads as shown in the following example snippet.

## Web SDK Config Snippet

```javascript
window.mParticle = {

    config: {
        isDevelopmentMode: true,
        v1SecureServiceUrl: 'mp.mydomain.com/webevents/v1/JS/',
        v2SecureServiceUrl: 'mp.mydomain.com/webevents/v2/JS/',
        v3SecureServiceUrl: 'mp.mydomain.com/webevents/v3/JS/',
        configUrl: 'mp.mydomain.com/tags/JS/v2/',
        identityUrl: 'mp.mydomain.com/identity/v1/',
        aliasUrl: 'mp.mydomain.com/webevents/v1/identity/'
    }
};
```

In addition, if you are using the JavaScript snippet to load the SDK, modify the line that includes `mp.src` and use your domain instead. Don't include this line in the Config object.

```javascript

    mp.src = "https://mp.mydomain.com/tags/JS/v2/" + t + "/mparticle.js";
```
