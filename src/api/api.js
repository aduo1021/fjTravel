/**
 * Created by wangzhiduo on 2017/1/6.
 */
import axios from 'axios'
import querystring from 'querystring'

export default {
    getData(url){
      return new Promise((resolve,reject)=> {
        axios.get(url)
          .then(response => {
            resolve(response.data);
          })
      })
    },
    postData(url,param){
      return new Promise((resolve, reject) => {
        axios.post(url, querystring.stringify(param))
          .then(response => {
            resolve(response.data);
          })
      })
    },
    setSession(key,value){
      sessionStorage.setItem(key,value)      
    },
    getSession(key){
      return sessionStorage.getItem(key)      
    },
    
}
