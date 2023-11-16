import React from 'react';
import { render } from '@testing-library/react-native';
import Body from '../components/Body';

describe('Body Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Body />);
    const bodyComponent = getByTestId('body-component');
    expect(bodyComponent).toBeTruthy();
  });
});
