// aynı anda task eklenirse diye random id oluştuma

export function generateTaskId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
