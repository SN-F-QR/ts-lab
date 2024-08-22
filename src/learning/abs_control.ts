// code for https://www.learningtypescript.com/arrays/text-processor/
// 数组及其抽象控制的相关练习
export type TextOption = {
    align?: "left" | "middle" | "right";
    width: number;
};

export function alignTexts(texts: Array<string>, options: TextOption): Array<Array<string>> {
    /**
     * 将名称按一定的长度分割成多行并支持左中右对齐
     * @param texts 名称对应的字符串, 名称之间用空格隔开
     * @returns 按固定长度分割的名称数组
     */
    const splitTexts = (texts: string) => {
        const words:Array<string> = texts.split(" ");
        let lineTexts: Array<string> = [];
        for (let i = 0; i < words.length; i++) {
            let perLine:Array<string> = [];
            while (true) {
                perLine.push(words[i]);
                i += 1;
                // reduce计算已有的名称总长度
                if (i >= words.length || 
                    perLine.reduce((x:number,y:string) => x+y.length , 0) + perLine.length + words[i].length > options.width) {
                        i -= 1;
                        break;
                }
            }
            // reduce将名称拼接出来 仍然用空格分割
            let lineText:string = perLine.reduce((x:string, word:string) => x + " " + word);
            const spaceLength = options.width - lineText.length;
            if (spaceLength > 0) {
                if (options.align && options.align !== "left") {
                    switch (options.align) {
                        case "right":
                            lineText = " ".repeat(spaceLength) + lineText;
                            break;
                        case "middle":
                            if (spaceLength % 2 === 0) {
                                const space:string = " ".repeat(spaceLength / 2);
                                lineText = space + lineText + space; 
                            } else {
                                lineText = " ".repeat(Math.floor(spaceLength / 2)) + lineText + " ".repeat(Math.ceil(spaceLength / 2));
                            }
                            break;
                    }
                } else {
                    lineText += " ".repeat(spaceLength);
                }
            }  
            lineTexts.push(lineText);
        }
        return lineTexts;
    }

    return texts.map(splitTexts);  // 对每一个字符名称调用分割函数
}