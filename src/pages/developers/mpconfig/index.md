---
title: mPConfig
---

To maintain a simple interface and interaction between our various tools and services, we've introduced an mParticle project configuration file: `mp.config.json`. This belongs at the root of your app directory.

## Overview

```json
// mp.config.json
{
    "global": {
        "workspaceId": "XXXXX",
        "clientId": "XXXXXX",
        "clientSecret": "XXXXXXXXX"
    },
    "planningConfig": {
        "baseDir": "folder/dataplan",
        "dataPlanFile": "data_plan.json",
        "versionNumber": 2
    }
}
```

The configuration file has a universal `global` configuration, as well as project specific configurations, such as `planningConfig`.

## Configuration Settings

### global

This contains settings that would pertain to your account credentials and application.

-   `workspaceId`: The workspace identifier for your team's workspace
-   `clientId`: A unique Client Identification string provided by your Customer Success Manager
-   `clientSecret`: A secret key provided by your Customer Success Manager

### planningConfig

These are configurations pertaining to your project's Data Master resources, such as data plans and versions. `planningConfig` is required if you use our data plan linting tools, which you can learn more about [here](/guides/data-master/#linting).

-   `baseDir`: A local directory within your project where Data Plans (and/or Data Plan Versions) are stored
-   `dataPlanFile`: Your current data plan file (must be used with `versionNumber` below)
-   `dataPlanVersionFile`: Your current data plan version (used in place of `dataPlanFile` and `versionNumber`)
-   `dataPlanId`: The ID of your current Data Plan
-   `versionNumber`: The Current Version Number for your Data Plan (must be used with `dataPlanFile`)
