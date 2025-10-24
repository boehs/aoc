import { Challenge, Tests } from "baocr";
import { aroundDeltas, Matrix } from "~/utils/matrix";

const sample = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

function extractHorizontalSequence(
	r: number,
	c: number,
	matrix: Matrix<string[]>,
) {
	const token = matrix.atCord([c, r]);
	let leftNums: string[] = [];
	for (let i = c - 1; i >= 0; i--) {
		const v = matrix.atCord([i, r]);
		if (/^[0-9]+$/.test(v)) {
			leftNums.unshift(v);
			matrix[r][i] = ".";
		} else break;
	}
	let rightNums: string[] = [];
	for (let i = c + 1; i < matrix[r].length; i++) {
		const v = matrix.atCord([i, r]);
		if (/^[0-9]+$/.test(v)) {
			rightNums.push(v);
			matrix[r][i] = ".";
		} else break;
	}
	const horizontalSequence = [...leftNums, token, ...rightNums].join("");
	return horizontalSequence;
}

export const one: Challenge = (input) => {
	const matrix = new Matrix(
		...input.split("\n").map((row) => [...row.split("")]),
	);
	let sum = 0;
	for (let r = 0; r < matrix.length; r++) {
		for (let c = 0; c < matrix[r].length; c++) {
			const cell = matrix.atCord([c, r]);
			if (!/[0-9]/.test(cell)) continue;
			const around = matrix.getAround([c, r]);
			if (
				around.some((v) => v !== undefined && !/[0-9]/.test(v) && v !== ".")
			) {
				const horizontalSequence = extractHorizontalSequence(r, c, matrix);
				sum += Number(horizontalSequence);
			}
		}
	}
	return sum;
};

export const two: Challenge = (input) => {
	const matrix = new Matrix(
		...input.split("\n").map((row) => [...row.split("")]),
	);
	let sum = 0;
	for (let r = 0; r < matrix.length; r++) {
		for (let c = 0; c < matrix[r].length; c++) {
			if (matrix.atCord([c, r]) !== "*") continue;

			const around = matrix.getAround([c, r]);
			let prevWasNumber = false;
			const matches: string[] = [];

			const pushMatchAt = (idx: number) => {
				const rr = r + aroundDeltas[idx][1];
				const cc = c + aroundDeltas[idx][0];
				matches.push(extractHorizontalSequence(rr, cc, matrix));
			};

			around.forEach((v, i) => {
				if (/[0-9]/.test(v || "")) {
					// always collect for indices 3 and 4 (vertical neighbors),
					// otherwise avoid collecting twice for consecutive numeric neighbors
					if (i === 3 || i === 4 || !prevWasNumber) pushMatchAt(i);
					prevWasNumber = true;
				} else {
					prevWasNumber = false;
				}
			});

			if (matches.length === 2) sum += Number(matches[0]) * Number(matches[1]);
		}
	}

	return sum;
};

export const tests: Tests = [
	[one, sample, 4361],
	[two, sample, 467835],
];
