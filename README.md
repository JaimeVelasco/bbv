# BumbleBee Vape  
## A serverless mkt website and email collector  

#### This is a simple static site, hosted on Github Pages and using the following technologies:
***Google App Platform*** (Google drive, Google Maps, Firebase).  
[***Zapier***](https://zapier.com/app/explore)  For automation, mainly bringing form entries to Google Drive   
[***Bulma***](http://bulma.io/)  CSS framework/style-guide.  
***jQuery***, because it's easy and any developer can join in the future.  
***Github*** Source control ***and***  hosting for our static site!  


# Updating website:
1. Add a new collaborator in our [Github Repository](https://github.com/SunFed/bbv/settings/collaboration)
2. Get the latest code using [Github Desktop](https://desktop.github.com/) or  the command line: `git clone https://github.com/SunFed/bbv.git` then `git pull origin master` will get you up to date
3. After making changes in codebase commit and push to master.
4. That's it! Updates will take effect almost instantly.

# Updating Map
#### Map spreadsheet
We use a google spreadsheet and an add-on called [Mapping Sheets](http://www.thexs.ca/xsmapping) to add locations to the map. To update map we will need to take a few steps:

1. Go to the google spreadsheet that contains map data [Link to google drive document](https://docs.google.com/spreadsheets/d/1Lr-h5Wb1zVJfrzmavVAHf3tRWrCuzFpXZC-wd-4_bJk/edit#gid=0)
2. It is important to keep the spreadsheet organized, the headers (Collective, Address, City, etc) must remain on the very first row, otherwise the map will break and it will generate a new URl after fixing it.
3. Make sure all locations have an address.
4. After editing locations on spreadsheet we need to update map, go to `add-on => Mapping Sheets => Start Mapping` then click on the red BUILD button and that should be it, unless a new URL was generated. If this is the case, we will need to replace the URL on codebase to reflect changes. Get the URL by clicking on the blue VIEW button.


#### Email spreadsheet
Using Zapier to save entries from the email collector into this spreadsheet.  
[Link to google drive document](https://docs.google.com/a/jaimevelas.co/spreadsheets/d/1zdrFPnuwliUh2t7GMP--2sry2s3I9HwcdC4oqa8sobc/edit?usp=sharing)


Recurring Costs:
Github $25 month for private repo and hosting.
Zappier: $8 Month for handling email form
Mapping Sheets: $25 a year
