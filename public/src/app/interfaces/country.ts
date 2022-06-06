declare interface Country {
  country_id?: string;
  country_name?: string;
  country_code?: string;
  country_state?: boolean;
  country_cities?: Array<City>;
}

declare interface City {
  city_id?: string;
  city_name?: string;
  city_state?: boolean;
}