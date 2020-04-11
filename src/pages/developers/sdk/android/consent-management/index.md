---
title: Consent Management
order: 3.7
---

mParticle's Consent Management framework is designed to give brands the tools they need to manage their customer or visitor consent and privacy obligations under the European Union's General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).

Before instrumenting Consent State in your app, be sure to read our [GDPR and CCPA Consent Management Guide](/guides/consent-management).

Consent state can be logged in the SDK using the Consent State API. Once a consent state is set, it cannot be modified. To change the consent state for a given purpose, you can either remove it, or replace it with a new complete consent state object.

:::code-selector-block
```java
 MParticleUser user = MParticle.getInstance().Identity().getCurrentUser();
        
// Create GDPR consent objects
GDPRConsent locationCollectionConsent = GDPRConsent.builder(true)
        .document("location_collection_agreement_v4")
        .location("17 Cherry Tree Lane")
        .hardwareId("IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702")
        .build();

GDPRConsent parentalConsent = GDPRConsent.builder(false)
        .document("parental_consent_agreement_v2")
        .location("17 Cherry Tree Lane")
        .hardwareId("IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702")
        .build();

// Only one CCPA consent object can be set - it has an implied purpose of `data sale opt-out`
CCPAConsent ccpaConsent = CCPAConsent.builder(true) // true represents a "data sale opt-out", false represents the user declining a "data sale opt-out"
        .document("ccpa_consent_agreement_v3")
        .timestamp(date)
        .location("17 Cherry Tree Lane")
        .hardwareId("IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702")
        .build();

// Add to your consent state
ConsentState state = ConsentState.builder()
        .addGDPRConsentState("location_collection", locationCollectionConsent)
        .addGDPRConsentState("parental", parentalConsent)
        .setCCPAConsentState(ccpaConsent)
        .build();

user.setConsentState(state);

// Remove Consent State
ConsentState updatedState = ConsentState.withConsentState(state)
        .removeGDPRConsentState("parental")
        .removeCCPAConsentState()
        .build();

user.setConsentState(updatedState);
```

```kotlin
var user = MParticle.getInstance().Identity().currentUser;

// Create GDPRConsent
var locationCollectionConsent = GDPRConsent.builder(true)
        .document("location_collection_agreement_v4")
        .location("17 Cherry Tree Lane")
        .hardwareId("IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702")
        .build()

var parentalConsent = GDPRConsent.builder(false)
        .document("parental_consent_agreement_v2")
        .location("17 Cherry Tree Lane")
        .hardwareId("IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702")
        .build()

// Only one CCPA consent object can be set - it has an implied purpose of `data sale opt-out`
var ccpaConsent = CCPAConsent.builder(true) // true represents a "data sale opt-out", false represents the user declining a "data sale opt-out"
        .document("ccpa_consent_agreement_v3")
        .timestamp(date)
        .location("17 Cherry Tree Lane")
        .hardwareId("IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702")
        .build()

// Add to your consent state
var state = ConsentState.builder()
        .addGDPRConsentState("location_collection", locationCollectionConsent)
        .addGDPRConsentState("parental", parentalConsent)
        .setCCPAConsentState(ccpaConsent)
        .build()

user?.setConsentState(state);

// Remove Consent State
var updatedState = ConsentState.withConsentState (state)
        .removeGDPRConsentState("parental")
        .removeCCPAConsentState()
        .build();

user?.setConsentState(updatedState);
```
:::
