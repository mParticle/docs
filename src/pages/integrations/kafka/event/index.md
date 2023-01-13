---
title: Event
---

[Kafka](https://kafka.apache.org/) is used for building real-time data pipelines and streaming apps. It is horizontally scalable, fault-tolerant, wicked fast, and runs in production in thousands of companies.

## Prerequisites

To enable the Kafka integration, you will need a list of comma-separated bootstrap servers that identify an initial subset of servers, "brokers," in the Kafka cluster. You will also need to provide the name of the Kafka topic stream to publish to.

Each broker is a host and port pair, separated by a colon:

```http
localhost:9092
localhost:9092,anotherhost:9092
```

mParticle will pick the first available broker from the list and use that broker to discover the full set of brokers in the cluster. Because membership in a cluster dynamically changes and can be quite large, it is not necessary to specify all of the brokers. Forwarding will make use of all brokers regardless of which brokers were initially specified.

The cluster of brokers is managed by an additional Zookeeper server that handles membership changes and leader election processes.

## Authentication

mParticle will only transmit data to a Kafka cluster encrypted over TLS. This integration supports 2 types of authentication methods. All of them require the following [Configuration Settings](#configuration-settings) as a base configuration:

* `Apache Kafka Bootstrap Servers`
* `Topic Name`

<aside class="notice">SSL is always enabled for traffic encryption, regardless of the selected authentication method.</aside>

Reference the [Kafka documentation](http://kafka.apache.org/documentation/#configuration) for more information about configuring your streams on your Kafka cluster.

### Authentication using SASL

For production environments we only support SASL using `SASL_SSL` security protocol. This method uses a `User Name` and a `Password` in order to authenticate against a Kafka cluster. The followings [Configuration Settings](#configuration-settings) are required in order to use this authentication method:

* `Authentication Mechanism`
* `User Name`
* `Password`

<aside class="warning">If no `User Name` is provided, the security protocol used will default to SSL instead of SASL_SSL.</aside>

<aside class="notice">Note that it is not possible to have a password without a username.</aside>

Supported SASL-enabled mechanism for authentication:

* PLAIN (default)
* SCRAM-SHA-256
* SCRAM-SHA-512

#### SASL_SSL configuration example

Below is a configuration example using `SASL_SSL` security protocol and `PLAIN` SASL mechanism for authentication. The configuration settings are contained within the `.properties` file for your broker:

~~~http
ssl.client.auth=none
sasl.enabled.mechanisms=PLAIN
security.inter.broker.protocol=SASL_SSL

# The following settings are needed to allow mParticle to verify your certificate
ssl.keystore.location=your-keystore-location
ssl.keystore.password=your-keystore-password
ssl.keystore.type=JKS
ssl.key.password=your-key-password

# Replace with your specific host name and port
listeners=SASL_SSL://your-host.name:port

java.security.auth.login.config=/path/to/jaas.conf
~~~

The keystore may be in PKCS12 or JKS format.

In your `jaas.conf`, create a username and password for mParticle:

~~~http
KafkaServer {
  org.apache.kafka.common.security.plain.PlainLoginModule required
  username="admin"
  password="admin-secret"
  user_admin="admin-secret"
  user_mparticle="mparticle-secret";
};
~~~

The `KafkaServer` block in `jaas.conf` is in addition to another `Client` block, stored within the file and containing credentials for use with the Zookeeper server that manages brokers in the cluster.

The `username` and `password` keys are used by the broker as login credentials for login into other brokers. Note that these should _not_ be used as the `User Name` and `Password` in the [Configuration Settings](#configuration-settings).

The `user_xxxxxx` keys identifies valid accounts and passwords pairs for logging into the broker itself. The  `User Name` and `Password` in the [Configuration Settings](#configuration-settings) must match one of the pairs with the `user_` prefix. For example, a valid user in the above example is either `admin` or `mparticle`.

To avoid placing username and password information in configuration files, you can write a custom login module or use the SCRAM mechanisms to store credentials within the Zookeeper server.

For more information on how to set SASL in your kafka cluster, see https://kafka.apache.org/documentation/#security_sasl

### Authentication using SSL

To use this method just fill the `Apache Kafka Bootstrap Servers` and `Topic Name` base configuration settings, and leave the others empty. Brokers in the Kafka cluster must use a certificate issued by a globally trusted certificate authority and must contain a CN (common name) or SAN (subject alternative name) that matches the hostname.

If you require a more personalized approach to SSL configuration, please reach out to your customer success manager for assistance in setting up the integration.

### Further information

For more information on Apache Kafka security configuration, see https://kafka.apache.org/documentation/#security.

More information about the general structure of the `jaas.conf` file can be found here: https://docs.oracle.com/javase/7/docs/technotes/guides/security/jgss/tutorials/LoginConfigFile.html.

## Data processing notes

* The Kafka integration accepts data from all platform types and identities.
* Kafka topics are divided into partitions. Ordering is only guaranteed within a partition. Events forwarded to a Kafka topic are assigned an mParticle user ID as the partitioning key so that each user's events are sent to the same partition and are received in order. In the rare case that an event does not have a user ID, the event is forwarded to a random partition.

## Supported events

mParticle forwards the following event types to Kafka:

* App Event
* Application State Transition
* Breadcrumb
* Commerce Event
* Crash Report
* First Run
* Network Performance
* Opt Out
* Profile
* Push Message
* Push Registration
* Screen View
* Session Start / End
* Uninstall
* User Attribute Change
* User Identity Change

## Data format

mParticle forwards data to Kafka as event batches in our standard outgoing [JSON format](https://docs.mparticle.com/developers/server/json-reference/#differences-between-incoming-and-outgoing-json).

## Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| Apache Kafka Bootstrap Servers | `string` | <unset> | This is a comma-separated list of Kafka bootstrap servers. |
| Topic Name | `string` | <unset> | This is your Kafka topic.	 |
| Authentication Method | `enum` | `PLAIN` | SASL mechanism to use for Authentication. Supported types: `PLAIN`, `SCRAM-SHA-256`, `SCRAM-SHA-512`|
| User Name| `string` | <unset> | User Name for your Kafka account |
| Password | `string` | <unset> | Password for your Kafka account |

## Connection Settings

Setting Name | Data Type | Default Value | Platform | Description
|---|---|---|---|---
| Unique ID | `string` | <unset> | All| An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Metadata Field Exclusion | Custom Field |  | All | A way to exclude specific fields of metadata properties (Device Name or IP Address) in the output. | 
| Send Network Performance Events | `bool` | True | All| If enabled, network performance events will be forwarded. |
| Send as Batch | `bool` | True | All| If enabled, this setting will cause your app's events to be sent in (roughly) 10-minute batches per device.  If disabled, mParticle will POST each event to you individually, as its received.  This setting is ignored if "Wait for Complete Batch" is enabled. |
| Include Location Information | `bool` | True | All| If enabled, location data will be forwarded with event data whenever possible. |
| Include Metadata | `bool` | True | All| If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Include User Attribute Change Events | `bool` | False | All| If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | All| If enabled, User Identity Change Events will be forwarded. |
| Send Batches without Events	 | `bool` | True | All| A way to send eventless batches |
| Include MP DeviceId	 | `bool` | False | All| If enabled, MP DeviceId will be forwarded with event batches. |
| Include Event Batch Location | `bool` | False | All | If enabled, event batch context.location data will be forwarded with event data. |
