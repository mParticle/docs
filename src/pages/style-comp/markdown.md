---
title: Markdown Comps
noindex: true
---

# (H1) Section Title L3 Graphik SB 32px/40 #1F1F1F

## (H2) Page Title L4 - Graphik Regular 26px/32 #007387

(Body Large) 1-2 sentences at the beginning of every page. Roboto Regular 16px/26 #545C62 The Android SDK can be incorporated into native Android apps running on smartphones and other platforms.

### (H3) Child L4.1

(Body) Roboto Regular 14px/22 #1f1f1f. mParticle’s Android integration is powered by a “core” library, which supports mParticle’s server-side integrations and audience platform.
You can get the core SDK via Maven Central. Please follow the releases page on Github to stay up to date with the latest version.

#### (H4) CHILD L4.1.1 ROBOTO MONO BOLD 16px/22, #007387 UPPERCASE

The Google Play Services Ads framework is necessary to collect the Android Advertisting ID. AAID collection is required by all attribution and audience integrations, and many other integrations. Include the artifact, a subset of Google Play Services:

##### (H5) Body Header

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

This is an H6

<aside>This is an aside</aside>
<aside class='warning'>Warning aside here</aside>
<aside class='notice'>Just a notice</aside>
<aside class='success'>Hey, success</aside>

# LogoLink Buttons

<LogoLinkButton icon='get-started' label='Get Started' path='/sdk-guides/client-side/android/getting-started/' />

<LogoLinkButton icon='android' label='Source Code' path='https://github.com/mParticle/mparticle-android-sdk' />

<LogoLinkButton icon='github' label='Source Code' path='https://github.com/mParticle/mparticle-android-sdk' />

<LogoLinkButton
    icon='appletv'
    label='Apple TV'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='android'
    label='Android'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='ios'
    label='iOS'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='javascript'
    label='JavaScript'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='typescript'
    label='TypeScript'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='roku'
    label='Roku'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='ruby'
    label='Ruby'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='github'
    label='Github'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='cordova'
    label='Cordova'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='xamarin'
    label='Xamarin'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='web'
    label='Web'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='unity'
    label='Unity'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='amp'
    label='Google AMP'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='windows'
    label='Windows'
    path='https://docs.mparticle.com'
/>
<LogoLinkButton
    icon='get-started'
    label='Get Started'
    path='https://docs.mparticle.com'
/>

# Tabs

<tabs>

<tab label='Android' group='hello-world'>

:::code-selector-block

```kotlin
fun main(args: Array<String>) {
    println("Hello, world!")
}
```

```java
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

:::

</tab>

<tab label='iOS' group='hello-world'>

:::code-selector-block

```objectivec
import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        NSLog(@"Hello, World!");
    }
    return 0;
}
```

```swift
import Swift
print("Hello, World!")
```

:::

</tab>

<tab label='Web' group='hello-world'>

:::code-selector-block

```javascript
console.log('Hello, world!');
```

```typescript
let helloWorld: string = 'Hello World';

console.log(helloWorld);
```

:::

</tab>

</tabs>
