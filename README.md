# WeatherCast

**[WeatherCast](https://weathercast.cyclic.app)** is a simple weather application that provides real-time weather information based on user input or current location. It uses APIs to gather data and display it on a user-friendly interface based on **Material UI**.

(password: sultan)

<img src='./public/images/WeatherCast.png' width='100%' height='auto'>

***
#### Project Structure

The project is structured as a **Node.js**, **Express** application with multiple routes for handling different functionalities. 
***

#### Key Design Decisions

+ **Modularization**: The project is organized into separate modules to enhance maintainability and readability.

+ **Asynchronous Requests**: Asynchronous programming using async/await is employed to handle API requests efficiently.

+ **Environment Variables**: Sensitive information such as API keys is stored in environment variables (.env) to enhance security.

+ **Convenient User Experience**: With the introduction of a history search feature, users can now easily access their past search results. This means that whenever a user revisits the application, they will immediately see the weather information for their last searched location. This saves time and effort, especially for users who frequently check the weather for specific locations.

+ **User Account Management**: WeatherCast's admins ensures a more secure and efficient user experience for both administrators and regular users alike

+ **Remote Access**: Access WeatherCast conveniently on our remote host at **weather-cast.cyclic.app** to retrieve real-time weather information and view your search history with ease.
***
#### API Usage Details
+ **OpenWeatherMap API**
  + [Weather Data](https://openweathermap.org/current)
    + [GeoCoding API](https://openweathermap.org/api/geocoding-api)
  + **Google Cloud API**
    + [Maps JavaScript API](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)
  + **IPINFO API**
    + [ipinfo API](https://ipinfo.io)
  + **Time API**
    + [TimeApi](https://timeapi.io)

***
### Installations (local)

#### Step 1: Install Node.js and npm

Make sure you have **Node.js** and **npm (Node Package Manager)** installed on your machine. You can download and install them from the official website: [Node.js](https://nodejs.org/).

#### Step 2: Clone the Repository

Clone the repository

```bash
git clone https://github.com/DarkHoust/WeatherCast.git
cd WeatherCast
```

#### Step 3: Install Dependencies

Install the required **npm packages** by running the following command in your terminal:
```bash
npm install 
```
This will install the necessary dependencies specified in your **package.json** file.

#### Step 4: Run the Application

Start the application using the following command:
```bash
node app
```

#### Step 5: Access the Application

Open your **web browser** and go to "**http://localhost:3000**" to access to **WeatherCast**.

***
#### Author 
Sultan **'DarkHost'**


<img src="https://i.imgur.com/D6wYt6S.jpg" width="100%">
