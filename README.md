#Installation

To install from source, open a shell at the root project folder and:

```
npm install
grunt
```

Then upload the DataTableComponent.zip file located in the bin folder to /public/cde/components on your pentaho server.

Then either restart Pentaho or navigate to the url: 

http://localhost:8080/pentaho/plugin/pentaho-cdf-dd/api/renderer/refresh

Where localhost:8080 is the hostname/ip:port of your pentaho server.