type EventHandler = (data: any) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private listeners: Record<string, EventHandler[]> = {};

  connect() {
    this.ws = new WebSocket("ws://localhost:8000/ws/events");
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const type = data.type;
      
      if (this.listeners[type]) {
        this.listeners[type].forEach(handler => handler(data));
      }
      // Also trigger a catch-all listener
      if (this.listeners['*']) {
        this.listeners['*'].forEach(handler => handler(data));
      }
    };
    
    this.ws.onclose = () => {
      console.log("WebSocket disconnected. Reconnecting in 2s...");
      setTimeout(() => this.connect(), 2000);
    };
  }

  subscribe(type: string, handler: EventHandler) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(handler);
    return () => {
      this.listeners[type] = this.listeners[type].filter(h => h !== handler);
    };
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}

export const wsService = new WebSocketService();
