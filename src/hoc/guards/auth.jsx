export default props => {
    if (props.isAuthenticated) {
        props.history.push('/dashboard');
    } else {
        return props.children;
    }
};
