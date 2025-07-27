import { enqueueUpdate, createUpdate, processUpdateQueue, createUpdateQueue } from '../../reconciler/src/fiber/updateQueue';
import { scheduleUpdateOnFiber } from '../../reconciler/src';

// 简化版 setState API
export function setState(fiber: any, partialState: any) {
  if (!fiber.updateQueue) {
    fiber.updateQueue = createUpdateQueue();
  }
  const update = createUpdate(partialState);
  enqueueUpdate(fiber.updateQueue, update);
  scheduleUpdateOnFiber(fiber);
}
