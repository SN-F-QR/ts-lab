// code for https://www.learningtypescript.com/classes/horror-factory/
// 代替子类, 将部分abs函数转为变量的形式, 利用factory pattern(函数)创建特定的类
export interface ConsumedHorror {
    name: string;
    evil: boolean;
    power: number;
}

interface HorrorSettings {
	name: string;
	getPowerFrom: (consumed: ConsumedHorror) => number;
	isEvil: () => boolean;
}

export class Horror {
    readonly name: string;
    #consumedHorrors: Array<ConsumedHorror> = [];
    protected getPowerFrom: (oppoent: ConsumedHorror) => number;
    readonly isEvil: () => boolean;

    // 一个坑 注意函数签名要和test的定义一致
    public constructor({ name, getPowerFrom, isEvil }: HorrorSettings){
        this.name = name;
        this.getPowerFrom = getPowerFrom;
        this.isEvil = isEvil;
    }

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
            sumPower + this.getPowerFrom(horror), 0);
    }
}

// 类似工厂函数 定义特定的类
const demonSettings: HorrorSettings = {
	name: "Demon",
	getPowerFrom: (consumed: ConsumedHorror) => {
		return consumed.evil ? consumed.power / 2 : consumed.power * 2;
	},
	isEvil: () => true,
};



export function createDemon(): Horror {
    return new Horror(demonSettings);
}

export function createSorcerer(name: string, evil: boolean): Horror {
    const sorcererSettings: HorrorSettings = {
        name: name,
        getPowerFrom: (consumed: ConsumedHorror) => {
            return consumed.evil === evil ? consumed.power * 2 : consumed.power;
        },
        isEvil: () => evil,
    };
    return new Horror(sorcererSettings);
}
