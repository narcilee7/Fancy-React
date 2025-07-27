import { mountState, updateState } from './useState';
import { mountEffect, updateEffect } from './useEffect';
import type { Dispatcher } from './ReactCurrentDispatcher';

export const mountDispatcher: Dispatcher = {
  useState: mountState,
  useEffect: mountEffect,
};

export const updateDispatcher: Dispatcher = {
  useState: updateState,
  useEffect: updateEffect,
}; 