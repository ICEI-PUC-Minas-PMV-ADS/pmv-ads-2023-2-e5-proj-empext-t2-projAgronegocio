import React from 'react';
import { render } from '@testing-library/react-native';
import Container from '../components/Container';

describe('Container Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Container />);
    const container = getByTestId('container-component');
    expect(container).toBeTruthy();
  });
});
