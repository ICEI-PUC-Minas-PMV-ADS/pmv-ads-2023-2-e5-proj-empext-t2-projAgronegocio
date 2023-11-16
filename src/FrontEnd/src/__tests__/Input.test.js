import React from 'react';
import { render } from '@testing-library/react-native';
import Input from '../components/Input';

jest.mock('react-native-paper', () => ({
  TextInput: 'TextInput',
}));

describe('Input Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Input />);
    const input = getByTestId('input-component');
    expect(input).toBeTruthy();
  });
});
