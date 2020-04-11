---
title: Opt Out
order: 10.1
---

Many apps want to give users the option to be excluded from tracking. The mParticle SDK supports this via Opt Out.

When you set Opt Out to `true`:

* The SDK uploads an Opt Out event to mParticle. This event is forwarded to all compatible embedded kits and Output partners.

* The current MPID is is removed from any existing audiences <!-- is this true? -->and will not be added to any future audiences.

* Once the Opt Out event is uploaded, the SDK will cease uploading to mParticle and will no longer initialize any embedded kits. Note that kits which have already been initialized may continue to communicate with the relevant partners until the app is closed.

Note that Opt Out shuts down data collection at the source. This is separate from mParticle's [Consent Management]() feature. 

<!-- We should cover un-opt out -->

~~~objectivec
[MParticle sharedInstance].optOut = YES;
~~~


