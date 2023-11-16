import React from 'react';
import { render } from '@testing-library/react-native';
import Button from '../components/Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Button />);
    const button = getByTestId('button-component');
    expect(button).toBeTruthy();
  });
});
