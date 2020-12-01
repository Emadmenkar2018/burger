import React, {Component, Fragment} from 'react';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }

        componentDidMount(){
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error})
            })
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        
        render(){
            const {error} = this.state;
            return (
                <Fragment>
                    <Modal 
                        show={error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
            );
        }
    } 
};

export default withErrorHandler;