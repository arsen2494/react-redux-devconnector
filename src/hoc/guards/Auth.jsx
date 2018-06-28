const Auth = props => {
  if (props.isAuthenticated) {
    props.history.push('/dashboard');
  } else {
    return props.children;
  }
};

export default Auth;