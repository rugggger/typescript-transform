

  
  export class SomeClass {

 
    private arr: Number[] = [1,2,3,4,5];

    constructor(private value:number) {

       
        }
   getNumbers(){
       console.log('dont_transform files should not be overridden:') 
       console.log('Array.fill :',this.arr.fill(this.value,0, 5))
       console.log('Array.filter :',this.arr.filter(x=>x>1))

   }



      
    
  }
