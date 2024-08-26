// 如何定义系统变量类型的extension
// 通常会把interface存放在某xx_extension.d.ts中, 把实现放在xx_extension.ts 更容易理解
declare global {
	interface String {
		alternating(): [string, string];
	}
	
	interface Array<T extends String> {
		unsmoosh(): Array<T>;
		smoosh(): T;
	}
}
// 因为把function export了 所以对应的接口也需要设置为全局

export function logMessage(): string {
	const encodedMessage =
		"wjheiwcehljearv'assfcarvioprtiptrei?msitt-irvienigssa!";

	const alternating = encodedMessage.alternating();
	const [question, answer] = alternating.unsmoosh();

	console.log(question);
	console.log(` - ${answer}`);

	return [question, answer].smoosh();
}


