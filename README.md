# Google Form Quiz Generator 

## Requirements
1. [nvm](https://github.com/nvm-sh/nvm)
2. [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)

## Install
```bash
git clone git@github.com:Mkots/google-form-quiz-generator.git
cd google-form-quiz-generator
nvm use
yarn
```

## Setup
1. Create a Google [OAuth 2.0 Client IDs](https://support.google.com/googleapi/answer/6158849?hl=en#zippy=%2Cweb-applications%2Cpublic-and-internal-applications%2Cuser-consent)
2. Download it as JSON 
3. Copy it to project root
4. Rename it as `credentials.json`

## Run
```bash
node index.js
```