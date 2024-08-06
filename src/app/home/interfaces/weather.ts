

export interface ApiResponse {
  dataseries: DailyForecast[],
  init: string,
  product: string
}

export interface DailyForecast {
  date: string,
  weather: string,
  temp2m: {
    max: string,
    min: string,
  }
  wind10m_max: string
}

export interface sevenDayForecast {

}

export interface oneDayForecast {
  minTemp: string,
  maxTemp: string,
  avgWindSpeed: string,
  windDirection: string,
}
