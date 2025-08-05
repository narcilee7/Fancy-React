import { mountState, updateState } from './useState';
import { mountEffect, updateEffect } from './useEffect';
import type { Dispatcher } from './ReactCurrentDispatcher';

export const mountDispatcher: Dispatcher = {
  useState: mountState as any,
  useEffect: mountEffect,
};

export const updateDispatcher: Dispatcher = {
  useState: updateState as any,
  useEffect: updateEffect,
}; 