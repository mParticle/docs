---
title: Consent Management
order: 3.5
---

mParticle's Consent Management framework is designed to give brands the tools they need to manage their consent and privacy obligations under the European Union's General Data Protection Regulation (GDPR).

Before instrumenting Consent State in your app, be sure to read our [GDPR and CCPA Consent Management Guide](/guides/consent-management).

Consent state can be logged in the SDK using the Consent State API. Once a consent state is set, it cannot be modified. To change the consent state for a given purpose, you can either remove it, or replace it with a new complete consent state object.

:::code-selector-block
~~~objectivec
MParticleUser *user = [MParticle sharedInstance].identity.currentUser;

// Create GDPR consent objects
MPGDPRConsent *locationCollectionConsent = [[MPGDPRConsent alloc] init];
gdprConsent.consented = YES;
gdprConsent.document = @"location_collection_agreement_v4";
gdprConsent.timestamp = date;
gdprConsent.location = @"17 Cherry Tree Lane";
gdprConsent.hardwareId = @"IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702";

MPGDPRConsent *parentalConsent = [[MPGDPRConsent alloc] init];
gdprConsent.consented = NO;
gdprConsent.document = @"parental_consent_agreement_v2";
gdprConsent.timestamp = date;
gdprConsent.location = @"17 Cherry Tree Lane";
gdprConsent.hardwareId = @"IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702";

// Only one CCPA consent object can be set - it has an implied purpose of `data sale opt-out`
MPCCPAConsent *ccpaConsent = [[MPCCPAConsent alloc] init];
ccpaConsent.consented = YES; // YES represents a "data sale opt-out", NO represents the user declining a "data sale opt-out"
ccpaConsent.document = @"ccpa_consent_agreement_v3";
ccpaConsent.timestamp = date;
ccpaConsent.location = @"17 Cherry Tree Lane";
ccpaConsent.hardwareId = @"IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702";

// Add to consent state
MPConsentState *consentState = [[MPConsentState alloc] init];

[consentState addGDPRConsentState:locationCollectionConsent purpose:@"location_collection"];
[consentState addGDPRConsentState:parentalConsent purpose:@"parental"];

[consentState setCCPAConsentState:ccpaConsent];

user.consentState = consentState;

// Remove consent state
MPConsentState *consentState2 = user.consentState;
[consentState2 removeGDPRConsentStateWithPurpose:@"parental"];
[consentState2 removeCCPAConsentState];
user.consentState = consentState2;
~~~
~~~swift
let user = MParticle.sharedInstance().identity.currentUser

// Create GDPR consent objects
let locationCollectionConsent = MPGDPRConsent.init()
locationCollectionConsent.consented = true
locationCollectionConsent.document = "location_collection_agreement_v4"
locationCollectionConsent.timestamp = Date.init()
locationCollectionConsent.location = "17 Cherry Tree Lane"
locationCollectionConsent.hardwareId = "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"

let parentalConsent = MPGDPRConsent.init()
parentalConsent.consented = false
parentalConsent.document = "parental_consent_agreement_v2"
parentalConsent.timestamp = Date.init()
parentalConsent.location = "17 Cherry Tree Lane"
parentalConsent.hardwareId = "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"

// Only one CCPA consent object can be set - it has an implied purpose of `data sale opt-out`
let ccpaConsent = MPCCPAConsent.init()
ccpaConsent.consented = true; // true represents a "data sale opt-out", false represents the user declining a "data sale opt-out"
ccpaConsent.document = "ccpa_consent_agreement_v2"
ccpaConsent.timestamp = Date.init()
ccpaConsent.location = "17 Cherry Tree Lane"
ccpaConsent.hardwareId = "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"

// Add to consent state
let consentState = MPConsentState.init()
consentState.addGDPRConsentState(locationCollectionConsent, purpose: "location_collection")
consentState.addGDPRConsentState(parentalConsent, purpose: "parental")
consentState.setCCPAConsentState(ccpaConsent)

user?.setConsentState(consentState)

// Remove consent state
if let consentState2 = user?.consentState() {
    consentState2.removeGDPRConsentState(withPurpose: "parental")
    consentState2.removeCCPAConsentState()
    user?.setConsentState(consentState2)
}
~~~
:::
