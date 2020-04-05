# Blog console

## Setup repository

```
aws cloudformation deploy --capabilities CAPABILITY_IAM \
  --template-file repository.yml \
  --region ca-central-1 \
  --stack-name blog-console-repository \
  --parameter-overrides \
    RepositoryName=blog-console
```

## Dev pipeline
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

## Prod pipeline
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
