 


## Google Cloud Storage

Google Cloud Storage provides a file storage web service for developers and enterprises that combines the performance and scalability of Google’s cloud with geo-redundancy, advanced security and sharing capabilities.

### Supported Features

* Event Forwarding

### Prerequisites

To activate your Google Cloud Storage integration, you will need an active Google Service Account. 

Create a Bucket in your account to store your mParticle data and grant `Storage Object Creator` to `mparticle-gcp-clientfacing@gcp-prod-170221.iam.gserviceaccount.com`. This allows mParticle to create files in your bucket.

Optionally, you can create a folder in your bucket to store your mParticle data. This is useful if you are storing other data in the same bucket, or if you want to separate dev and production data without creating two buckets. If you want to store your data in a folder, you must provide the name of the folder in the Connection Settings dialog.

### Data Processing Notes

Google Cloud Storage accepts data from all platform types. All event types are supported. By default all available data will be forwarded, but you can pick and choose which events and attributes to send in the Connection Settings dialog.




