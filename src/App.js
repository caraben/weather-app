import React, { Component } from "react";
import "./App.scss";

class App extends Component {
  state = {
    isLoading: false,
    error: null,
    tempC: 10,
    tempF: 50,
    weatherIcon: "",
    country: "HU",
    city: "Gyor",
    cOrF: "celsius"
  };

  //for testing-->
  /*componentDidMount() {
    this.setState({
      weatherIcon: "Clouds",
      isLoading: true
    });
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }*/
  componentDidMount() {
    this.setState({ isLoading: true });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url =
          "https://fcc-weather-api.glitch.me/api/current?lat=" +
          lat +
          "&lon=" +
          lon;

        fetch(url)
          .then(resp => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("something went wrong...");
            }
          })
          //.then(data => console.log(JSON.stringify(data)))
          .then(data => {
            this.setState({
              tempC: data.main.temp,
              tempF: (data.main.temp * 9) / 5 + 32,
              weatherIcon: data.weather[0].main,
              country: data.sys.country,
              city: data.name,
              cOrF: "celsius",
              isLoading: false
            });
            console.log(this.state.weatherIcon);
          })
          .catch(error => this.setState({ error, isLoading: false }));
      });
    } else {
      alert("This browser not supports geolocation");
    }
  }

  switchToCel = () => {
    this.setState({
      cOrF: "celsius"
    });
  };
  switchToFah = () => {
    this.setState({
      cOrF: "fahrenheit"
    });
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <div id="loading">
          <p className="loading-text">Loading...</p>
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1 id="countryCity">
            {this.state.city}, {this.state.country}
          </h1>
          {this.state.cOrF === "celsius" && (
            <h3 id="temp">{this.state.tempC} °C</h3>
          )}
          {this.state.cOrF === "fahrenheit" && (
            <h3 id="temp">{this.state.tempF} °F</h3>
          )}
          <div id="celsiusFahrenheit">
            <p onClick={this.switchToCel}>Celsius</p>
            <p onClick={this.switchToFah}>Fahrenheit</p>
          </div>
          <h2 id="weather">{this.state.weatherIcon}</h2>
          {this.state.weatherIcon === "Drizzle" && ( //drizzle
            <div className="icon sun-shower">
              <div className="cloud" />
              <div className="sun">
                <div className="rays" />
              </div>
              <div className="rain" />
            </div>
          )}
          {this.state.weatherIcon === "Mist" && (
            <div className="icon mist-weather">
              <div className="cloud" />
              <div className="mist" />
              <div className="mist" />
            </div>
          )}
          {this.state.weatherIcon === "Clouds" && (
            <div className="icon cloudy">
              <div className="cloud" />
              <div className="cloud" />
            </div>
          )}
          {this.state.weatherIcon === "Rain" && (
            <div className="icon rainy">
              <div className="cloud" />
              <div className="rain" />
            </div>
          )}
          {this.state.weatherIcon === "Snow" && (
            <div>
              <p>ola</p>
              <div className="icon flurries">
                <div className="cloud" />
                <div className="snow">
                  <div className="flake" />
                  <div className="flake" />
                </div>
              </div>
            </div>
          )}
          {this.state.weatherIcon === "Clear" && (
            <div className="icon sunny">
              <div className="sun">
                <div className="rays" />
              </div>
            </div>
          )}
          {this.state.weatherIcon === "Thunderstorm" && (
            <div className="icon thunder-storm">
              <div className="cloud" />
              <div className="lightning">
                <div className="bolt" />
                <div className="bolt" />
              </div>
            </div>
          )}
          <div id="credit">
            <p>Weather icons from </p>
            <a
              href="https://gist.github.com/CodeMyUI/1f39e9189b03632309af"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodeMyUI
            </a>
          </div>
        </div>
      );
    }
  }
}

export default App;
