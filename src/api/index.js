import ajax from './ajax'
import jsonp from 'jsonp'
const BASE=''

export const reqLogin=(username,password)=>ajax(BASE+'/login',{username,password},'POST')
export const reqAddUser=(user)=>ajax(BASE+'/manage/user/add',user,'POST')
export const reqWeather=(citycode)=>{
    const url=`https://restapi.amap.com/v3/weather/weatherInfo?city=${citycode}&key=781ef11f7575fd070422617e7aa04ab7`
    return new Promise((resolve,reject)=>{
        jsonp(url,{},(error,response)=>{
            if(!error&&response.status==='1'){
                const {city,weather,temperature} =response.lives[0]
                resolve({city,weather,temperature})
            }else{
                alert('获取天气失败')
            }
        })
    })
}
export const reqCategorys=(parentId)=>ajax(BASE+'/manage/category/list',{parentId})
export const reqCategory=(categoryId)=>ajax(BASE+'/manage/category/info',{categoryId})
export const reqAddCategory=({categoryName,parentId})=>ajax(BASE+'/manage/category/add',{categoryName,parentId},'POST')
export const reqUpdateCategory=({categoryId,categoryName})=>ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST') 
export const reqProducts=({pageNum,pageSize})=>ajax(BASE+'/manage/product/list',{pageNum,pageSize}) 
export const reqUpdateStatus=({productId,status})=>ajax(BASE+'/manage/product/updateStatus',{productId,status},'POST') 
export const reqSearchProducts=({pageNum,pageSize,searchName,searchType})=>ajax(BASE+'/manage/product/search',{
    pageNum,
    pageSize,
    [searchType]:searchName
})