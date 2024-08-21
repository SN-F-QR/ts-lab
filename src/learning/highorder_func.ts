// code for https://www.learningtypescript.com/functions/structural-kitchen/
// 设计ts的type object定义及高阶函数
// createKitchen利用闭包机制, 返回object中函数仍然能够访问createKitchen函数中定义的变量
// 编译器在结束createKitchen调用后, 不会清理这些相关变量的内存
export type Stock = {
    breads: number;
    fruits: number;
    sauces: number;
    vegetables: number;
}

export type SuccessStock = {
    succeeded: true;
    newStock: Stock;
}

export type FailedStock = {
    succeeded: false;
}

export type PreparedStock = SuccessStock | FailedStock;

export type Kitchen = {
    announce: () => string;
    clean: (time?: number) => void;
    purchase: (expense: number) => boolean;
    prepare: (recipe: (ingredients: Stock) => PreparedStock) => boolean;
}

export function createKitchen(
    budget: number,
    cleaner: (dirt: number, time?: number) => number,
    supplier: (expense: number) => Stock
): Kitchen {
    let dirt = 0;
    let stock:Stock = {
            breads: 0,
            fruits: 0,
            sauces: 0,
            vegetables: 0
        };
    let createdKitchen: Kitchen = {
        announce: function() {
            return `I have ${dirt} much dirt, ${budget} budget, ${stock.breads} bread(s), ${stock.fruits} fruit(s), ${stock.sauces} sauce(s), and ${stock.vegetables} vegetable(s).`;
        },
        clean: function(time?: number) {
            dirt = cleaner(dirt, time);
        },
        purchase: function(expense: number) {
            if (budget >= expense) {
                const suppliedStock = supplier(expense);
                stock.breads += suppliedStock.breads;
                stock.fruits += suppliedStock.fruits;
                stock.sauces += suppliedStock.sauces;
                stock.vegetables += suppliedStock.vegetables;
                budget -= expense;
                return true;
            } else {
                return false;
            }
        },
        prepare: function(recipe: (ingredients: Stock) => PreparedStock) {
            if (dirt >= 100) {
                return false;
            } else {
                dirt +=1 ;
                let getRecipe = recipe(stock);
                if (getRecipe.succeeded) {
                    stock = getRecipe.newStock;
                }
                return getRecipe.succeeded;
            }
        }

    }

    return createdKitchen;
}