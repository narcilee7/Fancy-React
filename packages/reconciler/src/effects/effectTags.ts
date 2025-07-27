import type { FiberNode } from '../fiber/FiberNode';
import { NoFlags, Placement, Update, Deletion, ChildDeletion, Ref, LayoutMask, PassiveMask } from '../../../shared/src/constants/FiberFlags';

export function markUpdate(fiber: FiberNode) {
  fiber.flags |= Update;
}

export function markPlacement(fiber: FiberNode) {
  fiber.flags |= Placement;
}

export function markDeletion(fiber: FiberNode) {
  fiber.flags |= Deletion;
}

export function markChildDeletion(fiber: FiberNode) {
  fiber.flags |= ChildDeletion;
}

export function markRef(fiber: FiberNode) {
  fiber.flags |= Ref;
}

export function markLayoutEffect(fiber: FiberNode) {
  fiber.flags |= LayoutMask;
}

export function markPassiveEffect(fiber: FiberNode) {
  fiber.flags |= PassiveMask;
}

export function bubbleProperties(fiber: FiberNode) {
  let subtreeFlags = NoFlags;
  let child = fiber.child;
  
  while (child !== null) {
    subtreeFlags |= child.subtreeFlags;
    subtreeFlags |= child.flags;
    child = child.sibling;
  }
  
  fiber.subtreeFlags = subtreeFlags;
}

export function resetChildLanes(fiber: FiberNode) {
  let child = fiber.child;
  while (child !== null) {
    // TODO: 重置 child lanes
    child = child.sibling;
  }
} 