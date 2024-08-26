// code for https://www.learningtypescript.com/declaration-files/type-illusions/
// 一个.d.ts文件的例子

export function isTrick(x: Section): x is Trick;
export function getAudienceMemberFor(x: {duration: number, title: string}): Promise<Audience>;
export function isVolunteerIllusion(x: Illusion): x is VolunteerIllusion;

export interface Trick {
    gimmick: string;
}

export interface Illusion {
    introduction(): string;
    flair(): string;
    payoff(): string;
}

interface VolunteerIllusion extends Illusion {
    title: string;
    duration: number;
}

export interface Audience {
    name: string;
}

export interface Act {
    name: string;
    sections: Section[];
    performer: string;
}

export type Section = Trick | Illusion;

/* 调用时使用如下import {} from 无需带后缀
import { 
	getAudienceMemberFor, 
	isTrick, 
	isVolunteerIllusion,
	Trick,
	Illusion,
	Act,
	Audience,
	VolunteerIllusion

} from "./extension_global";
*/