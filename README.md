![Build Status](https://codebuild.eu-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiV1Jyc0FIZkdBVHNmTllMZWhzUERBM2dzZ053TVFVbTR5TlZjT3VTcUM1czlkNkpLUUZIUTVpS0JRZHZ5MzFpcitPb2lnR2JTS0F0M1ZZbjNSVEpQSmVNPSIsIml2UGFyYW1ldGVyU3BlYyI6IjE4LzFvejlERnhCNjArVDkiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=develop)

# scrumdiddly-express
Scrumdiddly express backend

TODO for finishing auth feature
- [ ] Get test coverage to 100%


Required envars to run backend
```sh
APP_NAME=''                 //  App name, only used for info logging
EXPRESS_PORT=3001           //  any port, make sure it's not the same as the front end
LOG_LEVEL='debug'           //  debug/info/error etc...
AWS_REGION=''               //  AWS region
USER_POOL_ID=''             //  Cognito userpool id
APP_CLIENT_ID=''            //  Cognito app client id
AWS_ACCESS_KEY_ID=''        //  AWS credentials access key
AWS_SECRET_ACCESS_KEY=''    //  AWS credentials secret key
```
