export interface Update {
  payload: any;
  next: Update | null;
}

export interface UpdateQueue {
  shared: {
    pending: Update | null;
  };
}

export function createUpdate(payload: any): Update {
  return {
    payload,
    next: null,
  };
}

export function createUpdateQueue(): UpdateQueue {
  return {
    shared: {
      pending: null,
    },
  };
}

export function enqueueUpdate(queue: UpdateQueue, update: Update) {
  const pending = queue.shared.pending;
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.shared.pending = update;
}

export function processUpdateQueue(baseState: any, queue: UpdateQueue): any {
  const pendingQueue = queue.shared.pending;
  if (pendingQueue !== null) {
    let result = baseState;
    let first = pendingQueue.next;
    let update = first;
    do {
      result = typeof update.payload === 'function' ? update.payload(result) : update.payload;
      update = update.next!;
    } while (update !== first && update !== null);
    queue.shared.pending = null;
    return result;
  }
  return baseState;
} 