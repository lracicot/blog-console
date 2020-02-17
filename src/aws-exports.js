const aws = {
  aws_project_region: process.env.REACT_APP_AWS_PROJECT_REGION,
  aws_cognito_region: process.env.REACT_APP_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id:
    process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    scope: ["email", "profile"],
    redirectSignIn: process.env.REACT_APP_AUTH_REDIRECT_SIGNIN,
    redirectSignOut: process.env.REACT_APP_AUTH_REDIRECT_SIGNOUT,
    responseType: "code"
  }
};

export default aws;
