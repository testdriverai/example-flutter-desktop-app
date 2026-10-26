# How to Test a Flutter Desktop App Without Appium



[![TestDriver running this test (sped up)](media/speedrun.gif)](https://console.testdriver.ai/replay/6adf6415c2408c0c2459a8d3?share=haYOM4KfeiLA4S1KFAaK9w)

*Sped up: idle time removed. Click to watch the full replay with step-by-step logs.*

This repo is the complete, runnable example from the TestDriver tutorial **[How to Test a Flutter Desktop App Without Appium](https://testdriver.ai/blog/test-flutter-desktop-app)**. The post walks through every line.

## What the test does

Open Settings, change the device alias, go back to Receive tab, assert the new alias is shown.

It runs on a fresh cloud machine, installs the app the way a user would, and drives it from screenshots with plain-language steps. No selectors, test IDs or changes to the app.

## Run it

You need Node.js 20+ and a TestDriver API key (free to start at [console.testdriver.ai](https://console.testdriver.ai)).

```bash
git clone https://github.com/testdriverai/example-flutter-desktop-app.git
cd example-flutter-desktop-app
npm install
cp .env.example .env   # then paste your key into .env
npx vitest run
```

The run prints a link to its replay, so you can watch what happened.

## Run it in CI

[`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml) runs the test on every push and pull request using [`testdriverai/action`](https://github.com/testdriverai/action). Set up OIDC for your team, or add your key as a repository secret named `TD_API_KEY`. See [CI/CD](https://docs.testdriver.ai/ci-cd).

## Files

- [`tests/flutter-desktop-app.test.mjs`](tests/flutter-desktop-app.test.mjs): the test
- [`vitest.config.js`](vitest.config.js): Vitest with the TestDriver reporter
- [`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml): CI

## Learn more

- Tutorial: https://testdriver.ai/blog/test-flutter-desktop-app
- Docs: https://docs.testdriver.ai/quickstart
- More examples: https://docs.testdriver.ai
