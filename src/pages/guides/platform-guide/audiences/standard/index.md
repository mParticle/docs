---
title: Standard Audiences
order: 8.3
---

The mParticle Standard Audiences feature enables you to define and build audiences based on long-term historical data.

<aside>Standard Audiences are a paid premium feature. Contact your mParticle representative if you're interested in using Standard Audiences.</aside>

Standard Audiences differ from Real-time Audiences, in a few key ways:

* Real-time audiences are based only on recently received data. For most customers, real-time audiences draw on the most recent 30 days of data. Standard Audiences uses any data that we have saved, according to your retention policies.
* Real-time audiences are constantly calculated and updated on an ongoing basis, and changes to the audiences are often forwarded to Audience partners in near real-time. Standard Audiences are calculated only once and, given the volume of data involved, take some time to complete. Forwarding a Standard Audience to an audience partner also happens only once. You can manually set the audience to be calculated or sent again.
* Since Standard Audiences use huge amounts of data, your account is limited to a set amount of calculations per year. A single calculation can include multiple audiences as long as they are calculated together (see below).
* While Standard Audiences support all of the same Audience partners as Real-time audiences, with the same connection settings, the workflow of calculating and sending a Standard Audience has a few optional steps: to allow you to make the most of your calculations, you can calculate and send audiences in bulk.

<aside>
Be aware that there is a 48-hour delay for live data to become available for standard audiences. When creating a standard audience, select the end date of 'most recent' to get the latest available data.
</aside>

## Calculation credits

Standard audiences are purchased by buying annual calculation credits. Each calculation credit lets you run a calculation across 365 days of your historical data, regardless of how many audiences are included. You can calculate many standard audiences at once. There are prompts in the product to select the audiences to calculate and confirm how many credits you are spending.

Some example calculations and costs:
- 1 standard audience spanning from 1/1/2018 to 1/1/2020: this costs 2 credits as it scans 2 years of data.
- 3 standard audiences spanning from 1/1/2019 to 12/31/2019: this costs 1 credit as it scans 1 year of data (with many audiences).

## Standard audience lifecycle

Standard audiences have a 4 stage lifecycle:
- <strong>Draft</strong>: The audience is being drafted and has not yet been calculated. To calculate it, press 'calculate' and confirm that credits will be spent.
- <strong>Calculating</strong>: The audience is being calculated. Progress indications are shown in the UI and the time this takes depends on the date range selected (and thus the data volume scanned).
- <strong>Ready</strong>: The audience has been calculated and is ready for use by connecting and sending it downstream.
- <strong>Expired</strong>: 30 days after a standard audience is calculated, it is expired and appears in the Expired tab in **Audiences > Standard**.

  - An expired audience can no longer be connected, but it can be cloned for recalculation. 
  - Any real-time audience criteria that checks user membership in a standard audience is not affected by standard audience expiration, as the users membership is saved in the users profile. 
  - Audience membership is not removed from downstream partners.

## Workflow

### 1 - Create a new standard audience

Standard Audiences are managed separately from Real-time audiences. Choose **Audiences > Standard** from the main navigation menu, and click **New Standard Audience**.

![](/images/standard-create.png)

### 2 - Define date range and inputs

Just as with [real-time audiences](/guides/platform-guide/audiences/real-time/), you can define which inputs you want use to calculate the audience. For Standard Audiences you also need to define a date range. You can choose **All available data** or define any period within the available range. When you’re ready, click **Create**. The start and end dates are inclusive and it uses the UTC timezone.

![medium](/images/lifetime-define-range.png)

### 3 - Define audience criteria

Define your audience by clicking the plus sign to create and define one or more criteria. This step is the same as in [real-time audiences](/guides/platform-guide/audiences/real-time/#define-audience-criteria/). When your definition is ready, click **Save as Draft**. Notice that after a moment, a **Calculate** button displays next to the grayed-out **Save as Draft** button.

![](/images/standard-define-criteria.png)

### 4 - Calculate one or more audiences

At the top of the Standard Audiences page from step 3, click **Calculate**.

Select any additional DRAFT audiences from the list to add them to the calculation. This modal shows you how many calculation credits will be deducted from your account. When you’re ready click **Start Calculation**.

![large](/images/standard-start-calculation.png)

### 5 - Set up one or more connections

At first your audience shows as **Calculating** in the list view **Status** column under **Audience Details**. While you wait for the calculation to complete, you can set up one or more audience connections by clicking the green plus sign in the **Conencted Outputs** column. 

Calculation can take many hours for large amounts of data. You can track progress via a popup in the **Size** column.

The Connections screen functions the same as for [real-time audiences](/guides/platform-guide/audiences/real-time/#set-up-an-audience-output/). Add and configure one or more connections. The only difference is that when you save the connection, no data is forwarded until you explicitly send the audience.

### 6 - Send your calculated audience

Once your audience is completely calculated, you can see it in the **Ready** tab. Click Send next to an Audience to go back to the **Connections** screen.

![](/images/standard-send.png)

From the **Connections** screen click **Send**. You can also adjust your output connections here as needed.

![](/images/standard-connection-screen.png)

Select one or more audience Outputs and click **Send**.

![medium](/images/lifetime-select-outputs.png)

All members of the audience are forwarded to the output.

Calculated audience will remain in the **Ready** tab for **30 days**, after which they will need to be recalculated and can be found in the **Archive** tab. Once an audience is in the archive tab, you can clone and recalculate it.  Remember that the audience will not be updated in real time. If you want to update the audience, you must run the calculation again.
