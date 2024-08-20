import { Component, computed, input } from '@angular/core';
import { WeatherConditionsIcons, WeatherConditionsDescription } from '../../utils/enums';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-icon',
  template: `
    <figure class="max-w-lg">
      <img class="h-40 max-w-full rounded-lg" [src]="iconPath()" alt="image description">
      <figcaption class="mt-2 text-3xl text-center text-orange-500 dark:text-gray-400">{{ weatherDescription() }}</figcaption>
    </figure>
  `
})

export class IconComponent{
  weatherCondition = input.required<string>();

  iconPath = computed(() => {

    const conditionKey = this.weatherCondition() as keyof typeof WeatherConditionsIcons;

    return `assets/weather_icons/${WeatherConditionsIcons[conditionKey]}.svg`
  });

  weatherDescription = computed(() => {
    const conditionKey = this.weatherCondition() as keyof typeof WeatherConditionsDescription;

    return WeatherConditionsDescription[conditionKey]
  })
}
