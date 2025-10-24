import type { Challenge, Tests } from "baocr";

const sample = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const parse = (input: string) =>
	input
		.split("\n")
		.map((line) => line.split(": ")[1])
		.map((line) => line.split("; "))
		.map((rounds) =>
			rounds.map((round) =>
				Object.fromEntries(
					round.split(", ").map((instance) => instance.split(" ").reverse()),
				),
			),
		);

export const one: Challenge = (input) =>
	parse(input).reduce((score, game, idx) => {
		for (const round of game) {
			if (
				(round.red || 0) > 12 ||
				(round.green || 0) > 13 ||
				(round.blue || 0) > 14
			) {
				return score;
			}
		}
		return score + idx + 1;
	}, 0);

export const two: Challenge = (input) =>
	parse(input)
		.map((game) =>
			game.reduce(
				(oldRound, round) => ({
					red: Math.max(oldRound.red, round.red || 0),
					green: Math.max(oldRound.green, round.green || 0),
					blue: Math.max(oldRound.blue, round.blue || 0),
				}),
				{ red: 0, green: 0, blue: 0 },
			),
		)
		.map((game) => game.red * game.blue * game.green)
		.reduce((a, b) => a + b, 0);

export const tests: Tests = [
	[one, sample, 8],
	[two, sample, 2286],
];
