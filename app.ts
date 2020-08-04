
export class Hero {
    id: number = 0;
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    myName()
    {
        return this.name;
    }
  }

  let hero = new Hero('krunal');
  console.log(hero.myName());