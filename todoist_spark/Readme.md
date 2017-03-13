Todoist w/ Spark on Databricks
=======

## Definitions

[Todoist](http://en.todoist.com) - a webapp for managing todo list
[IFTTT](http://ifttt.com/)IFTTT - If This Than That app to manage connection between todoist and google sheets
[Google Sheets](http://docs.google.com/) - web based spread sheet for collecting data
[Databricks](http://databricks.com/)] - cloud based spark as a service
[Spark](http://spark.apache.org/) - distributed toolset for managing big data
Spark ML - Machine Learning Library built on spark(at time of this doc two different versions available)
open tasks - events indicating a task was opened
close tasks - events indicating a was completed

## Description

This project contains the components of a notebook for a simple ML example using Gradient Boosted Trees(GBT) using 
todoist data imported from IFTTT into google sheets.  The goal is to evaluate the efficacy of using a spark ML to simple
predictive analytics on day-to-day tasks.  

## Data

Todoist data was organized into both open and closed events organized in a large csv w/ following header:

```
description, project, date/time, tags, priority, link to task w/ id
```

Example:

```
create readme,	Spark,	March 9, 2017 at 08:35AM, any,	Priority 2,	https://todoist.com/showTask?id=123

```

## Run
- get data into a clean format using google sheets
- import data into databricks
- add each step to a cell in a notebook

## Analysis

see [GBT Analysis](docs/gbt_analysis.md)