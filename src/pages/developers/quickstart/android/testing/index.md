---
title: Step 9. Test your local app
order: 10
---

To test your mParticle local sample app:

- [Integrate a kit to a local sample app](#integrate-a-kit-to-a-local-sample-app).
- [Add the SDK to a local sample app project](#add-the-sdk-to-a-local-sample-app-project).


## Integrate a kit to a local sample app

To integrate a kit to a local sample app project:

1. Navigate to the app/libs folder using command `cd app/libs` (you can use the Tab key to autocomplete the path).

    * path should be similar to: *..\mparticle-android-sample-apps\core-sdk-samples\higgs-shop-sample-app\app\libs*

2. Clone the git repository using the command `git clone` *kit-repo-url*.

3. Navigate to the repository folder using the command `cd` *kit-name* or use the Tab key to add the path name to the kit repository name.

4. Check out a branch or create a new one using the command `git checkout` *branch-name* or `git checkout -b` *new-branch-name*.

5. Add the kit implementation to the app's module-level `build.gradle.kts` file: `implementation(project(":mparticle-android-integration-*replace-with-kit-name*"))`.

6. Include the kit in the project-level `settings.gradle` file:   
   `include ':mparticle-android-integration-`*replace-with-kit-name*
   `project(':mparticle-android-integration-*replace-with-kit-name*').projectDir = new File('app/libs/mparticle-android-integration-`*replace-with-kit-name*).

7. Add the sample app credentials on the main class `cdHiggsShopSampleApplication()`, replacing `.credentials(*your-apiKey,*your-apiSecret*)`.

You can now test your kit integration. Place a breakpoint inside the kit's `onCreate()` and run the app in debug mode. If the kit is integrated, the breakpoint should trigger, indicating the kit is being initialized.

## Add the SDK to a local sample app project

Due to the complexity of the multi-module configuration of the SDK, adding it directly as an operable module in the sample app is not currently supported. Different steps must be taken to build the SDK locally and add it as a dependency.

1. Fork a local copy of the SDK repository. In this local copy you must make all the configuration changes that you wish to see implemented on your local sample app before you make a local build.

2. After your changes are made, run the command  `./gradlew publishReleaseLocal`.  This command creates a local snapshot of the SDK.

3. Finally, in the sample app's module-level `build.gradle.kts` file, replace the original core implementation with yours. You can find the name in your local **m2** folder. The dependency should contain the word "SNAPSHOT." The complete dependency should be similar to the following: `implementation("com.mparticle:android-core:#.##.#-SNAPSHOT"`.

You can now test your changes locally. 
