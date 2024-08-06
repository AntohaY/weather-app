

export interface ApiResponse {
  dataseries: DailyForecast[],
  init: string,
  product: string
}

export interface CivilApiResponse {
  dataseries: HourlyForecast[],
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
  wind10m_max: string,
  windDirection?: string,
}

export interface HourlyForecast {
  timepoint: string,
  cloudcover: string,
  lifted_index: string,
  prec_type: string,
  prec_amount: string,
  temp2m: string,
  rh2m: string,
  wind10m : {
    direction : string,
    speed : string
  },
  weather: string
}
