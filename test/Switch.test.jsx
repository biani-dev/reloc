import { render, screen } from '@testing-library/react';
import React from 'react';
import { Case, Default, Switch } from '../src';

describe('Switch without match', () => {
  test('Truthy cases', () => {
    render(
      <Switch>
        <Case check={1 > 2}>
          <span data-testid="case1">Case1</span>
        </Case>
        <Case check={1 < 2}>
          <span data-testid="case2">Case2</span>
        </Case>
        <Default>
          <span data-testid="default">Default</span>
        </Default>
      </Switch>
    );

    expect(screen.queryByTestId('case1')).toBeNull();
    expect(screen.queryByTestId('case2')).toContainHTML('<span data-testid="case2">Case2</span>');
  });

  test('Cast boolean case', () => {
    render(
      <Switch>
        <Case check={[1, 2].length}>
          <span data-testid="case1">Case1</span>
        </Case>
        <Default>
          <span data-testid="default">Default</span>
        </Default>
      </Switch>
    );

    expect(screen.queryByTestId('case1')).toContainHTML('<span data-testid="case1">Case1</span>');
  });

  test('Default case', () => {
    render(
      <Switch>
        <Case check={1 > 2}>
          <span data-testid="case1">Case1</span>
        </Case>
        <Default>
          <span data-testid="default">Default</span>
        </Default>
      </Switch>
    );

    expect(screen.queryByTestId('default')).toContainHTML('<span data-testid="default">Default</span>');
  });

  test('Fall case', () => {
    render(
      <Switch>
        <Case check={false}>
          <span data-testid="case1">Case1</span>
        </Case>
        <Case check={false}>
          <span data-testid="case2">Case2</span>
        </Case>
      </Switch>
    );

    expect(screen.queryByTestId('case1')).toBeNull();
    expect(screen.queryByTestId('case2')).toBeNull();
  });
});

describe('Switch with match', () => {
  test('Truthy cases', () => {
    render(
      <Switch match={'2'}>
        <Case check={'1'}>
          <span data-testid="case1">Case1</span>
        </Case>
        <Case check={'2'}>
          <span data-testid="case2">Case2</span>
        </Case>
        <Default>
          <span data-testid="default">Default</span>
        </Default>
      </Switch>
    );

    expect(screen.queryByTestId('case1')).toBeNull();
    expect(screen.queryByTestId('case2')).toContainHTML('<span data-testid="case2">Case2</span>');
  });

  test('Default case', () => {
    render(
      <Switch match={'2'}>
        <Case check={2}>
          <span data-testid="case1">Case1</span>
        </Case>
        <Default>
          <span data-testid="default">Default</span>
        </Default>
      </Switch>
    );

    expect(screen.queryByTestId('default')).toContainHTML('<span data-testid="default">Default</span>');
  });

  test('Fall case', () => {
    render(
      <Switch match={'2'}>
        <Case check={2}>
          <span data-testid="case1">Case1</span>
        </Case>
        <Case check={1}>
          <span data-testid="case2">Case2</span>
        </Case>
      </Switch>
    );

    expect(screen.queryByTestId('case1')).toBeNull();
    expect(screen.queryByTestId('case2')).toBeNull();
  });
});


describe('Switch with match, disable check data type', () => {
  test('Truthy cases', () => {
    render(
      <Switch match={'2'} strict={false}>
        <Case check={'1'}>
          <span data-testid="case1">Case1</span>
        </Case>
        <Case check={2}>
          <span data-testid="case2">Case2</span>
        </Case>
        <Default>
          <span data-testid="default">Default</span>
        </Default>
      </Switch>
    );

    expect(screen.queryByTestId('case1')).toBeNull();
    expect(screen.queryByTestId('case2')).toContainHTML('<span data-testid="case2">Case2</span>');
  });

  test('Default case', () => {
    render(
      <Switch match={'2'} strict={false}>
        <Case check={true}>
          <span data-testid="case1">Case1</span>
        </Case>
        <Default>
          <span data-testid="default">Default</span>
        </Default>
      </Switch>
    );

    expect(screen.queryByTestId('default')).toContainHTML('<span data-testid="default">Default</span>');
  });

  test('Fall case', () => {
    render(
      <Switch match={'2'} strict={false}>
        <Case check={true}>
          <span data-testid="case1">Case1</span>
        </Case>
        <Case check={false}>
          <span data-testid="case2">Case2</span>
        </Case>
      </Switch>
    );

    expect(screen.queryByTestId('case1')).toBeNull();
    expect(screen.queryByTestId('case2')).toBeNull();
  });
});
