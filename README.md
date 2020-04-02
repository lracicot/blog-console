# Blog console

```
aws cloudformation deploy \
  --capabilities CAPABILITY_IAM \
  --template-file pipeline.yml \
  --region ca-central-1 \
  --stack-name blog-console-pipeline \
  --parameter-overrides \
    RepositoryName=blog-console \
    ApiStack=sam-blog
```
