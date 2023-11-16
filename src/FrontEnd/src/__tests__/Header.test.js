import React from 'react';
import { render } from '@testing-library/react-native';
import Header from '../components/Header';

jest.mock('react-native-vector-icons/FontAwesome', () => ({
  Icon: 'FontAwesome',
}));

describe('Header Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Header />);
    const header = getByTestId('header-component');
    expect(header).toBeTruthy();
  });
});
