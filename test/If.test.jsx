import React from 'react';
import {render, screen} from '@testing-library/react';
import {If} from '../src';

describe('If', () => {
  test('Truthy case', () => {
    render(
      <If check={1 < 2}>
        <span data-testid="child-if">If</span>
      </If>
    );
    expect(screen.getByTestId('child-if')).toContainHTML('<span data-testid="child-if">If</span>');
  });

  test('Falsy case', () => {
    render(
      <If check={false}>
        <span data-testid="child-if">If</span>
      </If>
    );

    expect(screen.queryByTestId('child-if')).toBeNull();
  });
});
