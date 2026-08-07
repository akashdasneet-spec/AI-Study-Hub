type EventHandler = (data: any) => void;

export class InfrastructureEventBus {
  private handlers = new Map<string, EventHandler[]>();

  subscribe(event: string, handler: EventHandler): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler);
  }

  publish(event: string, data: any): void {
    const list = this.handlers.get(event);
    if (list) {
      list.forEach((fn) => fn(data));
    }
  }
}
