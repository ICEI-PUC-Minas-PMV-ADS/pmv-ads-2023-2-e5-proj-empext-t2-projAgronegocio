import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { UserContext, UserProvider, useUser } from '../contexts/UserContext';

  it('useUser returns context values', () => {
    const testValues = {
      signed: true,
      setSigned: jest.fn(),
      name: 'John Doe',
      setName: jest.fn(),
      id: '123',
      setId: jest.fn(),
    };

    let result;

    const TestComponent = () => {
      result = useUser();
      return null;
    };

    act(() => {
      renderer.create(
        <UserContext.Provider value={testValues}>
          <TestComponent />
        </UserContext.Provider>
      );
    });

    expect(result).toEqual(testValues);
  });

