# (Bad|Bun|Boehs) AOC Runner

It's actually mediocre. In your project's root, create a `.env` file with

```bash
# Session Here
AOC_SESSION=
```

## Usage

### Default

```
BAOCR [year] [day]

Run a given AOC

Positionals:
  year                                          [number] [default: CURRENT_YEAR]
  day                                            [number] [default: CURRENT_DAY]

Options:
      --version  Show version number                                   [boolean]
      --help     Show help                                             [boolean]
  -l, --long     marks day as long running. Only test against sample
                                                      [boolean] [default: false]
  -t, --test                                           [boolean] [default: true]
```

### All

```
BAOCR all [year]

Run all the AOCs

Positionals:
  year                                          [number] [default: CURRENT_YEAR]

Options:
      --version  Show version number                                   [boolean]
      --help     Show help                                             [boolean]
  -n             Number of runs                           [number] [default: 10]
```