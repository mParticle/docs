---
title: Preventing Blocked HTTP Traffic with CNAME
order: 11.9
---

Ad-blocking technologies sometimes block mParticle tags and event collection endpoints. To prevent blocking and ensure maximum data collection, configure a first-party domain for event collection, and use it instead of the SDK default `mparticle.com` domain.

To prevent this blocked HTTP traffic, create a custom subdomain and point that DNS record to mParticle. Traffic is less likely to be blocked because the domain used for mParticle traffic matches the root domain used in your app. 

Use this process to create a custom subdomain and point the DNS record to mParticle:

1. Choose a subdomain and provide this to mParticle.  For example, `mp.mydomain.com` or `mparticle.mydomain.com`. To contact mParticle, visit [the mParticle Support site](https://support.mparticle.com/) and submit a request.
2. In order for mParticle to obtain an SSL certificate, the certificate provider must prove domain ownership. mParticle provides a DNS record to be inserted into the customer's public DNS server.  This might either be a TXT or CNAME record.  
3. Once step 2 is complete, mParticle Operations verifies the domain and obtains the SSL certificate.
4. mParticle provides the CNAME value to you, and you point your chosen subdomain from step 1 to this value.  
5. mParticle uses Fastly as our CDN and edge delivery network.  In the event that the customer is also a Fastly customer, and the root domain in question (`mydomain.com` in this example) has been configured previously, Fastly will need to obtain permission from the account owner or authorized point of contact prior to allowing mParticle to complete provisioning.  In this case, an additional TXT DNS record will need to be created.  Further details will be provided by mParticle at such time.
6. Update your SDK configuration snippets to include the relevant custom CNAME endpoints for uploads as shown in the following example snippet.

## iOS SDK Config Snippet

:::code-selector-block
```objectivec

    MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY" secret:@"REPLACE WITH APP SECRET"];
    options.logLevel = MPILogLevelDebug;
    MPNetworkOptions *networkOptions = [[MPNetworkOptions alloc] init];
    networkOptions.configHost = @"custom CNAME mapping to config2.mparticle.com/v4";
    networkOptions.overridesConfigSubdirectory = YES;
    networkOptions.eventsHost = @"custom CNAME mapping to nativesdks.mparticle.com/v2";
    networkOptions.overridesEventsSubdirectory = YES;
    networkOptions.identityHost = @"custom CNAME mapping to identity.mparticle.com/v1";
    networkOptions.overridesIdentitySubdirectory = YES;
    networkOptions.aliasHost = @"custom CNAME mapping to nativesdks.mparticle.com/v1/identity";
    networkOptions.overridesAliasSubdirectory = YES;

    NSData *intermediateCertificate = [[NSData alloc] initWithBase64EncodedString:@"certificate provided by mParticle" options:0];
    NSData *rootCertificate = [[NSData alloc] initWithBase64EncodedString:@"certificate provided by mParticle" options:0];
    networkOptions.certificates = @[ intermediateCertificate, rootCertificate ];
    options.networkOptions = networkOptions;

    [[MParticle sharedInstance] startWithOptions:options];
```
```swift

    let options = MParticleOptions(key: "REPLACE WITH APP KEY", secret: "REPLACE WITH APP SECRET")
    options.logLevel = .verbose

    let networkOptions = MPNetworkOptions()
    networkOptions.configHost = "custom CNAME mapping to config2.mparticle.com/v4"
    networkOptions.overridesConfigSubdirectory = true
    networkOptions.eventsHost = "custom CNAME mapping to nativesdks.mparticle.com/v2"
    networkOptions.overridesEventsSubdirectory = true
    networkOptions.identityHost = "custom CNAME mapping to identity.mparticle.com/v1"
    networkOptions.overridesIdentitySubdirectory = true
    networkOptions.aliasHost = "custom CNAME mapping to nativesdks.mparticle.com/v1/identity"
    networkOptions.overridesAliasSubdirectory = true

    let intermediateCertificate = Data(base64Encoded: "certificate provided by mParticle")
    let rootCertificate = Data(base64Encoded: "certificate provided by mParticle")
    if let intermediateCertificate = intermediateCertificate, let rootCertificate = rootCertificate {
        networkOptions.certificates = [intermediateCertificate, rootCertificate]
    }
    options.networkOptions = networkOptions

    MParticle.sharedInstance().start(with: options)

```
:::
