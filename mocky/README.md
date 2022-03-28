# Monte Carlo Projection Chart

A dark-themed projection chart based on the Monte Carlo simulation.

## Description

Project is built using the create-react-app boilerplate, and uses tailwind for ease of implementation, and is responsive to different screen sizes.

## Component Documentation

### Header

* Displays the header information of the page
* Includes the title and page description

### FormInput

* Reusable react form component to act as a layer of abstraction for native react forms
* Has label and onChange fields to define the behaviour of the form

### InputFields

* Renders the two input fields for Initial Investment and Monthly Investment
* Due to time constraints, error checking for non-numerical inputs are not complete

### DrawLineSeries

* Renders the XYPlot of the graph given the data returned from the Mocky API call
* Uses FlexibleXYPlot for responsive graph sizing
* Reusable by varying the data passed to the parameters

### Projection

* Displays the main bulk of the page without the header
* Uses InputFields to modify its internal state of Initial Investment and Monthly Investment
* Uses DrawLineSeries with the data from the API called from InputFields to draw the projection line
* To have multiple instances of charts, include multiple instances of DrawLineSeries with the same or different data sources


