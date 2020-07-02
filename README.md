This project is on IPL data spanning over the years 2008 - 2016.
Dataset used is Ball_by_Ball.csv and Match.csv from https://www.kaggle.com/harsha547/indian-premier-league-csv-dataset

Framework used for the project React

Major libraries used include:
1. @material-ui/core (npm i @material-ui/core)
2. @material-ui/icons (npm i @material-ui/icons)
3. @material-ui/lab (npm i @material-ui/lab)
4. apexcharts (npm i apexcharts)
5. classnames (npm i classnames)
6. lodash (npm i lodash)
7. react-apexcharts (npm i react-apexcharts)

@material-ui/core, @material-ui/icons & @material-ui/lab:
I have used this to get predefined components that can be used directly into projects giving it a modern and sleek look. It also contains the makeStyles hook that material-ui provides for us to enable modification of any ui component to our liking based on the scenario or breakpoints encountered if building responsive application.

apexcharts & react-apexcharts:
I have used this to allow for graphical representation of data wherever needed. The apexcharts library is a prerequisite which needs to be installed for the react-apexcharts wrapper to work with apexcharts library. It contains a wide range of graphs that empowers us to represent data in any form of our liking.

classnames:
I have used this to bind multiple classes to any component. They can be used to conditionally add and remove classnames where necessary.

lodash:
It is a very popular library which gives a wide range of apis to manipulate and extract data from within collections and arrays. Majority of the functions that require manipulation of collection and arrays can be directly solved with the use of apis available directly from lodash.

List of features which make it more interesting:
1. Load time optimization
2. Responsive over a wide range of screens.
3. Progressive web app
4. Offline usable

Load Time Optimization:
Since the data we processing at any given point is huge. Its essential that there is some caching which enables us to get a part of the data when we visit previously encountered datapoints. Thus there is a dictionary system that handles caching the data based on interesting datapoints to enable faster loading the next time we visit the same datapoints.

Responsive Design:
Material-UI and Apexcharts have a wide range of properties and breakpoint handling mechanisms that can be leveraged to design screens and style components anyway we please. Thus these were the pivital modes that I have used to make the application responsive over a wide range of screens.

Progressive Web App:
The react framework comes with prebuilt service workers that allow us to use the power of javascript to allow for applications to run on any device.

Offline Usable:
The entire data is saved as chunks on the application static directory thus enabling us to access the data any time we want without the availability of internet. Once the application is saved to your home screen it can be accessed at anytime as long as the application is downloaded as a pwa.
