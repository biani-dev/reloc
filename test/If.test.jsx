import React from 'react';
import {render, screen} from '@testing-library/react';
import {If} from '../dist';

describe('If', () => {
  test('Truthy case', () => {
    render(
      <If is={1 < 2}>
        <span data-testid="child-if">If</span>
      </If>
    );
    expect(screen.getByTestId('child-if')).toContainHTML('<span data-testid="child-if">If</span>');
  });

  test('Truthy case: Multi children', () => {
    render(
      <If is={1 < 2} then={() =>
        <div>
          <span data-testid="child-if1">If</span>
          <span data-testid="child-if2">If</span>
        </div>
      }/>
    );
    expect(screen.getByTestId('child-if1')).toContainHTML('<span data-testid="child-if1">If</span>');
    expect(screen.getByTestId('child-if2')).toContainHTML('<span data-testid="child-if2">If</span>');
  });


  test('Falsy case', () => {
    render(
      <If is={false}>
        <span data-testid="child-if">If</span>
      </If>
    );

    expect(screen.queryByTestId('child-if')).toBeNull();
  });

  test('Inline case', () => {
    render(
      <If is={true} then={() => (
        <span data-testid="child-if">If</span>
      )}/>
    );

    expect(screen.getByTestId('child-if')).toContainHTML('<span data-testid="child-if">If</span>');
  });
});
