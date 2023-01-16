import {Route} from 'react-router-dom'

type props={}

export const UserLoginTemplate = (props:any)=>{
    let {Component,...restRoute} = props;
    return <Route {...restRoute} render ={(propsRoute:any)=>{
        return <>
            <Component {...propsRoute}/>
        </>
    }}/>

}