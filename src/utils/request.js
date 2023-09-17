import axios from 'axios'
import { Message } from 'element-ui'
import {getToken} from './auth'
import { Loading } from 'element-ui';


/* axios默认配置*/
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // 请求地址
    timeout: 20000 // 超时时间
})
/* 请求方式 默认请求头的 Content-Type */
instance.defaults.headers.post['Content-Type'] =
    'application/json;charset=UTF-8'
// instance.defaults.headers.delete['Content-Type'] =
//     'application/json;charset=UTF-8'
// instance.defaults.headers.put['Content-Type'] =
//     'application/json;charset=UTF-8'

/* 整理数据,序列化为 JSON*/
instance.defaults.transformRequest = function (data) {
    if (data && data.notLoading) {
        delete data.notLoading
    } else {
        //showFullScreenLoading()
    }
    if (data && data.NOSERI) {
        return data.data
    } else {
        return JSON.stringify(data)
    }
}

/* Request 拦截器*/
instance.interceptors.request.use(config => {
    /* 添加token */
    console.log("发送请求")
    config.headers['Authorization'] = localStorage.getItem('accessToken')
    return config
})

/* Response 拦截器*/
instance.interceptors.response.use(
    
    // 请求成功 处理
    response => {
        // 关闭加载动画
        const data = response.data
        // 后端自定义成功 code
        if (data.code === 200) return data
        // 失败后的错误提示
        // const msg = data.message || '操作失败'
        // Message.error({message: msg, duration: 2000})
        // 返回接口返回的错误信息
        return Promise.resolve(data)
    },
    // 请求失败处理-http状态码非200
    error => {
        const response = error.response
        let msg = '未知错误'
        try {
            if (response.data.message) {
                msg = response.data.message
            } else {
                msg = response.statusText
            }
        } catch (e) {
        }
        // 未登录或者登录失效则让用户选择是否重新登录
        if (response.code === 401) {
            // MessageBox.confirm('您的登录已失效，可以取消以保留在该页面上，或者再次登录', '提示信息', {
            //     confirmButtonText: '重新登录',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     store.dispatch('user/resetToken').then(() => {
            //         location.reload()
            //     })
            // })
        }
        if (response.code === 403) {
            // MessageBox.alert('您可能无权限访问！', '提示信息', {
            //     confirmButtonText: '取消',
            //     type: 'warning'
            // })
        }
        // if (response.status === 404) {
        //     msg = '请求路径未找到'
        // }
        if (response.code === 502) {
            msg = '服务已停止或正在重启中'
        }
        if (response.code != 404) {
            //Message.error({message: msg, duration: 2000})
        }
        // 返回请求的错误信息
        return Promise.reject(response)
    }
)

// 向外暴露
export default instance
