import { useState, useCallback } from 'react';

/**
 * A hook that provides a random color from a predefined list
 * @param initialColors Optional array of color values to use (defaults to a preset palette)
 * @returns An object containing the current color and functions to get a new random color
 */

export const useRandomColor = (initialColors?: string[]) => {
  const defaultColors = [
    '#6759FF', // Purple
    '#FF5757', // Red
    '#00C2A8', // Teal
    '#FFBD59', // Orange
    '#4ECB71', // Green
    '#5271FF', // Blue
    '#FF66C4', // Pink
    '#8C52FF', // Violet
    '#00B8D9', // Cyan
    '#FFC400', // Yellow
  ];

  const colors = initialColors || defaultColors;
  const [currentColor, setCurrentColor] = useState<string>(getRandomItem(colors));

  function getRandomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  const getNewColor = useCallback(() => {
    if (colors.length <= 1) return currentColor;
    
    let newColor = currentColor;
    while (newColor === currentColor) {
      newColor = getRandomItem(colors);
    }
    
    setCurrentColor(newColor);
    return newColor;
  }, [colors, currentColor]);

  const getAnyRandomColor = useCallback(() => {
    const randomColor = getRandomItem(colors);
    setCurrentColor(randomColor);
    return randomColor;
  }, [colors]);

  return {
    color: currentColor,
    getNewColor,
    getAnyRandomColor,
    allColors: colors,
  };
};