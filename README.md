# Blog console

## Deployment

### Setup repository

```
aws cloudformation deploy --capabilities CAPABILITY_IAM \
  --template-file repository.yml \
  --region ca-central-1 \
  --stack-name blog-console-repository \
  --parameter-overrides \
    RepositoryName=blog-console
```

### Dev pipeline
```
aws cloudformation deploy \
  --capabilities CAPABILITY_IAM \
  --template-file pipeline.yml \
  --region ca-central-1 \
  --stack-name blog-console-pipeline-dev \
  --parameter-overrides \
    RepositoryName=blog-console \
    RepositoryStack=blog-console-repository \
    ApiStack=blog-api-dev \
    BranchName=develop \
    StackName=blog-console-dev \
    Endpoint=console-dev.blog.louisracicot.net \
    WebsiteURL=website-dev.blog.louisracicot.net
```

### Prod pipeline
```
aws cloudformation deploy \
  --capabilities CAPABILITY_IAM \
  --template-file pipeline.yml \
  --region ca-central-1 \
  --stack-name blog-console-pipeline-prod \
  --parameter-overrides \
    RepositoryName=blog-console \
    RepositoryStack=blog-console-repository \
    ApiStack=blog-api-prod \
    BranchName=master \
    StackName=blog-console-prod \
    Endpoint=console.blog.louisracicot.net \
    WebsiteURL=louisracicot.com
```

## Development

First deploy the stack and create a user in the user pool

## Configuration

```
cp .env.dist .env
```

Fill the environment variables in `.env`

| Variable                               | Description                                                  | Example                      |
|----------------------------------------|--------------------------------------------------------------|------------------------------|
| REACT_APP_AWS_PROJECT_REGION           | The region where the project is deployed                     | ca-central-1                 |
| REACT_APP_AWS_COGNITO_REGION           | The region of the cognito user pool                          | ca-central-1                 |
| REACT_APP_AWS_USER_POOLS_ID            | The ID of the cognito user pool                              | *from the cognito stack*     |
| REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID | The app client ID of the cognito user pool                   | *from the cognito stack*     |
| REACT_APP_AUTH_DOMAIN                  | The cognito domain for authentication                        | *from the cognito stack*     |
| REACT_APP_AUTH_REDIRECT_SIGNIN         | The redirect URL where the application receive the JWT Token | http://localhost:3000/auth   |
| REACT_APP_AUTH_REDIRECT_SIGNOUT        | The redirect URL after a logout                              | http://localhost:3000/logout |
| REACT_APP_API_URL                      | The URL of the blog API                                      | https://my-api.com           |
| REACT_APP_WEBSITE_URL                  | The URL of the website                                       | https://my-website.com       |

## Installation

```
npm install
```

## Local dev

```
npm start
```
