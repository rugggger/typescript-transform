export interface AnalysisEvent {
    type: string;
    x?: number;
    y?: number;
    target?: string | number; // contain a path or a duration
    targetHeatmap?: string;
    xRel?: number;
    yRel?: number;
    targetLink?: string;
    className?: string;
    typeAttribute?: string;
  }
  
export class AnalysisEventsTrackerStub {
  tracker: any;
  private callback: any;

  constructor() {
    this.callback =()=>{console.log('event triggered')};
    this.tracker = {
      onEvent: (onEventCallback: (analysisEvent: AnalysisEvent) => any) => {
        this.callback = ()=>{console.log('event triggered')};
      }
    };
  }

  triggerEvent() {
    console.log('triggering event ');
    console.log('cb ', this.callback);
    if (this.callback) {

      this.callback({
        type: 9
      });
    }

  }
}
