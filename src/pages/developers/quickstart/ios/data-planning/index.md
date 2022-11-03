---
title: Step 8. Create a data plan
order: 9
---

Data plans allow you to describe the type and format of the data you expect to collect in your app. mParticle compares incoming data to a data plan, preventing any data that does not match the plan from being stored in your account or forwarded to your outputs.

You can create multiple data plans in each workspace of your account, and each plan can have multiple versions.

Data plans are created from two main elements:

* Criteria: a particular data point
* Schema: a specific description of what each data point should look like. The schema is used to validate incoming data.

Use the following steps to create a basic data plan using a template in the mParticle UI.

## 8.1 Create your first data plan

Data plans can be created from templates in the mParticle UI, they can be created using the Data Plan Builder, or they can be created by importing actual event data collected from your app.

For this tutorial, use the [sample data plan](https://github.com/mParticle/mparticle-apple-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/dataplans/higgs_shop_basic_data_plan_1.json) that has been built for the Higgs Shop specifically. The steps below explain where to find the sample data plan, how to upload it to your mParticle account, activate it, and then make sure that data from your instance of the sample app is being validated against the plan.

1. Download the JSON formatted [sample data plan](https://github.com/mParticle/mparticle-apple-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/dataplans/higgs_shop_basic_data_plan_1.json) to your computer. The data plan is also included in the the Higgs Shop repository. You can find it at `mparticle-apple-sample-apps/core-sdk-samples/higgs-shop-sample-app/dataplans/higgs_shop_basic_data_plan_1.json` in the directory where you cloned the sample app repo.

2. From your mParticle dashboard, click **Data Master** in the left nav bar and select **Plans**.

![](/images/ios-e2e-screenshots/6-create-a-data-plan/create-a-data-plan-1.png)

3. Click **Create Plan** and select **Import data** before clicking **Next**.

4. Enter a name for your plan, like “Higgs Shop Plan”. Note the `Plan Id` which you will need later.

5. Under Import From, select **Upload JSON File** and upload the sample data plan.

![](/images/ios-e2e-screenshots/6-create-a-data-plan/create-a-data-plan-2.png)

6. Click **Create Plan**.

mParticle displays a detailed view of the data plan based on the JSON file you uploaded.

For each event in the list, you can see the event category, event name, and event description mParticle will expect to receive from your app. Events that include additional attributes can be expanded by clicking the **+** icon next to the event category.

<aside>
    Make note of the “slugified” plan ID displayed next to the version description at the top of the plan details page. You will need to use this string when adding your plan to the SDK initialization snippet.
</aside>

![](/images/ios-e2e-screenshots/6-create-a-data-plan/create-a-data-plan-3.png)

## 8.2 Activate your data plan

1. From the details page for your new data plan, click **Activate**.

2. Under Status, select **Active on Dev** since our SDK is only initialized to collect dev data.

![](/images/ios-e2e-screenshots/6-create-a-data-plan/create-a-data-plan-4.png)

When you begin collecting production data, you will need to change your plan’s status from Active on Dev to **Active on Prod/Dev**.

3. If you like, enter an optional description of the version you are activating.

4. Click **Activate**.

## 8.3 Add your data plan to your SDK initialization snippet

1. Open the Higgs Shop sample app in Xcode.

2. Open the file [`AppDelegate.swift`](https://github.com/mParticle/mparticle-apple-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/HiggsShopSampleApp/AppDelegate.swift). This is the same file we use to initialize the mParticle SDK.

3. In the `MParticleOptions` object, include the data plan ID and version with:

~~~swift
options.dataPlanId = "your_plan_name" // Always undercase with white space replaced with '_'
options.dataPlanVersion = 1
~~~

4. Replace `your_plan_name` with your Plan Id referenced earlier when creating a data plan.

5. Make sure that `planVersion` is set to the correct version of your plan. If you kept the default settings in step 7.1, this should be `1`.

6. Save your changes.

## 8.4 Verify that your data plan is working

1. Run you app and open the device simulator and then click around the sample app as if you were a shopper.

2. As events begin appearing in the Live Stream, note the small green check mark adjacent to each event name. This indicates that the event is valid according to our new data plan. Should an event appear that is labeled as Not Validated, it will not be added to your Data Catalog, and it will not be forwarded to any connected outputs.

Learn more about data plans and data validation in [Data Planning](https://docs.mparticle.com/guides/data-master/data-planning/).

<a href="/developers/quickstart/ios/track-users/" style="position:relative; float:left"><< Previous</a> 