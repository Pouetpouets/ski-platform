import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WeatherDisplay } from '@/components/resort/weather-display';
import { getWeatherQualityLevel, formatWeatherCondition } from '@/lib/utils/conditions';

// --- Unit tests for getWeatherQualityLevel ---

describe('getWeatherQualityLevel', () => {
  it('returns "good" for sunny', () => {
    expect(getWeatherQualityLevel('sunny')).toBe('good');
  });

  it('returns "good" for partly_cloudy', () => {
    expect(getWeatherQualityLevel('partly_cloudy')).toBe('good');
  });

  it('returns "moderate" for cloudy', () => {
    expect(getWeatherQualityLevel('cloudy')).toBe('moderate');
  });

  it('returns "moderate" for overcast', () => {
    expect(getWeatherQualityLevel('overcast')).toBe('moderate');
  });

  it('returns "poor" for snowing', () => {
    expect(getWeatherQualityLevel('snowing')).toBe('poor');
  });

  it('returns "poor" for rain', () => {
    expect(getWeatherQualityLevel('rain')).toBe('poor');
  });

  it('returns "poor" for storm', () => {
    expect(getWeatherQualityLevel('storm')).toBe('poor');
  });

  it('returns "poor" for high_winds', () => {
    expect(getWeatherQualityLevel('high_winds')).toBe('poor');
  });

  it('returns "moderate" for null', () => {
    expect(getWeatherQualityLevel(null)).toBe('moderate');
  });

  it('returns "moderate" for unknown condition', () => {
    expect(getWeatherQualityLevel('foggy')).toBe('moderate');
  });
});

// --- Unit tests for formatWeatherCondition ---

describe('formatWeatherCondition', () => {
  it('capitalizes single word', () => {
    expect(formatWeatherCondition('sunny')).toBe('Sunny');
  });

  it('replaces underscores and capitalizes each word', () => {
    expect(formatWeatherCondition('partly_cloudy')).toBe('Partly Cloudy');
  });

  it('formats high_winds', () => {
    expect(formatWeatherCondition('high_winds')).toBe('High Winds');
  });
});

// --- Component tests for WeatherDisplay ---

describe('WeatherDisplay', () => {
  it('renders section header with "Weather" title', () => {
    render(
      <WeatherDisplay weatherCondition="sunny" temperatureMin={-5} temperatureMax={2} />
    );

    expect(screen.getByText('Weather')).toBeInTheDocument();
  });

  it('displays formatted weather condition', () => {
    render(
      <WeatherDisplay weatherCondition="partly_cloudy" temperatureMin={-3} temperatureMax={1} />
    );

    expect(screen.getByText('Partly Cloudy')).toBeInTheDocument();
  });

  it('displays temperature range', () => {
    render(
      <WeatherDisplay weatherCondition="sunny" temperatureMin={-8} temperatureMax={-2} />
    );

    expect(screen.getByText('-8° / -2°C')).toBeInTheDocument();
  });

  it('shows green indicator for sunny weather', () => {
    const { container } = render(
      <WeatherDisplay weatherCondition="sunny" temperatureMin={-5} temperatureMax={2} />
    );

    expect(container.querySelector('.bg-green-500')).toBeInTheDocument();
    expect(screen.getByText('Weather: good')).toBeInTheDocument();
  });

  it('shows yellow indicator for cloudy weather', () => {
    const { container } = render(
      <WeatherDisplay weatherCondition="cloudy" temperatureMin={-4} temperatureMax={1} />
    );

    expect(container.querySelector('.bg-yellow-500')).toBeInTheDocument();
    expect(screen.getByText('Weather: moderate')).toBeInTheDocument();
  });

  it('shows red indicator for snowing weather', () => {
    const { container } = render(
      <WeatherDisplay weatherCondition="snowing" temperatureMin={-12} temperatureMax={-5} />
    );

    expect(container.querySelector('.bg-red-500')).toBeInTheDocument();
    expect(screen.getByText('Weather: poor')).toBeInTheDocument();
  });

  it('shows red indicator for storm weather', () => {
    const { container } = render(
      <WeatherDisplay weatherCondition="storm" temperatureMin={-10} temperatureMax={-3} />
    );

    expect(container.querySelector('.bg-red-500')).toBeInTheDocument();
  });

  it('renders with only weather condition (no temperature)', () => {
    render(
      <WeatherDisplay weatherCondition="sunny" temperatureMin={null} temperatureMax={null} />
    );

    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.queryByText(/°C/)).not.toBeInTheDocument();
  });

  it('renders with only temperature (no weather condition)', () => {
    render(
      <WeatherDisplay weatherCondition={null} temperatureMin={-5} temperatureMax={2} />
    );

    expect(screen.getByText('-5° / 2°C')).toBeInTheDocument();
    expect(screen.getByText('Weather')).toBeInTheDocument();
  });

  it('returns null when all data is missing', () => {
    const { container } = render(
      <WeatherDisplay weatherCondition={null} temperatureMin={null} temperatureMax={null} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('shows factor indicator with sr-only accessible label', () => {
    render(
      <WeatherDisplay weatherCondition="sunny" temperatureMin={-5} temperatureMax={2} />
    );

    const srText = screen.getByText(/Weather:/);
    expect(srText).toHaveClass('sr-only');
  });
});
