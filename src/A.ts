export type SerializedAnalysisEvent = (string | number | undefined)[];
export interface RequestParameters {
    [name: string]: string;
  }
export interface RequestParametersProvider {
    getRequestParameters(): RequestParameters;
  }
  
  export class AnalysisEventsBatchStub {
    batch: any;
    events: SerializedAnalysisEvent[];
    yaron: any[];
  
    constructor() {
      this.events = [];
      this.yaron = [];
      this.batch = {
        setRequestParametersFromProvider: (_: RequestParametersProvider) => {},
        addEvent: (event: SerializedAnalysisEvent) => {
          const ar = [1];
          ar.push(2);
          console.log('event is ', event);
          console.log('ar ',ar);
          console.log('about to push ',this.yaron);
          this.yaron.push([33]);
          console.log('yaron ', this.yaron);
          console.log('adding ',event);
          console.log('adding ',this.events);
          this.events.push(event);
          console.log('done ? ', this.events)
        },
        isFull: () => {
          return false;
        }
      };
    }
  }
