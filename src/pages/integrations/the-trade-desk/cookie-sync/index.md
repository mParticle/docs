---
title: Cookie Sync
---

Cookie Sync integrations allow mParticle to to communicate with a partner to link an mParticle ID to the partner ID. The partner ID is then added to the user profile and can be used for Audience integrations.

Since they use web cookies to identify users, Cookie Sync integrations can only be connected to Javascript Web platform inputs.

You can find Cookie Sync integrations in the Directory by selecting **Configuration Type: Cookie Sync**. Your current Cookie Sync outputs can be viewed at **Setup > Outputs** on the **Cookie Sync Configurations** tab.

You can connect your Web input to a Cookie Sync configuration in the Connections screen, just like an Event configuration. No configuration settings are required.

Connecting your Web input to The Trade Desk Cookie Sync output allows mParticle to capture the Trade Desk User ID for your web users, where available.
 
 mParticle will only perform a sync for a given mParticle ID if a sync has not already been performed in the previous 14 days.
 