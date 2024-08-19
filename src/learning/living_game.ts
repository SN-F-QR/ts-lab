// code for https://www.learningtypescript.com/unions-and-literals/the-narrow-trail/
function living(): boolean {
    // 枚举可以换成字符串联合类型 
    // nextSupply: "food" | "water" | undefined;
    enum Res {WATER, FOOD, UNDEFINE};
	let avaliableRes: Res = Res.UNDEFINE;
	const reduce: number = 1;
	let food: number = 5;
	let water:number = 5;
	for (let day = 1; day <= 7; day += 1) {
		const roll: number = Math.floor(Math.random() * 6) + 1;
		if (roll === 1) {
			avaliableRes = Res.FOOD;
		} else if (roll === 2) {
			avaliableRes = Res.WATER;
		} else {
			switch (avaliableRes) {
				case Res.UNDEFINE:
					if (roll%2 === 0) {
						avaliableRes = Res.FOOD;
					} else {
						avaliableRes = Res.WATER;
					}
					break;
				case Res.FOOD:
					food += roll;
					avaliableRes = Res.UNDEFINE;
					break;
				case Res.WATER:
					water += roll;
					avaliableRes = Res.UNDEFINE;
					break;
			}
		}

		food -= reduce;
		water -= reduce;

		if (food === 0 || water === 0) {
			return false;
		}
	}
	return true;
}