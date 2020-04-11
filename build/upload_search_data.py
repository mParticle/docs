import os
import json
import time
import sys

search_domain_dev = 'http://search-mparticle-docs-dev-bjdn4zkr3qejlv27yt7ydobuqe.us-east-1.cloudsearch.amazonaws.com'
search_domain_prod = 'http://search-mparticle-docs-prod-6ozkfhxijk6v43sgv6wjl4kapq.us-east-1.cloudsearch.amazonaws.com'
search_domain = search_domain_prod if sys.argv[1] == 'prod' else search_domain_dev
current_docs_filename = 'current_documents.json'
new_docs_filename = 'latest_search_items.json'
update_command_filename = 'update_documents.json'
search_command = 'aws cloudsearchdomain search --search-query "matchall" --region "us-east-1" --endpoint-url "'+search_domain+'" --query-parser "structured" --size 5000 --return "_no_fields" > ' + current_docs_filename
upload_command = 'aws cloudsearchdomain upload-documents --debug --region "us-east-1" --endpoint-url "'+search_domain+'" --content-type application/json --documents ' + update_command_filename
print 'Connecting to AWS'
os.system(search_command)

with open(current_docs_filename) as data_file:    
    current_search_docs = json.load(data_file)

with open(new_docs_filename) as data_file:    
    new_search_docs = json.load(data_file)

update_operation = []
hits = current_search_docs['hits']['hit']
print 'Found ' + str(len(hits)) + ' old documents'
for hit in hits:
    delete_op = {"type":"delete","id":hit["id"]}
    update_operation.append(delete_op)

for item in new_search_docs:
    update_operation.append(item)

with open(update_command_filename, 'w') as outfile:
    json.dump(update_operation, outfile, indent=4)    
  
print 'Deleting ' + str(len(hits)) + ' old documents and uploading '+ str(len(new_search_docs)) +' new documents'
os.system(upload_command)
print 'Done uploading'


