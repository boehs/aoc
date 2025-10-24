import type { Challenge, Tests } from "baocr";

const sample = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const sample2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const re =
	/(?=(1|2|3|4|5|6|7|8|9|0|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|(zero)))/g;
const replacements = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
	zero: "0",
};

export const one: Challenge = (input) =>
	input
		.replaceAll(/[^0-9\n]/g, "")
		.split("\n")
		.map((line) => `${line[0]}${line[line.length - 1]}`)
		.reduce((a, b) => a + Number(b), 0);

export const two: Challenge = (input) => {
	return input
		.split("\n")
		.map((line) => Array.from(line.matchAll(re), (x) => x[1]))
		.map((match) =>
			match.map(
				(char) => replacements[char as keyof typeof replacements] ?? char,
			),
		)
		.map((line) => `${line[0]}${line.at(-1)}`)
		.reduce((a, b) => {
			return a + Number(b);
		}, 0);
};

export const tests: Tests = [
	[one, sample, 142],
	[two, sample2, 281],
];
