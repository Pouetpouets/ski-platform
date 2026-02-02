import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WeatherDisplay } from '@/components/resort/weather-display';

describe('WeatherDisplay with forecast extras', () => {
  it('renders wind speed when provided', () => {
    render(
      <WeatherDisplay
        weatherCondition="sunny"
        temperatureMin={-5}
        temperatureMax={2}
        windSpeedMax={35}
      />
    );

    expect(screen.getByText(/wind.*35 km\/h/i)).toBeInTheDocument();
  });

  it('renders wind gusts when provided', () => {
    render(
      <WeatherDisplay
        weatherCondition="sunny"
        temperatureMin={-5}
        temperatureMax={2}
        windGustsMax={55}
      />
    );

    expect(screen.getByText(/gusts.*55 km\/h/i)).toBeInTheDocument();
  });

  it('renders precipitation when > 0', () => {
    render(
      <WeatherDisplay
        weatherCondition="rain"
        temperatureMin={1}
        temperatureMax={5}
        precipitationSum={12.5}
      />
    );

    expect(screen.getByText(/precipitation.*12.5 mm/i)).toBeInTheDocument();
  });

  it('does not render precipitation when 0', () => {
    render(
      <WeatherDisplay
        weatherCondition="sunny"
        temperatureMin={-5}
        temperatureMax={2}
        precipitationSum={0}
        windSpeedMax={10}
      />
    );

    expect(screen.queryByText(/precipitation/i)).not.toBeInTheDocument();
  });

  it('renders snowfall when > 0', () => {
    render(
      <WeatherDisplay
        weatherCondition="snowing"
        temperatureMin={-10}
        temperatureMax={-3}
        snowfallSum={15}
      />
    );

    expect(screen.getByText(/snowfall.*15 cm/i)).toBeInTheDocument();
  });

  it('renders UV index when provided', () => {
    render(
      <WeatherDisplay
        weatherCondition="sunny"
        temperatureMin={-5}
        temperatureMax={2}
        uvIndexMax={6.5}
      />
    );

    expect(screen.getByText(/uvIndex.*6.5/i)).toBeInTheDocument();
  });

  it('does not render extras when none provided (backward compatible)', () => {
    const { container } = render(
      <WeatherDisplay
        weatherCondition="sunny"
        temperatureMin={-5}
        temperatureMax={2}
      />
    );

    expect(screen.queryByText(/wind/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/precipitation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/snowfall/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/uvIndex/i)).not.toBeInTheDocument();
  });

  it('still returns null when all data is missing', () => {
    const { container } = render(
      <WeatherDisplay
        weatherCondition={null}
        temperatureMin={null}
        temperatureMax={null}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
