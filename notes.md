# Solar Dashboard Implementation Notes

## Frontend

* [Figma](https://www.figma.com/file/29rFLNlgjcEXfhJ0YYqAzQ/Solar-Dashboard?node-id=0%3A1) created used [Bootstrap UI Kit](https://www.figma.com/community/file/876022745968684318)

* Based on: [NREL live](https://midcdmz.nrel.gov/apps/daily.pl?site=RAZON&live=1)
    and [NREL daily](https://midcdmz.nrel.gov/apps/daily.pl?site=RAZON&start=20170216&yr=2021&mo=6&dy=29>)

### React

* use React Hooks/functional components

* Created to look like a "Form," I guess

* [React-Bootstrap](https://react-bootstrap.github.io/) for UI Components

* [Recharts](https://recharts.org/en-US/) for charting

* [react-bootstrap-daterangepicker](https://www.npmjs.com/package/react-bootstrap-daterangepicker) for the date picker

* Data Selection component forces minimum reload: only when they submit the request does the frontend request for data from the backend

  * Output types:

    * Graph: when displaying the graph, the user should not actually be able to choose the granularity of the data, not only can they not see it the fine granularity, but the graph lags out when too much data is displayed

    * CSV: Basic csv document (directly from backend?)

    * Zip Compressed: same as csv, except compressed for better data transfer, if they need it

    * Raw Data: The raw data file of all the measurements (from Box?)

* Live Data updates every 1 minute (we might not have this feature)

### Suggestions

* Seperate scroll for side pane : <https://www.npmjs.com/package/react-pro-sidebar>?

* Center everything?

## Backend (TODO)

### [Box](https://developer.box.com/)

### Python Flask MongoDB
