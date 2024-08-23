// code for https://www.learningtypescript.com/classes/the-shape-of-types/
// 类和继承的练习, 设计一个ts的抽象类的概念(可以实现类似接口+类的效果)

export interface ConsumedHorror {
    name: string;
    evil: boolean;
    power: number;
}

export abstract class Horror {
    protected abstract readonly name: string;
    #consumedHorrors: Array<ConsumedHorror> = [];

    public doBattle(oppoent: Horror) {
        if (this.getPower() >= oppoent.getPower()) {
            this.#consumedHorrors.push({
                name: oppoent.name,
                evil: oppoent.isEvil(),
                power: oppoent.getPower()
            });
        }
    }

    public getPower():number {
        return this.#consumedHorrors.length + this.#consumedHorrors.reduce((sumPower:number, horror:ConsumedHorror) =>
            sumPower + this.getPowerFrom(horror), 0)
    }

    protected abstract getPowerFrom(oppoent: ConsumedHorror):number;
    protected abstract isEvil():boolean;
}

export class Demon extends Horror {
    protected readonly name: string = "Demon";
    // #consumedHorrors: Array<ConsumedHorror> = [];  子类已继承

    protected getPowerFrom(oppoent: ConsumedHorror): number {
        if (oppoent.evil) {
            return oppoent.power / 2;
        } else {
            return oppoent.power * 2;
        }
    }

    protected isEvil(): boolean {
        return true;
    }

}

export class Sorcerer extends Horror {
    protected readonly name: string;
    #evil: boolean;
    // #consumedHorrors: Array<ConsumedHorror> = [];

    public constructor(name:string, evil:boolean) {
        super();
        this.name = name;
        this.#evil = evil;
    }

    protected getPowerFrom(oppoent: ConsumedHorror): number {
        if (oppoent.evil !== this.#evil) {
            return oppoent.power;
        } else {
            return oppoent.power * 2;
        }
    }

    protected isEvil(): boolean {
        return this.#evil;
    }
}