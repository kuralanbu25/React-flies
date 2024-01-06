import * as Type from "./Type"

export  const POSTSUCCESS= (data)=>{

    return {
        type:Type.POST_SUCCESS,
        payload:data
    }
}
export  const POSTERROR= (data)=>{

    return {
        type:Type.POST_ERROR,
        payload:data
    }
}
export  const GETSUCCESS= (data)=>{

    return {
        type:Type.GET_SUCCESS,
        payload:data
    }
}
export  const GETERROR= (data)=>{

    return {
        type:Type.GET_ERROR,
        payload:data

    }
}

export  const PUTSUCCESS= (data)=>{

    return {
        type:Type.PUT_SUCCESS,
        payload:data
    }
}
export  const PUTERROR= (data)=>{

    return {
        type:Type.PUT_ERROR,
        payload:data
    }
}
export  const DELETESUCCESS= (data)=>{

    return {
        type:Type.DELETE_SUCCESS,
        payload:data
    }
}
export  const DELETEERROR= (data)=>{

    return {
        type:Type.DELETE_ERROR,
        payload:data
    }
}

export  const GETAPISUCCESS= (data)=>{

    return {
        type:Type.GET_API_SUCCESS,
        payload:data
    }
}
export  const GETAPIERROR= (data)=>{

    return {
        type:Type.GET_API_ERROR,
        payload:data

    }
}

