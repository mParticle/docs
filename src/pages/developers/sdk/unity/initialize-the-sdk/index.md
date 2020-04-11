---
title: Initialize the SDK
order: 2
---

The mParticle Unity package contains a class file named `MParticle.cs`, which is a Unity `Monobehavior` that exposes the mParticle API via `MParticle.Instance`.  The package also contains the classes `MParticleiOS` and `MParticleAndroid`. These classes are used by the mParticle singleton to interact with the native iOS and Android libraries. You should never access those classes directly from your code.

### Initialization

The plugin must be initialized with your mParticle workspace key and secret prior to use, for example by placing the following into you main script's `Awake` method:

```cs
using UnityEngine;
using mParticle;
namespace MyProject
{
    public class Example : MonoBehaviour
    {
        void Awake ()
        {
         //use the correct workspace API key and secret for iOS and Android
         #if UNITY_ANDROID
          MParticle.Instance.Initialize("REPLACE ME", "REPLACE ME");
         #elif UNITY_IPHONE
          MParticle.Instance.Initialize("REPLACE ME", "REPLACE ME");
         #endif
        }
    }
}
```
