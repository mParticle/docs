---
title: Data Privacy Controls
order: 3.5
---

Data Privacy Controls give brands the tools they need to manage their customer or visitor consent and privacy obligations under the European Union's General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).

Before instrumenting consent state in your app, be sure to read [Data Privacy Controls](/guides/data-privacy-controls).

Consent state can be logged in the SDK using `consent_state` in the [Events API](/developers/server/json-reference/#consent_state).

Once a consent state is set, it can't be modified. To change the consent state for a given purpose, you can either remove it, or replace it with a new complete consent state object.
### Setting GDPR Consent

~~~javascript
var user = mParticle.Identity.getCurrentUser()
// Create consents for different purposes (in this case, location and parental consent purposes)
var location_collection_consent = mParticle.Consent.createGDPRConsent(
    true, // Consented
    Date.now(), // Timestamp
    "location_collection_agreement_v4", // Document
    "17 Cherry Tree Lane", // Location
    "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702" // Hardware ID
);

var parental_consent = mParticle.Consent.createGDPRConsent(
    false, // Consented
    Date.now(), // Timestamp
    "parental_consent_agreement_v2", // Document
    "17 Cherry Tree Lane", // Location
    "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702" // Hardware ID
);

// Add to your consent state
var consentState = mParticle.Consent.createConsentState();
consentState.addGDPRConsentState("location_collection", location_collection_consent);
consentState.addGDPRConsentState("parental", parental_consent);
user.setConsentState(consentState);

// Remove consent state
consentState = user.getConsentState();
if(consentState) {
  if (consentState.getGDPRConsentState()["parental"]) {
    consentState.removeGDPRConsentState("parental");
    user.setConsentState(consentState);
  }
}
~~~
### Setting CCPA Opt-Out

CCPA follows the easy-to-use GDPR consent framework we established above, but is even simpler in that it includes a `purpose` for `data sale opt-out`:

~~~javascript

// Log the user's decision on the implied purpose of "data sale opt-out" 
var ccpaConsentState = mParticle.Consent.createCCPAConsent(
    true, // true represents a "data sale opt-out", false represents the user declining a "data sale opt-out"
    Date.now(), // Timestamp
    "ccpa_agreement_v1", // Document
    "17 Cherry Tree Lane", // Location
    "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702" // Hardware ID
);

// Add to your consent state from above
consentState.setCCPAConsentState(ccpaConsentState); // Note that *purpose* is not required here, unlike in GDPR above where it is required
user.setConsentState(consentState);

// Remove CCPA consent state
consentState = user.getConsentState();
if(consentState) {
  consentState.removeCCPAConsentState() // Note that *purpose* is not required here, unlike in GDPR above where it is required
  user.setConsentState(consentState);
}
~~~
