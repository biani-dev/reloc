import React from 'react';
import {render, screen} from '@testing-library/react';
import {For} from '../src';

const items = {
  k1: {id: 1, name: 'Museum'},
  k2: {id: 2, name: 'Watch'},
  k3: {id: 3, name: 'Lennon'},
};

describe('For object', () => {
  test('Truthy case', () => {
    render(
      <div data-testid={`parent-for`}>
        <For items={items}>
          {(item, key, index) => (
            <span key={index} data-testid={`child-${item.id}`}>{key}-{item.name}</span>
          )}
        </For>
      </div>
    );

    expect(screen.getByTestId('parent-for').children.length).toBe(3);
    expect(screen.getByTestId('child-1')).toContainHTML('<span data-testid="child-1">k1-Museum</span>');
    expect(screen.getByTestId('child-2')).toContainHTML('<span data-testid="child-2">k2-Watch</span>');
    expect(screen.getByTestId('child-3')).toContainHTML('<span data-testid="child-3">k3-Lennon</span>');
  });

  test('Empty case', () => {
    const emptyItems = {};

    render(
      <div data-testid={`parent-for`}>
        <For items={emptyItems}>
          {(item, key, index) => (
            <span key={index} data-testid={`child-${item.id}`}>{item.name}</span>
          )}
        </For>
      </div>
    );

    expect(screen.getByTestId('parent-for').children.length).toBe(0);
  });
});

describe('For array', () => {
  test('Truthy case', () => {
    render(
      <div data-testid={`parent-for`}>
        <For items={Object.values(items)}>
          {(item, key, index) => (
            <span key={index} data-testid={`child-${item.id}`}>{key}-{item.name}</span>
          )}
        </For>
      </div>
    );

    expect(screen.getByTestId('parent-for').children.length).toBe(3);
    expect(screen.getByTestId('child-1')).toContainHTML('<span data-testid="child-1">0-Museum</span>');
    expect(screen.getByTestId('child-2')).toContainHTML('<span data-testid="child-2">1-Watch</span>');
    expect(screen.getByTestId('child-3')).toContainHTML('<span data-testid="child-3">2-Lennon</span>');
  });

  test('Empty case', () => {
    render(
      <div data-testid={`parent-for`}>
        <For items={[]}>
          {(item, key, index) => (
            <span key={index} data-testid={`child-${item.id}`}>{item.name}</span>
          )}
        </For>
      </div>
    );

    expect(screen.getByTestId('parent-for').children.length).toBe(0);
  });
});

describe('For map', () => {
  test('Truthy case', () => {
    render(
      <div data-testid={`parent-for`}>
        <For items={new Map(Object.entries(items))}>
          {(item, key, index) => (
            <span key={index} data-testid={`child-${item.id}`}>{key}-{item.name}</span>
          )}
        </For>
      </div>
    );

    expect(screen.getByTestId('parent-for').children.length).toBe(3);
    expect(screen.getByTestId('child-1')).toContainHTML('<span data-testid="child-1">k1-Museum</span>');
    expect(screen.getByTestId('child-2')).toContainHTML('<span data-testid="child-2">k2-Watch</span>');
    expect(screen.getByTestId('child-3')).toContainHTML('<span data-testid="child-3">k3-Lennon</span>');
  });

  test('Empty case', () => {
    render(
      <div data-testid={`parent-for`}>
        <For items={new Map()}>
          {(item, key, index) => (
            <span key={index} data-testid={`child-${item.id}`}>{item.name}</span>
          )}
        </For>
      </div>
    );

    expect(screen.getByTestId('parent-for').children.length).toBe(0);
  });
});


describe('For set', () => {
  test('Truthy case', () => {
    render(
      <div data-testid={`parent-for`}>
        <For items={new Set(Object.values(items))}>
          {(item, key, index) => (
            <span key={index} data-testid={`child-${item.id}`}>{key}-{item.name}</span>
          )}
        </For>
      </div>
    );

    expect(screen.getByTestId('parent-for').children.length).toBe(3);
    expect(screen.getByTestId('child-1')).toContainHTML('<span data-testid="child-1">0-Museum</span>');
    expect(screen.getByTestId('child-2')).toContainHTML('<span data-testid="child-2">1-Watch</span>');
    expect(screen.getByTestId('child-3')).toContainHTML('<span data-testid="child-3">2-Lennon</span>');
  });

  test('Empty case', () => {
    render(
      <div data-testid={`parent-for`}>
        <For items={new Set()}>
          {(item, key, index) => (
            <span key={index} data-testid={`child-${item.id}`}>{item.name}</span>
          )}
        </For>
      </div>
    );

    expect(screen.getByTestId('parent-for').children.length).toBe(0);
  });
});